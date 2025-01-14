const Leaderboard = require("../../model/leaderboard");
const CFdata = require("../../model/CFdata"); // Schema to store user data
const User = require("../../model/userModel");
const axios = require("axios");

const getRank = (rating) => {
    switch (true) {
        case rating < 1200:
            return "newbie";
        case rating < 1400:
            return "pupil";
        case rating < 1600:
            return "specialist";
        case rating < 1800:
            return "expert";
        case rating < 2000:
            return "candidate";
        case rating < 2200:
            return "master";
        case rating < 2400:
            return "International master";
        case rating < 2800:
            return "grandmaster";
        case rating < 3000:
            return "International grandmaster";
        case rating < 4000:
            return "Legendary grandmaster";
        case rating >= 4000:
            return "Tourist";
        default:
            return "Unknown";
    }
};

const getLeaderboard = async (req, res, next) => {
    try {
        const { contestId } = req.body;

        if (!contestId) {
            return res.status(400).json({ status: false, msg: "Contest ID is required." });
        }

        // Check if contest already exists in the database
        let contest = await Leaderboard.findOne({ contestId });
        if (contest) {
            return res.status(200).json({
                status: true,
                msg: "Contest already in the database",
                data: contest.Leaderboard,
            });
        }

        // Step 1: Fetch all CF data and users
        const [cfData, users] = await Promise.all([CFdata.find(), User.find()]);

        const cfDataMap = new Map(cfData.map((user) => [user.cfusername, user]));
        const userMap = new Map(users.map((user) => [user.cfID, user]));

        // Step 2: Fetch standings from Codeforces API
        const standingsResponse = await axios.get(
            `https://codeforces.com/api/contest.ratingChanges?contestId=${contestId}`
        );
        const standings = standingsResponse.data.result;

        if (!standings.length) {
            return res.status(404).json({
                status: false,
                msg: "No standings data found for the contest.",
                url: `https://codeforces.com/api/contest.ratingChanges?contestId=${contestId}`,
                data: standings,
            });
        }

        // Step 3: Create new leaderboard array
        const newBoard = [];
        const prevLeaderboard = await Leaderboard.findOne().sort({ createdAt: -1 });
        const prevLeaderboardMap = new Map(
            prevLeaderboard?.Leaderboard.map((entry, index) => [
                entry.username,
                { ...entry, index },
            ])
        );

        await Promise.all(
            standings.map(async (participant) => {
                const username = participant.handle;
                const previousEntry = prevLeaderboardMap.get(username);
                const cfDataEntry = cfDataMap.get(username);
                const userDataEntry = userMap.get(username);

                if (userDataEntry) {
                    const position = previousEntry
                        ? previousEntry.index - newBoard.length
                        : prevLeaderboard?.Leaderboard?.length || 0;

                    newBoard.push({
                        username,
                        position,
                        rating: participant.newRating,
                        avatar: cfDataEntry?.avatar || "https://via.placeholder.com/100",
                        rank: getRank(participant.newRating),
                    });

                    // Update CFData rating
                    await CFdata.findOneAndUpdate(
                        { userId: userDataEntry._id },
                        {
                            rating: participant.newRating,
                            avatar:
                                cfDataEntry?.avatar || "https://via.placeholder.com/100",
                            rank: getRank(participant.newRating),
                            cfusername: userDataEntry.cfID,
                        },
                        { upsert: true, new: true }
                    );
                }
            })
        );

        // Step 4: Add users from previous leaderboard who didn’t participate
        prevLeaderboard?.Leaderboard.forEach((entry) => {
            if (!newBoard.some((user) => user.username === entry.username)) {
                newBoard.push({
                    username: entry.username,
                    position: entry.position,
                    rating: entry.rating,
                    avatar: entry.avatar,
                    rank: entry.rank,
                });
            }
        });

        // Step 5: Save or update the leaderboard in the database
        contest = await Leaderboard.findOneAndUpdate(
            { contestId },
            { contestId, Leaderboard: newBoard },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            status: true,
            msg: "Leaderboard updated successfully",
            data: contest.Leaderboard,
        });
    } catch (error) {
        console.error("Error updating leaderboard:", error);
        next(error);
    }
};
const updateCFData = async (req, res, next) => {
    try {
        const { username, avatar, rating, rank } = req.body;

        if (!username) {
            return res.status(400).json({ status: false, msg: "Username is required." });
        }

        // Fetch user by cfID
        const user = await User.findOne({ cfID: username });
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found." });
        }

        // Check if a CFdata entry exists for the user
        let cfData = await CFdata.findOne({ userId: user._id });

        if (!cfData) {
            // Create a new CFdata entry
            cfData = new CFdata({
                userId: user._id,
                rating,
                avatar,
                rank,
                cfusername: username,
            });
            await cfData.save();
        } else {
            // Update CFdata entry if there are changes
            if (cfData.rating !== rating || cfData.avatar !== avatar || cfData.rank !== rank) {
                cfData.rating = rating;
                cfData.avatar = avatar;
                cfData.rank = rank;
                await cfData.save();
            }
        }
        return res.status(200).json({ status: true, msg: "CF data updated successfully.", data: cfData });
    } catch (error) {
        console.error("Error fetching CF data:", error);
        next(error);
    }
};


module.exports = {
    getLeaderboard,
    updateCFData,
};

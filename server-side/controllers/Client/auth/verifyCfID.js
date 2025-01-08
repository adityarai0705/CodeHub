const User = require("../../../model/userModel");
const tempUser = require("../../../model/tempUserModel");

const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");
const CfVerificationRequestToken = require("../../../model/cfVerificationRequestModel")
const axios = require("axios");

const VerifyCfID = AsyncErrorHandler(async (req, res, next) => {
    const { cfID, problemID } = req.body;

    console.log(cfID, problemID);

    if (!cfID) {
        return res.status(400).json({ success: false, message: "cfID is required" });
    }

    try {
        //Check if user already exists in database
        const user = await tempUser.findOne({ cfID });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        //Check if user's email is verified
        if (!user.emailVerified) {
            return res.status(400).json({ success: false, message: "Email not verified" });
        }

        //Check if cfID is already verified
        if (user.cfVerified) {
            return res.status(400).json({ success: false, message: "cfID already verified" });
        }

        //Check if verification request token exists
        const verificationRequestToken = await CfVerificationRequestToken.findOne({
            cfID, problemID
        })

        if (!verificationRequestToken) {
            return res.status(400).json({ success: false, message: "Invalid verification request" });
        }

        console.log("Verification request token found");

        try {
            //Check users submission status using codeforces API
            const cfResponse = await axios.get(` https://codeforces.com/api/user.status?handle=${cfID}&from=1&count=1`);
            if (!cfResponse.data || cfResponse.data.status !== 'OK') {
                return res.status(400).json({ success: false, message: "Invalid codeforces ID" });
            }
            else if (cfResponse.data.result[0].problem.contestId !== 231 || cfResponse.data.result[0].problem.index !== "A") {
                return res.status(400).json({ success: false, message: "Problem mismatched" });
            }

            else if (cfResponse.data.result[0].verdict !== 'COMPILATION_ERROR') {
                return res.status(400).json({ success: false, message: "VErdict not matched" });
            }

            //Check if submission was made within 2 minutes of request for verification

            //Calulate time difference between submission and verification request
            let submissionTime = cfResponse.data.result[0].creationTimeSeconds;
            submissionTime = new Date(submissionTime * 1000);
            const requestTime = verificationRequestToken.requestTime;

            const timeDifference = submissionTime - requestTime;
            const timeDifferenceInMinutes = timeDifference / (1000 * 60);

            //Delete the verification request token
            await verificationRequestToken.deleteOne({ _id: verificationRequestToken._id });

            if (timeDifferenceInMinutes > 2) {
                return res.status(400).json({ success: false, message: "Verification failed. Submission time exceeded 2 minutes" })
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "Failed to connect with codeforces server. Please Try again Later !" });
        }

        //Update user's cfID verification status
        user.cfVerified = true;
        await user.save();

        //after email and cfid both are verified
        //creating new user
        const newUser = new User({
            cfID: user.cfID,
            password: user.password,
            username: user.username,
            email: user.email,
            emailVerified: true,
            cfVerified: true
    });
        await newUser.save();

        //delete the temporary user
        await tempUser.deleteOne({ cfID });

        //Success response to client
        res.status(200).json({ success: true, message: "cfID verified successfully" });

    }
    catch (error) {
        next(error);
    }
})



module.exports = VerifyCfID;

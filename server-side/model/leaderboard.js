const mongoose = require("mongoose");
const { Schema } = mongoose;

// Leaderboard Schema
const LeaderboardSchema = new Schema({
    contestId: {
        type: String,
        required: true,
        unique: true,
    },
    Leaderboard: {
        type: [
            {
                username: {
                    type: String,
                    required: true,
                },
                position: {
                    type: Number, // Change to `String` if rank isn't numeric
                },
                rating: {
                    type: Number,
                    required: true,
                },
                avatar: {
                    type: String, // Add avatar if required in leaderboard
                },
                rank: {
                    type: String, // Add rank if required in leaderboard
                },
            },
        ],
        default: [], // Ensures Leaderboard initializes as an empty array
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

LeaderboardSchema.index({ createdAt: -1 }); // Index to optimize recent leaderboard queries

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);

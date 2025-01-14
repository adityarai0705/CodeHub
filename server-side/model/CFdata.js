const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const CFdataSchema = new Schema({
    userId: {
        type: String,
        ref: "User", // Referencing the User model
        unique: true,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        required: true,
    },
    cfusername: {
        type: String,
        required: true,
    },
}, { timestamps: true }); 

module.exports = mongoose.model("CFdata", CFdataSchema);

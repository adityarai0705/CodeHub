const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    message: {
        type: String,
        required: true,
    },
    visible: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
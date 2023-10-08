const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
    },
    body: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Notices", noticeSchema);
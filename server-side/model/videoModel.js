const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    categoryID: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
    },
    ytLink: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
    }
});

module.exports = mongoose.model("Videos", videoSchema);
const mongoose = require("mongoose");

const educationCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
    },
    visible: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model("EducationCategories", educationCategorySchema);
const mongoose = require("mongoose");

const authUserSchema = new mongoose.Schema({
    cfID: {
        type: String,
        required: true,
        min: 1,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    visible: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model("AuthUsers", authUserSchema);
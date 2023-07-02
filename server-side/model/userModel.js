const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    cfID: {
        type: String,
        required: true,
        min: 1,
        max: 50,
        unique: true,
    },
    visible: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model("Users", userSchema);
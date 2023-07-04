const mongoose = require("mongoose");

const clientSessionSchema = new mongoose.Schema({
    cfID: {
        type: String,
        required: true,
        min: 1,
        max: 50,
        unique: true,
    },
    cookieID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("ClientSessions", clientSessionSchema);
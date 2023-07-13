const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    cfID : String,
    visible : Boolean,
});

module.exports = mongoose.model( "user", userSchema);

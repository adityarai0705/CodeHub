const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedBackSchema = new Schema({
    name : String,
    email : String,
    visible : Boolean,
    message : String,
    date : Date
});

module.exports = mongoose.model( "feedBack", feedBackSchema);

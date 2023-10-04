const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    title : String,
    body : String,
    visible : Boolean,
    date : Date
});

module.exports = mongoose.model( "notice", noticeSchema);

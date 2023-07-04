const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    categoryID : String,
    title : String,
    visible : Boolean,
    date : Date,
    ytLink : String
});

module.exports = mongoose.model( "video", videoSchema);

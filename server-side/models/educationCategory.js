const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    title : String,
    visible : Boolean,
});

module.exports = mongoose.model( "education", educationSchema);

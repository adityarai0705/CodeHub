const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authUserSchema = new Schema({
    cfID : String,
    visible : Boolean,
    password : String
});

module.exports = mongoose.model( "authUser", authUserSchema);

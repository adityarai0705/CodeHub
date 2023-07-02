const EducationCategories = require("../model/educationCategoryModel");
const Feedback = require("../model/feedbackModel");
const Notices = require("../model/noticeModel");
const Users = require("../model/userModel");
const Videos = require("../model/videoModel");
const bcrypt = require("bcrypt");

module.exports.educationCategories = async (req, res, next) => {
    try {
        const educationCategories = await EducationCategories.find();
        return res.json({ status: true, data: educationCategories });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.videos = async (req, res, next) => {
    try {
        const { categoryID } = req.body;
        const videos = await Videos.find({ categoryID: categoryID });
        return res.json({ status: true, data: videos });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.leaderboard = async (req, res, next) => {
    try {
        const cfID = await Users.find().select(["cfID"]);
        return res.json({ status: true, data: cfID });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.login = async (req, res, next) => {
    try {
        const { cfID, password } = req.body;
        const user = await Users.findOne({ cfID });
        if (!user) return res.json({ status: false, msg: "Incorrect ID or Password" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ status: false, msg: "Incorrect Username or Password" });
        return res.json({ status: true, data: { cfID: user.cfID } });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.contactUs = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        await Feedback.create({ name: name, email: email, messsage: message });
        return res.json({ status: true });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.noticeboard = async (req, res, next) => {
    try {
        const notices = await Notices.find();
        return res.json({ status: true, data: notices });
    }
    catch (ex) {
        next(ex);
    }

};
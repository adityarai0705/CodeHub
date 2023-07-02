const EducationCategories = require("../model/educationCategoryModel");
const Feedback = require("../model/feedbackModel");
const Notices = require("../model/noticeModel");
const Videos = require("../model/videoModel");

module.exports.notice = async (req, res, next) => {
    try {
        const notices = await Notices.find();
        return res.json({ status: true, data: notices });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.noticeDelete = async (req, res, next) => {
    try {
        const { noticeID } = req.body;
        const notice = await Notices.find({ _id: noticeID });
        if (!notice) return res.json({ status: false, msg: "Notice doesn't exist" });
        await Notices.remove({ _id: noticeID });
        return res.json({ status: true });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.noticeCreate = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const notice = await Notices.find({ title: title });
        if (notice) return res.json({ status: false, msg: "Notice title already exist" });
        await Notices.create({ title: title, body: body });
        return res.json({ status: true });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.educationCategories = async (req, res, next) => {
    try {
        const educationCategories = await EducationCategories.find();
        return res.json({ status: true, data: educationCategories });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.educationDelete = async (req, res, next) => {
    try {
        const { educationID } = req.body;
        const educationCategory = await EducationCategories.find({ _id: educationID });
        if (!educationCategory) return res.json({ status: false, msg: "Education Category doesn't exist" });
        await EducationCategories.remove({ _id: educationCategory });
        return res.json({ status: true });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.educationCreate = async (req, res, next) => {
    try {
        const { title } = req.body;
        const educationCategory = await EducationCategories.find({ title: title });
        if (educationCategory) return res.json({ status: false, msg: "Education Category title already exist" });
        await EducationCategories.create({ title: title });
        return res.json({ status: true });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.videos = async (req, res, next) => {
    try {
        const videos = await Videos.find();
        return res.json({ status: true, data: videos });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.videoDelete = async (req, res, next) => {
    try {
        const { videoID } = req.body;
        const video = await Videos.find({ _id: videoID });
        if (!video) return res.json({ status: false, msg: "Video doesn't exist" });
        await Videos.remove({ _id: videoID });
        return res.json({ status: true });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.videoCreate = async (req, res, next) => {
    try {
        const { title, ytLink } = req.body;
        const video = await Videos.find({ $or: [{ title: title }, { ytLink: ytLink }] });
        if (video) return res.json({ status: false, msg: "Video already exist" });
        await Videos.create({ title: title });
        return res.json({ status: true });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.feedback = async (req, res, next) => {
    try {
        const feedback = await Feedback.find();
        return res.json({ status: true, data: feedback });
    }
    catch (ex) {
        next(ex);
    }

};
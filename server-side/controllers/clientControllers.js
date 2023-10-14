const EducationCategories = require("../model/educationCategoryModel");
const Feedback = require("../model/feedbackModel");
const Notices = require("../model/noticeModel");
const Users = require("../model/userModel");
const Videos = require("../model/videoModel");
const ClientSessions = require("../model/clientSessionModel");
const { randomUUID } = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.educationCategories = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        const cfID = req.body.cfID;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)    
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (cookieID == session.cookieID) {
            const educationCategories = await EducationCategories.find();
            return res.json({ status: true, data: educationCategories });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.videos = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        const cfID = req.body.cfID;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (cookieID == session.cookieID) {
            const { categoryID } = req.body;
            const videos = await Videos.find({ categoryID : categoryID });
            return res.json({ status: true, data: videos });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }
};
module.exports.leaderboard = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        const cfID = req.body.cfID;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (cookieID == session.cookieID) {
            const cfID = await Users.find().select(["cfID"]);
            return res.json({ status: true, data: cfID });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.register = async (req, res, next) => {
    try {
        const { cfID, password } = req.body;
        const cfIDCheck = await Users.findOne({ cfID: cfID });
        if (cfIDCheck) return res.json({ status: false, msg: "User already exist" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({ cfID: cfID, password: hashedPassword });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { cfID, password } = req.body;
        const user = await Users.findOne({ cfID: cfID });
        if (!user) return res.json({ status: false, msg: "Incorrect ID or Password" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ status: false, msg: "Incorrect Username or Password" });
        const cookieID = randomUUID();
        const session = await ClientSessions.findOne({ cfID: cfID });
        console.log(session);
        if (session)
            await ClientSessions.deleteOne({ cfID: cfID });
        await ClientSessions.create({ cfID: cfID, cookieID: cookieID });
        const cookie = jwt.sign(
            { "cookieID": cookieID },
            process.env.COOKIE_SECRET_KEY,
            { expiresIn: "1d" }
        );
        res.cookie("jwt", cookie, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({ status: true, data: { cfID: user.cfID } });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.contactUs = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        const cfID = req.body.cfID;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (cookieID == session.cookieID) {
            const { name, email, message } = req.body;
            await Feedback.create({ name: name, email: email, messsage: message });
            return res.json({ status: true });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }

};

// module.exports.noticeboard = async (req, res, next) => {
//     try {
//         let cookieID;
//         const cookie = req.cookies.jwt;
//         jwt.verify(
//             cookie,
//             process.env.COOKIE_SECRET_KEY,
//             (err, decoded) => {
//                 if (err)
//                     return res.json({ status: false, msg: "Invalid cookieID" });
//                 cookieID = decoded.cookieID;
//             }
//         );
//         const session = await ClientSessions.findOne({ cfID: cfID });
//         if (cookieID == session.cookieID) {
//             const notices = await Notices.find();
//             return res.json({ status: true, data: notices });
//         }
//         else
//             return res.json({ status: false, msg: "Session expired" });
//     }
//     catch (ex) {
//         next(ex);
//     }

// };

module.exports.noticeboard = async (req, res, next) => {
    try {
        const notices = await Notices.find();
        return res.json({ status: true, data: notices });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.logout = async (req, res, next) => {
    try {
        if (!req.params.cfID)
            return res.status(400).json({ status: false, msg: "User cfID is required" });
        const cfID = req.params.cfID;
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (session)
            await ClientSessions.remove({ cfID: cfID });
        return res.json({ status: true, msg: "Logged out" });
    } catch (ex) {
        next(ex);
    }

};

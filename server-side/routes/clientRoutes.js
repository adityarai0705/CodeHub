const { educationCategories, videos, leaderboard, contactUs, noticeboard, login } = require("../controllers/clientControllers");
const router = require("express").Router();
router.post("/education", educationCategories);
router.post("/education/videos", videos);
router.get("/leaderboard", leaderboard);
router.get("/login", login);
router.post("/contactus", contactUs);
router.get("/noticeboard", noticeboard);
module.exports = router;
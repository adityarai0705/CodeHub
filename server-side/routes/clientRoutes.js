const {
    educationCategories,
    videos,
    // leaderboard,
    contactUs,
    noticeboard,
    register,
} = require("../controllers/clientControllers");
const leaderboard = require("../controllers/Client/leaderboard.controller");
const controller = require("../controllers/Client/controller");
const verifyCookie = require("../middleware/verifyCookie");
const verifyPasswordReq = require("../middleware/verifyPasswordReq");
const router = require("express").Router();

// Routes that require authentication
router.post("/education", verifyCookie, educationCategories);
router.post("/education/videos", verifyCookie, videos);
//@route POST /leaderboard
//@desc Get leaderboard
//@access Private
router.post("/leaderboard",leaderboard.getLeaderboard );
//@route POST /updateCFData
//@desc Update CF Data
//@access Private
router.post("/updateCFData",  leaderboard.updateCFData);

router.post("/feedback", verifyCookie, controller.userFeedback);
router.post("/logout", verifyCookie, controller.logout);
router.get("/check/session", verifyCookie, controller.checkSession);

// Public routes (do not require authentication)
router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/noticeboard", noticeboard);
router.post("/verifyEmail", controller.verifyEmail);
router.post("/verifyCfID", controller.verifyCfID);
router.post("/requestCfVerification", controller.generateCfVerificationRequestToken);


//For Changing Password

// @route POST /forgetPassword
// @desc Forget Password
// @access Public
router.post("/forgetPassword",controller.ForgetPassword.ForgetPassword);

// @route POST /verifyPasswordChangeOTP
// @desc Confirm User
// @access Public
router.post("/verifyPasswordChangeOTP",verifyPasswordReq, controller.ForgetPassword.VerifyPasswordChangeOTP);

// @route POST /confirmPasswordChange
// @desc Confirm Password Change
// @access Public
router.post("/confirmPasswordChange",verifyPasswordReq,controller.ForgetPassword.ConfirmPasswordChange);

// @route GET /check/user/:id
// @desc Check if user exists
// @access Public
router.get("/check/user/:id",verifyCookie,controller.checkUser);

module.exports = router;

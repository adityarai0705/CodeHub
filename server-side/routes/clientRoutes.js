const {
    createNotice,
    deleteNotice,
    deleteUser,
    promoteUserToAdmin,
    educationCategories,
    videos,
    leaderboard,
    contactUs,
    noticeboard,
    register
} = require("../controllers/clientControllers");

const controller = require("../controllers/Client/controller");
const verifyCookie = require("../middleware/verifyCookie");
const verifyPasswordReq = require("../middleware/verifyPasswordReq");
const router = require("express").Router();

// Routes that require authentication
router.post("/education", verifyCookie, educationCategories);
router.post("/education/videos", verifyCookie, videos);
router.post("/leaderboard", verifyCookie, leaderboard);
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

// @route POST api/forgetPassword
// @desc Forget Password
// @access Public
router.post("/forgetPassword",controller.ForgetPassword.ForgetPassword);

// @route POST api/verifyPasswordChangeOTP
// @desc Confirm User
// @access Public
router.post("/verifyPasswordChangeOTP",verifyPasswordReq, controller.ForgetPassword.VerifyPasswordChangeOTP);

// @route POST api/confirmPasswordChange
// @desc Confirm Password Change
// @access Public
router.post("/confirmPasswordChange",verifyPasswordReq,controller.ForgetPassword.ConfirmPasswordChange);

module.exports = router;

const User = require("../../../model/userModel");
const tempUser = require("../../../model/tempUserModel");
const VerificationToken = require("../../../model/verificationTokenModel");
const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");

const verifyToken = AsyncErrorHandler(async (req, res, next) => {
    const token = req.body;
    console.log(token)
    if (!token) {
        return res.status(400).json({ success: false, message: "Token is required" });
    }

    try {
        //Find the token in database
        const tokenExists = await VerificationToken.findOne(token);
        if (!tokenExists) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        //Find user with corresponsding email in database
        const user = await tempUser.findOne({ email: tokenExists.email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        //Check if email is already verified
        if (user.emailVerified) {
            res.status(400).json({ success: false, message: "Email already verified" });
        }
    
        //Check the token
        if (tokenExists.code !== token.code) {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }
        //Update user's email verification status
        user.emailVerified = true;
        await user.save();

        //Delete the token from database
        await tokenExists.deleteOne({ _id: tokenExists._id });

        //Success Response to client
        res.status(200).json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        next(error);
    }

})

module.exports = verifyToken
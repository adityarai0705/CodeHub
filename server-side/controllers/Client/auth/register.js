const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require("../../../model/userModel");
const tempUser = require("../../../model/tempUserModel");
const axios = require("axios");
const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");
const utils = require("../../../utils/auth/auth.utils")
const VerificationToken = require("../../../model/verificationTokenModel");
const SendEmail = require("../../../utils/auth/sendEmail")

const Register = AsyncErrorHandler(async (req, res, next) => {
    // Input validation
    const schema = Joi.object({
        username: Joi.string().required(),
        cfID: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: "Invalid input", error: error.details[0].message });

    const { username, cfID, email, password } = req.body;

    try {
        try {
            //Check authenticity of codeforces Id
            const cfResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${cfID}`)
            if (!cfResponse.data || cfResponse.data.status !== 'OK') {
                return res.status(400).json({ success: false, message: "Invalid codeforces ID" });
            }
        } catch (error) {
            console.error("Codeforces API error:", error.message);
            if (error.response.data.status === "FAILED") {
                return res.status(400).json({ success: false, message: "Invalid codeforces ID" });
            }
            return res.status(500).json({ success: false, message: "An error occurred while verifying codeforces ID" });
        }

        //Check if the user already exists in database 
        const existingUser = await User.findOne({ $or: [{ email }, { cfID }, { username }] });

        if (existingUser && !existingUser.emailVerified) {
            //Delete unverified user
            await User.deleteOne({ _id: existingUser._id });
            await VerificationToken.deleteOne({ email: existingUser.email });
        }
        else if (existingUser && existingUser.cfVerified) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Create new user
        let user = {
            username,
            cfID,
            email,
            password: hashedPassword
        };
        
        //saving the data in a temporary user model which will be deleted at the time of saving actual user
        const newTempUser = new tempUser(user);
        await newTempUser.save();

        //Generate new Verification tokens
        const verificationCode = utils.generateVerificationCode();
        //Create a new entry in verification token model
        const token = new VerificationToken({
            email: email,
            code: verificationCode
        })
        await token.save();

        //Generate email
        const subject = "Email Verification";
        const text = utils.createVerificationEmail({ verificationCode, subject });

        //Send email
        await SendEmail(email, subject, text);

        //Send response to client
        res.status(201).json({
            success: true,
            message: "Now please verify your codeforces Id and Email to complete the Registration",
            emailVerified: false
        })
    } catch (error) {
        next(error);
    }
});


module.exports = Register;

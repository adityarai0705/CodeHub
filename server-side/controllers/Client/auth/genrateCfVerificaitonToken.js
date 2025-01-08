const User = require("../../../model/userModel");
const tempUser = require("../../../model/tempUserModel");

const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");
const CfVerificationRequestToken = require("../../../model/cfVerificationRequestModel")


const generateCfVerificationRequestToken = AsyncErrorHandler(async (req, res, next) => {
    const { problemID, cfID, requestTime } = req.body;

    console.log(problemID, cfID, requestTime);
    //Input validation
    if (!problemID || !cfID || !requestTime) {
        return res.status(400).json({ success: false, message: "Invalid request ! Missing required fields" });
    }

    try {
        //Check if user already exists in database
        const user = await User.findOne({ cfID }) || await tempUser.findOne({ cfID });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        //Check if user's email is verified
        if (!user.emailVerified) {
            return res.status(400).json({ success: false, message: "Email not verified" });
        }

        //Check if cfID is already verified
        if (user.cfVerified) {
            return res.status(400).json({ success: false, message: "cfID already verified" });
        }

        //Check if user has already requested for cfID verification
        const existingRequest = await CfVerificationRequestToken.findOne({ cfID, problemID });
        if (existingRequest) {
            //Check if the request is still valid by calculating the time difference
            //between new request time and the request time of the existing request
            const timeDifference = new Date(requestTime) - new Date(existingRequest.requestTime);
            //If time difference less then 2 minutes then discard the request
            if (timeDifference < 120000) {
                return res.status(400).json({ success: false, message: "Request already exists" });
            }
            else {
                //Delete the existing request
                await CfVerificationRequestToken.deleteOne({ cfID, problemID });
            }
        }

        //Create new request token
        const newRequest = new CfVerificationRequestToken({ cfID, problemID, requestTime });
        await newRequest.save();

        //Success response to client
        res.status(200).json({ success: true, message: "Request token generated successfully" });

    } catch (error) {
        next(error);
    }

})

module.exports = generateCfVerificationRequestToken;
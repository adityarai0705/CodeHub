const User = require("../../../model/userModel");
const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");

module.exports = AsyncErrorHandler(async (req, res, next) => {  
    const { id } = req.params;
    try {
        const user = await User.findOne({ cfID: id });
        if (!user) {
            return res.status(400).json({ status: false, msg: "User not found" });
        }
        if(user.emailVerified === false|| user.cfVerified === false){
            return res.status(400).json({ status: false, msg: "Email not verified or cfID not verified" });
        }
        return res.status(200).json({ status: true, msg: "User found" });
    } catch (error) {
        next(error);
    }
}); 


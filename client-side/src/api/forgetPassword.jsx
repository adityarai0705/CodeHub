import axios from "axios";
const server_base_url = import.meta.env.REACT_APP_SERVER_BASE_URL;


//Forgot Password
class API {
    // Send email for forgetting password
    async forgetPassword(email) {
        try {
            const response = await axios.post(`${server_base_url}/forgetPassword`, { email }, { withCredentials: true });
            return response.data; // Expecting a success message or next-step instructions
        } catch (error) {
            throw error.response?.data?.message || "Error in Forget Password Request";
        }
    }

    // Verify OTP
    async verifyOtp(otp) {
        try {
            const response = await axios.post(`${server_base_url}/verifyPasswordChangeOTP`, { otp }, { withCredentials: true });
            return response.data; // Expecting a token or success confirmation
        } catch (error) {
            throw error.response?.data?.message || "Invalid OTP";
        }
    }

    // Reset the password
    async resetPassword(newPassword) {
        try {
            const response = await axios.post(`${server_base_url}/confirmPasswordChange`, { newPassword: newPassword }, { withCredentials: true });
            return response.data; // Expecting a success message
        } catch (error) {
            throw error.response?.data?.message || "Error in Resetting Password";
        }
    }
}

export default API;

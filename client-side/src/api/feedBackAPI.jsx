// feedbackAPI.js
import axios from 'axios';

const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const submitFeedback = async (feedbackData) => {
    try {
        const response = await axios.post(`${server_base_url}/feedBack`, feedbackData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.success) {
            return {
                success: true,
                message: response.data.message
            }
        }
        else {
            throw new Error(response.data.message || "Registration failed. Please try again.");
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "An unknown error occurred",
        };
    }
};

const feedbackAPI = { submitFeedback };

export default feedbackAPI;

import axios from "axios";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

//Auth API functions

async function handleLogin({ password, email }) {
  try {
    //Input validation
    if (email === "" || password === "") {
      throw new Error("Both cfID and password are required");
    }

    //API request
    const response = await axios.post(
      `${server_base_url}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: "Login successful!",
      };
    } else {
      throw new Error(
        response.data.message || "Login failed. Please try again."
      );
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    };
  }
}

async function handleRegister({ username, cfID, email, password }) {
  try {
    //API request
    const response = await axios.post(
      `${server_base_url}/register`,
      {
        username,
        email,
        cfID,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      throw new Error(
        response.data.message || "Registration failed. Please try again."
      );
    }
  } catch (error) {
    console.log("Signup Error:", error.response);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    };
  }
}

async function handleVerifyEmail({ email, verificationCode }) {
  const token = { email, code: verificationCode };
  try {
    const response = await axios.post(`${server_base_url}/verifyEmail`, token, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error(
        response.data.message || "Email verification failed. Please try again."
      );
    }
  } catch (error) {
    console.error("Email verification error:", error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    };
  }
}

async function handleRequestCfVerification({ cfID, problemID }) {
  const requestTime = new Date();
  try {
    const response = await axios.post(
      `${server_base_url}/requestCfVerification`,
      {
        cfID,
        problemID,
        requestTime,
      }
    );
    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error(
        response.data.message || "Request failed. Please try again."
      );
    }
  } catch (error) {
    console.error("Request error:", error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    };
  }
}

async function handleVerifyCfID({ cfID, problemID }) {
  try {
    const response = await axios.post(`${server_base_url}/verifyCfID`, {
      cfID,
      problemID,
    });

    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error(
        response.data.message || "Verification failed. Please try again."
      );
    }
  } catch (error) {
    console.error("Verification error:", error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    };
  }
}

//Check Session
const checkSession = async () => {
  try {
    const response = await axios.get(`${server_base_url}/check/session`, {
      withCredentials: true,
    });

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    };
  }
};

const handleLogout = async () => {
  try {
    const response = await axios.post(
      `${server_base_url}/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return {
        success: true,
        message: "Logout successful !",
      };
    } else {
      throw new Error(response.data.message || "Logout failed");
    }
  } catch (error) {
    console.error("Logout error: ", error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred",
    };
  }
};

const authAPI = {
  handleLogin,
  handleRegister,
  handleRequestCfVerification,
  handleVerifyCfID,
  handleVerifyEmail,
  checkSession,
  handleLogout,
};

export default authAPI;

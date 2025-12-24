import axios from "axios";
const API_URL = "https://simplify-job-node-js-backend-api.vercel.app/api";
// const API_URL = "http://localhost:5000/api/user";

//! frontend auth

// register
export const frontendUserregister = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/register`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.log("Signup user error:", error);
    const backendMsg = error?.response?.data?.message || error?.message;
    return {
      succss: false,
      message: backendMsg,
    };
  }
};

// login
export const loginFrontendUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.log("Login user error:", error);
    const backendMsg = error?.response?.data?.message || error?.message;
    return {
      succss: false,
      message: backendMsg,
    };
  }
};

//! mail

export const sendMail = async (credentials) => {
  try {
    const res = await axios.post(
      // "https://simplify-job-node-js-backend-api.vercel.app/api/send-mail",
      `${API_URL}/send-mail`,

      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Sending mail  error:", error);
    const backendMsg = error?.response?.data?.message || error?.message;
    return {
      succss: false,
      message: backendMsg,
    };
  }
};

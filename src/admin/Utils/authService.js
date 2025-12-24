import axios from "axios";
const API_URL = "https://simplify-job-node-js-backend-api.vercel.app/api/admin";
// const API_URL = "http://localhost:5000/api/admin";

//! ADMIN SECTION AUTH

// login

export async function loginUser(credentials) {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Login error:", error);

    const backendMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Login failed. Please try again later.";

    return {
      success: false,
      message: backendMessage,
    };
  }
}

// verify token

export async function verifyToken(token) {
  try {
    const res = await axios.get(`${API_URL}/verifyToken`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("verifyToken error:", error);
    const backendMessage =
      error?.response?.data?.message || "Token expired or invalid";

    return {
      success: false,
      message: backendMessage,
    };
  }
}

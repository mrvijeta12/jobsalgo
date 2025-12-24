import axios from "axios";
const API_URL = "https://simplify-job-node-js-backend-api.vercel.app/api/admin";
// const API_URL = "http://localhost:5000/api/admin";

export const uploadcv = async (credential) => {
  try {
    const res = await axios.post(`${API_URL}/upload-cv`, credential);
    return res.data;
  } catch (error) {
    console.error("uploadCV error:", error);
    const backendMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Network error, please try again later.";

    return {
      success: false,
      message: backendMessage,
    };
  }
};

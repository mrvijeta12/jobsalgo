import axios from "axios";
const API_URL = "https://simplify-job-node-js-backend-api.vercel.app/api";
// const API_URL = "http://localhost:5000/api";

//! post a job (post a job page)

export const postFrontendJob = async (credentials, token, id) => {
  try {
    const res = await axios.post(`${API_URL}/addjob?id=${id}`, credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
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

//! get all jobs (job listings page)

export const getPublicJobs = async () => {
  try {
    const res = await axios.get(`${API_URL}/jobs`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Getting all jobs error:", error.message);
    const backendMsg = error?.response?.data?.message || error?.message;
    return {
      succss: false,
      message: backendMsg,
    };
  }
};

//! get job by id (job description page)

export const getPublicJobById = async (id) => {
  console.log(id);

  try {
    const res = await axios.get(`${API_URL}/jobs/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Getting  job by id error:", error.message);
    const backendMsg = error?.response?.data?.message || error?.message;
    return {
      succss: false,
      message: backendMsg,
    };
  }
};

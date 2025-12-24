import axios from "axios";
const API_URL = "https://simplify-job-node-js-backend-api.vercel.app/api/admin";
// const API_URL = "http://localhost:5000/api/admin";

export async function addJob(formData, token, id) {
  try {
    const res = await axios.post(`${API_URL}/addjob?id=${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("addJob error:", error);
    const backendMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Network error, please try again later.";

    return {
      success: false,
      message: backendMessage,
    };
  }
}

// get all employers

export async function getAllJobs(token) {
  try {
    const res = await axios.get(`${API_URL}/getalljobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("getAllJobs error:", error);
    const backendMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Network error, please try again later.";

    return {
      success: false,
      message: backendMessage,
    };
  }
}

//get employer by id
export async function getJob(id, token) {
  try {
    const res = await axios.get(`${API_URL}/getjob?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("getJob error:", error);

    const backendMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Network error, please try again later.";

    return {
      success: false,
      message: backendMessage,
    };
  }
}

//update employer

export async function updatejob(id, updatedData, token) {
  try {
    const res = await axios.put(`${API_URL}/updatejob?id=${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("getJob error:", error);

    const backendMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Network error, please try again later.";

    return {
      success: false,
      message: backendMessage,
    };
  }
}

// delete employer

export const deletJob = async (id, token) => {
  const res = await axios.delete(`${API_URL}/deletejob?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

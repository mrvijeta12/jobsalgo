import axios from "axios";
const API_URL = "https://simplify-job-node-js-backend-api.vercel.app/api/admin";
// const API_URL = "http://localhost:5000/api/admin";

export async function addEmployer(formData, token) {
  try {
    const res = await axios.post(`${API_URL}/addEmployer`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("addEmployer error:", error);
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

export async function getAllEmployers(token) {
  try {
    const res = await axios.get(`${API_URL}/getAllEmployers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("getAllEmployer error:", error);
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
export async function getEmployer(id, token) {
  try {
    const res = await axios.get(`${API_URL}/getEmployer?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data; // Expected: { success, employer, message }
  } catch (error) {
    console.error("getEmployer error:", error);

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

// get employer created by logged in user

export async function getEmployersByUser(id, token) {
  try {
    const res = await axios.get(`${API_URL}/employers/created-by?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data; // Expected: { success, employer, message }
  } catch (error) {
    console.error("getEmployer error:", error);

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

export async function updateEmployer(id, updatedData, token) {
  try {
    const res = await axios.put(
      `${API_URL}/updateEmployer?id=${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("getEmployer error:", error);

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

export const deletEmployer = async (id, token) => {
  const res = await axios.delete(`${API_URL}/deleteEmployer?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

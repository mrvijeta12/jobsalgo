import React, { useCallback, useEffect, useState, useMemo } from "react";
import AdminContext from "./AdminContext";

import {
  getAllEmployers,
  getEmployer,
  getEmployersByUser,
} from "../Utils/employersLogic";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../Utils/jobsLogic.js";

const AdminProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [editJob, setEditJob] = useState(false);
  // const [draft, setDraft] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 992);

  const [errors, setErrors] = useState({});
  const [notif, setNotif] = useState({ message: null, type: "" });
  const [createdEmployersByUser, setCreatedEmployersByusers] = useState(null);
  const [selectEmployerId, setSelectEmployerId] = useState("");
  const [company, setCompany] = useState({ logo: "", name: "" });
  const [refreshEmployers, setRefreshEmployers] = useState(false);
  const [refreshJobs, setRefreshJob] = useState(false);

  const [user, setUser] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empData, setEmpData] = useState([]);

  // console.log(allJobs);

  const [isValidImage, setIsValidImage] = useState(true);
  const navigate = useNavigate();

  const login = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  // Keep localStorage synced when token changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Listen for token changes across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) setShowSidebar(false);
      else setShowSidebar(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // get employers data by user

  useEffect(() => {
    if (!loggedInUser?.id) {
      setNotif({
        id: Date.now(),
        message: "Invalid User ID",
        type: "error",
      });
      return;
    }
    if (!token) {
      setNotif({
        id: Date.now(),
        message: "Your session has expired. Please log in again.",
        type: "error",
      });

      return;
    }

    const fetchEmployers = async () => {
      try {
        const res = await getEmployersByUser(loggedInUser.id, token);

        if (!res.success) {
          return setNotif({
            id: Date.now(),
            message: res.message,
            type: "error",
          });
        }

        setCreatedEmployersByusers(res.employers);
      } catch (error) {
        console.log(error.message);
        setNotif({
          id: Date.now(),
          message: error.message || "Something went wrong.",
          type: "error",
        });
      }
    };

    fetchEmployers();
  }, [loggedInUser?.id, token, refreshEmployers]);

  // get employer by id

  useEffect(() => {
    if (
      !selectEmployerId ||
      selectEmployerId === "" ||
      selectEmployerId === "undefined"
    ) {
      return;
    }

    if (!token) {
      setNotif({
        id: Date.now(),
        message: "Your session has expired. Please log in again.",
        type: "error",
      });
      return;
    }

    const fetchEmployer = async () => {
      try {
        const res = await getEmployer(selectEmployerId, token);

        if (!res.success) {
          setNotif({
            id: Date.now(),
            message: res.message,
            type: "error",
          });
          return;
        }

        setCompany((prev) => ({
          ...prev,
          logo: res.employer.company_logo,
          name: res.employer.company_name,
        }));
      } catch (error) {
        console.log(error.message);
        setNotif({
          id: Date.now(),
          message: error.message || "Something went wrong.",
          type: "error",
        });
      }
    };

    fetchEmployer();
  }, [selectEmployerId]);

  // get all jobs

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      if (!token) {
        setNotif({
          id: Date.now(),
          message: "Your session has expired. Please log in again.",
          type: "error",
        });
        navigate("/admin/login");
        return;
      }
      const res = await getAllJobs(token);
      // console.log(res);

      if (!res.success) {
        setNotif({
          id: Date.now(),
          message: res.message || "Failed to fetch jobs",
          type: "error",
        });
        return;
      }

      setAllJobs(res.jobs);
    } catch (error) {
      console.error("Unexpected fetchJobs error:", error);
      setNotif({
        id: Date.now(),
        message: "An unexpected error occurred while fetching jobs.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllJobs();
    }
  }, [token, refreshJobs]);

  // fetch all employer

  const fetchAllEmployers = async () => {
    try {
      setLoading(true);
      if (!token) {
        setNotif({
          id: Date.now(),
          message: "Your session has expired. Please log in again.",
          type: "error",
        });
        navigate("/admin/login");
        return;
      }
      const res = await getAllEmployers(token);
      if (!res.success) {
        setNotif({
          id: Date.now(),
          message: res.message || "Failed to fetch employers",
          type: "error",
        });
        return;
      }

      setEmpData(res.employers);
    } catch (error) {
      console.error("Unexpected fetchEmployers error:", error);
      setNotif({
        id: Date.now(),
        message: "An unexpected error occurred while fetching employers.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllEmployers();
    }
  }, [token, refreshEmployers]);

  // ✅ Memoize context value to prevent infinite re-renders
  const value = useMemo(
    () => ({
      showSidebar,
      setShowSidebar,
      formData,
      setFormData,
      errors,
      setErrors,
      token,
      login,
      logout,
      notif,
      setNotif,
      loggedInUser,
      setLoggedInUser,
      createdEmployersByUser,
      setCreatedEmployersByusers,
      selectEmployerId,
      setSelectEmployerId,
      company,
      setCompany,
      isValidImage,
      setIsValidImage,
      setRefreshEmployers,
      user,
      setUser,
      allJobs,
      setAllJobs,
      loading,
      setLoading,
      empData,
      setEmpData,
      refreshJobs,
      setRefreshJob,
    }),
    [
      showSidebar,
      formData,
      errors,
      token,
      notif,
      loggedInUser,
      createdEmployersByUser,
      selectEmployerId,
      company,
      isValidImage,
      user,
      allJobs,
      loading,
      empData,
      refreshJobs,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;

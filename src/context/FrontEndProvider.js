import React, { useCallback, useEffect, useMemo, useState } from "react";
import FrontendContext from "./FrontendContext";
import { getCurrentUser } from "../Hooks/getCurrentUser";
import { getPublicJobs } from "../Utils/frontendJobs";

const FrontEndProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("Frontend_user_token") || null
  );
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("Frontend_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [errors, setErrors] = useState({});
  const [notif, setNotif] = useState({ message: null, type: "" });
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // signup
  const signup = useCallback((newUser, newToken) => {
    localStorage.setItem("Frontend_user", JSON.stringify(newUser));
    localStorage.setItem("Frontend_user_token", newToken);
    setUser(newUser);
    setToken(newToken);
  }, []);
  //login
  const login = useCallback((newUser, newToken) => {
    localStorage.setItem("Frontend_user", JSON.stringify(newUser));
    localStorage.setItem("Frontend_user_token", newToken);
    setUser(newUser);
    setToken(newToken);
  }, []);

  //sync local storage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "Frontend_user") {
        if (e.newValue) {
          console.log(e.newValue);

          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // logout

  function handleLogout() {
    localStorage.removeItem("Frontend_user");
    localStorage.removeItem("Frontend_user_token");
    setUser(null);
  }

  // get all jobs

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        const res = await getPublicJobs();
        if (res.success) {
          setJobs(res.jobs);
        }
      } catch (error) {
        console.log("Error fetching job:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  const value = useMemo(
    () => ({
      errors,
      setErrors,
      token,
      setToken,
      signup,
      login,
      user,
      setUser,
      handleLogout,
      notif,
      setNotif,
      isModelOpen,
      setIsModelOpen,
      jobs,
      setJobs,
      loading,
      setLoading,
    }),
    [errors, token, user, notif, isModelOpen, jobs, loading]
  );

  return (
    <div>
      <FrontendContext.Provider value={value}>
        {children}
      </FrontendContext.Provider>
    </div>
  );
};

export default FrontEndProvider;

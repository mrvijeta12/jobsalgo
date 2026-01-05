import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import FrontendContext from "./FrontendContext";
import { getCurrentUser } from "../Hooks/getCurrentUser";
import { getPublicJobs } from "../Utils/frontendJobs";
import { useNavigate } from "react-router-dom";

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
  const [refershJob, setRefreshJob] = useState(false);

  // job part

  const navigate = useNavigate();
  function handleCick(id) {
    navigate(`/job-description/${id}`);
  }

  //filter and sort
  const [filters, setFilters] = useState({
    job_title: "",
    job_type: [],
    category: "",
    location: "",
    minSalary: null,
    maxSalary: null,
    experience: "",
    posted_date: "",
    work_mode: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  function handleFilterChange(e) {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => {
      let updatedValue;

      // for multiple checkbox
      if (type === "checkbox" && Array.isArray(prev[name])) {
        updatedValue = checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value);
      }
      // for single checkbox
      else if (type === "checkbox") {
        updatedValue = checked;
      } else if (type === "number") {
        updatedValue = value === "" ? "" : Math.max(0, Number(value));
      } else if (name === "job_title") {
        updatedValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
      }
      // for input, radio , select etc
      else {
        updatedValue = value;
      }

      return {
        ...prev,
        [name]: updatedValue,
      };
    });
    setPage(1);
  }

  function applyFilter() {
    setAppliedFilters(filters);
    setPage(1);
  }

  const bindQuery = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== "" && value !== null && value !== undefined) {
        params.append(key, value);
      }
    });

    return params.toString();
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const cleanedFilters = Object.fromEntries(
          Object.entries(appliedFilters).filter(([_, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            return value !== "" && value !== null && value !== undefined;
          })
        );

        const query = bindQuery({
          ...cleanedFilters,
          sort,
          page,
        });

        const res = await getPublicJobs(query);

        if (res.success) {
          setJobs(res.jobs);
        }
      } catch (err) {
        console.error("Fetch jobs error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [appliedFilters, sort, page, refershJob]);

  // clear filters
  function clearFilters() {
    setFilters({
      job_title: "",
      job_type: [],
      category: "",
      location: "",
      minSalary: null,
      maxSalary: null,
      experience: "",
      posted_date: "",
      work_mode: [],
    });
    setPage(1);
    setRefreshJob(true);
  }

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

  // useEffect(() => {
  //   const fetchAllJobs = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await getPublicJobs();
  //       if (res.success) {
  //         setJobs(res.jobs);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching job:", error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllJobs();
  // }, []);

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
      setAppliedFilters,
      setFilters,
      handleFilterChange,
      appliedFilters,
      setSort,
      setPage,
      clearFilters,
      filters,
      applyFilter,
      handleCick,
    }),
    [
      errors,
      token,
      user,
      notif,
      isModelOpen,
      jobs,
      loading,
      filters,
      appliedFilters,
      sort,
      page,
    ]
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

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FrontendContext from "../context/FrontendContext";
import Model from "./Model";
import { getAllJobs, getPublicJobs } from "../Utils/frontendJobs";
import { useActiveTooltipDataPoints } from "recharts";

const JobListings = () => {
  useEffect(() => {
    document.title = "JobsAlgo | All Jobs";
  }, []);
  const [showFilter, setShowFilter] = useState(false);
  const { jobs, loading } = useContext(FrontendContext);
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

  const bindQuery = (filters) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== "" && value !== null && value !== undefined) {
        params.append(key, value);
      }
    });
    params.append("sort", sort);
    params.append("page", page);

    // console.log(params);

    return params.toString();
  };

  // apply filters

  // function applyFilter() {
  //   const cleanedFilters = Object.fromEntries(
  //     Object.entries(filters).filter(([_, value]) => {
  //       if (Array.isArray(value)) return value.length > 0;
  //       return value !== "" && value !== null && value !== undefined;
  //     })
  //   );

  //   const query = bindQuery(cleanedFilters);
  //   console.log(query);
  // }
  useEffect(() => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== "" && value !== null && value !== undefined;
      })
    );

    const query = bindQuery({
      ...cleanedFilters,
      sort,
      page,
    });

    console.log(query);
    getPublicJobs(query);
  }, [filters, sort, page]);

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
      page: 1,
    });
  }

  // Helper function
  const formatSalary = (min, max) => {
    if (!min && !max) return "Not disclosed";
    const formatValue = (value) => {
      if (value >= 100) {
        // Convert LPA to Cr
        return `${(value / 100).toFixed(2)} Cr`;
      }
      return `${value} LPA`;
    };
    // If min & max are equal → show single value
    if (min === max) {
      return formatValue(max);
    }
    return `${formatValue(min)} - ${formatValue(max)}`;
  };

  return (
    <>
      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>
      </div>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: "url('images/jobsalgo-hero.jpg')" }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7" data-aos="fade-up" data-aos-delay="200">
              <h1 className="text-white font-weight-bold">Jobs </h1>
              <div className="custom-breadcrumbs">
                <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Jobs </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`job-listing-area container ${
          showFilter ? "custom-height" : ""
        }`}
      >
        <div
          className="row position-relative d-flex  w-100 job-container mx-auto"
          // style={{ border: "2px solid black" }}
        >
          {/* Sidebar (Filters) */}
          <div
            className={`filter-sidebar bg-white position-relative h-100  p-3 ${
              showFilter ? "filter-active" : ""
            }`}
          >
            <div className="d-flex justify-content-between align-items-center mb-3 d-lg-none  filter-content ">
              <h5 className="mb-0">Filter Jobs</h5>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setShowFilter(false)}
              >
                ✕
              </button>
            </div>

            {/* Example Filters */}
            <div className="mb-4">
              <h6>Job Title</h6>
              <input
                className="form-control"
                type="text"
                name="job_title"
                id="job_title"
                value={filters.job_title}
                onChange={handleFilterChange}
              />
            </div>
            <div className="mb-4">
              <h6>Job Category</h6>
              <select
                className="form-control"
                placeholder="Job Title"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="IT">IT</option>
                <option value="HR">Human Resources</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <h6>Job Type</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fulltime"
                  name="job_type"
                  value="Full-time"
                  checked={filters.job_type.includes("Full-time")}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="fulltime">
                  Full Time
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="parttime"
                  name="job_type"
                  value="Part-time"
                  checked={filters.job_type.includes("Part-time")}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="parttime">
                  Part Time
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="internship"
                  name="job_type"
                  value="Internship"
                  checked={filters.job_type.includes("Internship")}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="internship">
                  Internship
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="freelance"
                  name="job_type"
                  value="Contract"
                  checked={filters.job_type.includes("Contract")}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="freelance">
                  Freelance / Contract
                </label>
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-4">
              <h6>Experience Level</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="entry"
                  name="experience"
                  value="0-1 years"
                  checked={filters.experience === "0-1 years"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="entry">
                  0-1 years
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="mid"
                  name="experience"
                  value="1-3 years"
                  checked={filters.experience === "1-3 years"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="mid">
                  1-3 years
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="senior"
                  name="experience"
                  value="3-5 years"
                  checked={filters.experience === "3-5 years"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="senior">
                  3-5 years
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="lead"
                  name="experience"
                  value="5+ years"
                  checked={filters.experience === "5+ years"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="lead">
                  5+ years
                </label>
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <h6>Location</h6>
              <input
                type="text"
                className="form-control"
                placeholder="City, State or Remote"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              />
              {/* <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remote"
                  name="remote"
                  value="remote"
                  checked={filters.remote}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="remote">
                  Remote Only
                </label>
              </div> */}
            </div>
            {/* Job Type */}
            <div className="mb-4">
              <h6>Work Mode</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onsite"
                  name="work_mode"
                  value="Onsite"
                  checked={filters.work_mode.includes("Onsite")}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="onsite">
                  Onsite
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remote"
                  name="work_mode"
                  value="Remote"
                  checked={filters.work_mode.includes("Remote")}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="remote">
                  Remote
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="hybrid"
                  name="work_mode"
                  value="Hybrid"
                  checked={filters.work_mode.includes("Hybrid")}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="hybrid">
                  Hybrid
                </label>
              </div>
            </div>

            {/* Salary Range */}
            <div className="mb-4">
              <h6>Salary Range (LPA)</h6>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  style={{ maxWidth: "100px" }}
                  name="minSalary"
                  value={filters.minSalary ?? ""}
                  onChange={handleFilterChange}
                  min={0}
                />
                <span className="px-2">-</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  style={{ maxWidth: "100px" }}
                  name="maxSalary"
                  value={filters.maxSalary ?? ""}
                  onChange={handleFilterChange}
                  min={0}
                />
              </div>
            </div>

            {/* Posted Date */}
            <div className="mb-4">
              <h6>Date Posted</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="today"
                  name="posted_date"
                  value="today"
                  checked={filters.posted_date === "today"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="today">
                  Today
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="3days"
                  name="posted_date"
                  value="3days"
                  checked={filters.posted_date === "3days"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="3days">
                  Last 3 Days
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="7days"
                  name="posted_date"
                  value="7days"
                  checked={filters.posted_date === "7days"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="7days">
                  Last 7 Days
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="30days"
                  name="posted_date"
                  value="30days"
                  checked={filters.posted_date === "30days"}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="30days">
                  Last 30 Days
                </label>
              </div>
            </div>

            {/* Company */}
            {/* <div className="mb-4">
              <h6>Company</h6>
              <input
                type="text"
                className="form-control"
                placeholder="Search company"
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
              />
            </div> */}

            {/* Industry */}
            {/* <div className="mb-4">
              <h6>Industry</h6>
              <select
                className="form-control"
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
              >
                <option>All Industries</option>
                <option >IT & Software</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
                <option>Retail</option>
                <option>Manufacturing</option>
              </select>
            </div> */}

            {/* Apply Filters Button */}
            <button
              className="btn btn-success text-white w-100 mt-3"
              style={{ fontWeight: "600" }}
              type="button"
              // onClick={applyFilter}
            >
              Apply Filters
            </button>
            <button
              className="btn btn-success text-white w-100 mt-3"
              style={{ fontWeight: "600" }}
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          {/* Job Listing Section */}
          <div className={`job-card-content custom-width`}>
            {/* Toggle Button (only visible on mobile) */}
            <button
              className="btn btn-outline-success mb-3 d-lg-none mx-0 mx-md-4"
              onClick={() => setShowFilter(!showFilter)}
            >
              {/* <svg width="20" height="20" fill="green" viewBox="0 0 20 20">
                    <path d="M3 6h14M3 12h14M3 18h14" />
                  </svg>{" "} */}
              Filters
            </button>

            <section
              className="featured-job-area  "
              // style={{ border: "2px solid black" }}
            >
              <div className=" sort-tab p-2">
                <div
                  className="col-lg-12 px-0 px-md-4"
                  // style={{ border: "2px solid red" }}
                >
                  <div className="count-job mb-35 ">
                    <div
                      // style={{ border: "2px solid red" }}
                      className="d-flex align-items-center"
                    >
                      <h6>{jobs.length} Jobs found</h6>
                    </div>

                    <div
                      className="select-job-items d-flex align-items-center "
                      // style={{ border: "2px solid red" }}
                    >
                      <span>Sort by</span>
                      <select
                        name=""
                        style={{
                          background: "transparent",
                          padding: "2px",
                        }}
                        onChange={(e) => {
                          setSort(e.target.value);
                          setPage(1);
                        }}
                      >
                        <option value="recent">Most Recent</option>
                        <option value="relevance">Relevance</option>
                        <option value="salary_desc">Salary: High to Low</option>
                        <option value="salary_asc">Salary: Low to High</option>
                        <option value="title_asc">Job Title: A–Z</option>
                        <option value="title_desc">Job Title: Z–A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* job section  */}

              {loading && <p className="text-center mt-3">Loading..</p>}
              <ul className=" mb-lg-5 mt-3  job-listings ">
                {jobs.length > 0 &&
                  jobs.map((job) => (
                    <li
                      className="job-listing d-block d-md-flex pb-3 pb-sm-0 align-items-center"
                      onClick={() => handleCick(job._id)}
                      style={{ cursor: "pointer" }}
                      key={job._id}
                    >
                      <div className="job-listing-logo">
                        <img
                          src={job.createdBy?.company_logo}
                          alt={job.createdBy?.company_name}
                          className="img-fluid"
                        />
                      </div>

                      <div className="job-listing-about d-md-flex  w-100 justify-content-between mx-3">
                        <div className="job-listing-position w-50 mb-1 mb-sm-0">
                          <h2 style={{ fontSize: "18px" }}>
                            {job.job_title?.charAt(0).toUpperCase() +
                              job.job_title?.slice(1)}
                          </h2>
                          <strong>{job.createdBy?.company_name}</strong>
                        </div>
                        <div className="job-listing-location mb-1 mb-sm-0  w-25">
                          <span className="icon-room"></span>{" "}
                          {(job.location || job.work_mode)
                            ?.charAt(0)
                            .toUpperCase() +
                            (job.location || job.work_mode)?.slice(1)}
                        </div>
                        <div className="job-listing-location mb-1  w-25">
                          <span className=""></span>
                          {formatSalary(job.minSalary, job.maxSalary)}
                        </div>
                        <div className="job-listing-meta mb-4">
                          <span
                            className={`badge ${
                              job.job_type === "Full-time"
                                ? "badge-success"
                                : "badge-danger"
                            } `}
                          >
                            {job.job_type}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* call to action  */}

      <section
        className=" bg-image overlay-primary fixed overlay "
        id="next-section"
        style={{
          backgroundImage: "url('images/cta-1.jpeg')",
          padding: "6rem 0",
          marginTop: "4rem",
        }}
      >
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div
              className="col-md-7 text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <h2 className="section-title mb-2 text-white">
                Join with us for more information
              </h2>
              <p className=" text-white">
                It’s easier to reach your savings goals when you have the right
                savings account.
              </p>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/contact")}
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListings;

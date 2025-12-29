import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPublicJobById } from "../Utils/frontendJobs";
import FrontendContext from "../context/FrontendContext";
import Notification from "../admin/Components/Notification";

const JobDescription = () => {
  useEffect(() => {
    document.title = "JobsAlgo | Job Description";
  }, []);

  const { user, notif, setNotif } = useContext(FrontendContext);
  // console.log(user);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  //capitalize

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
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

  useEffect(() => {
    if (notif?.message) {
      setNotif({ id: null, message: "", type: "" });
    }
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await getPublicJobById(id);
        if (res?.success) {
          setJob(res.job);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  function handleClick() {
    // console.log(Frontend_User);
    if (!user) {
      setNotif({ id: Date.now(), message: "Register First", type: "error" });
      setTimeout(() => {
        navigate("/login", {
          state: { from: location },
        });
      }, 4000);
      return;
    }
    setNotif({
      id: Date.now(),
      message: "You applied successfully",
      type: "success",
    });
  }

  return (
    <>
      {notif.message && (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
        />
      )}

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
        style={{ backgroundImage: "url('/images/jobsalgo-hero.jpg')" }}
        id="home-section"
      >
        {/* <div className="container">
              <div className="row">
                <div
                  className="col-md-7"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h1
                    className="text-white font-weight-bold"
                    style={{ fontWeight: "600" }}
                  >
                    {job.job_title}
                  </h1>
                  <strong style={{ color: "#89ba16" }}>
                    {job.createdBy?.company_name}
                  </strong>
                </div>
              </div>
            </div> */}
        <div className="container">
          <div className="row">
            <div className="col-md-7" data-aos="fade-up" data-aos-delay="200">
              <h1 className="text-white font-weight-bold">Job Description</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash">/</span>
                <Link to="/jobs">Jobs</Link>{" "}
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Job Desciption</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="container">
          <div
            className="row text-center d-flex justify-content-center py-5"
            style={{ height: "500px" }}
          >
            Loading...
          </div>
        </div>
      )}

      {job && (
        <section className="site-section">
          <div className="container">
            <div className="row align-items-center mb-5">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <div className="d-flex align-items-center">
                  <div className="border p-2 d-inline-block mr-3 rounded">
                    <img
                      src={job.createdBy?.company_logo}
                      alt={job.createdBy?.company_name}
                    />
                  </div>
                  <div>
                    <h2>{job.job_title}</h2>
                    <div>
                      <span className="ml-0 mr-2 mb-2">
                        <span className="icon-briefcase mr-2"></span>
                        {job.createdBy?.company_name}
                      </span>
                      <span className="m-2">
                        <span className="icon-room mr-2"></span>
                        {(job.location || job.work_mode)
                          ?.charAt(0)
                          .toUpperCase() +
                          (job.location || job.work_mode)?.slice(1)}
                      </span>
                      <span className="m-2">
                        <span className="icon-clock-o mr-2"></span>
                        <span className="text-primary">{job.job_type}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4">
              <div className="row">
                <div className="col-6">
                  <Link to="#" className="btn btn-block btn-light btn-md">
                    <span className="icon-heart-o mr-2 text-danger"></span>Save
                    Job
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="#"
                    className="btn btn-block btn-primary btn-md"
                    style={{ fontWeight: "600" }}
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div> */}
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="mb-5">
                  {/* <figure
                      className="mb-5"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <img
                        src="images/job_single_img_1.jpg"
                        alt="Job Illustration"
                        className="img-fluid rounded"
                      />
                    </figure> */}
                  <h3
                    className="h5 d-flex align-items-center mb-4 text-primary"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <span className="icon-align-left mr-3"></span>Job
                    Description
                  </h3>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    dangerouslySetInnerHTML={{ __html: job.job_description }}
                  ></div>
                </div>

                {/* <div className="mb-5">
                    <h3
                      className="h5 d-flex align-items-center mb-4 text-primary"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <span className="icon-rocket mr-3"></span>Responsibilities
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>
                          Create wireframes, prototypes, and visual designs
                        </span>
                      </li>
                      <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>
                          Collaborate with product and engineering teams
                        </span>
                      </li>
                      <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>
                          Ensure consistent branding and design standards
                        </span>
                      </li>
                      <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>Conduct user research and usability testing</span>
                      </li>
                    </ul>
                  </div> */}

                <div className="mb-5">
                  <h3
                    className="h5 d-flex align-items-center mb-4 text-primary"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <span className="icon-book mr-3"></span>Education +
                    Experience
                  </h3>
                  <ul className="list-unstyled m-0 p-0">
                    <li
                      className="d-flex align-items-start mb-2"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <span className="icon-check_circle mr-2 text-muted"></span>
                      <span>{job.education}</span>
                    </li>
                    <li
                      className="d-flex align-items-start mb-2"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <span className="icon-check_circle mr-2 text-muted"></span>

                      <span>
                        {job.skills
                          ?.map((skill) => capitalize(skill))
                          .join(", ")}
                      </span>
                    </li>
                    {/* <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>
                          Strong portfolio demonstrating design thinking
                        </span>
                      </li> */}
                  </ul>
                </div>

                {/* <div className="mb-5">
                    <h3
                      className="h5 d-flex align-items-center mb-4 text-primary"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <span className="icon-turned_in mr-3"></span>Other
                      Benefits
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>Flexible work hours and remote options</span>
                      </li>
                      <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>Health, dental, and vision insurance</span>
                      </li>
                      <li
                        className="d-flex align-items-start mb-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <span className="icon-check_circle mr-2 text-muted"></span>
                        <span>Learning & development support</span>
                      </li>
                    </ul>
                  </div> */}

                <div
                  className="row mb-5"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  {/* <div className="col-6">
                  <Link
                    to="#"
                    className="btn btn-block btn-light btn-md border border-grey"
                  >
                    <span className="icon-heart-o mr-2 text-danger"></span>Save
                    Job
                  </Link>
                </div> */}
                  <div className="col-6">
                    <button
                      className="btn btn-block btn-primary btn-md"
                      style={{ fontWeight: "600" }}
                      onClick={handleClick}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar  */}
              <div className="col-lg-4">
                <div
                  className="bg-light p-3 border rounded mb-4"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <h3 className="text-primary mt-3 h5 pl-3 mb-3">
                    Job Summary
                  </h3>
                  <ul className="list-unstyled pl-3 mb-0">
                    <li className="mb-2">
                      <strong className="text-black">Published on:</strong>{" "}
                      {new Date(job.posted_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </li>
                    <li className="mb-2">
                      <strong className="text-black">Vacancy:</strong>{" "}
                      {job.number_of_openings}
                    </li>
                    <li className="mb-2">
                      <strong className="text-black">Employment Type:</strong>{" "}
                      {job.employment_type}
                    </li>
                    <li className="mb-2">
                      <strong className="text-black">Experience:</strong>{" "}
                      {job.experience}
                    </li>
                    <li className="mb-2">
                      <strong className="text-black">Category:</strong>{" "}
                      {job.category}
                    </li>
                    <li className="mb-2">
                      <strong className="text-black">Salary:</strong>{" "}
                      {formatSalary(job.minSalary, job.maxSalary)}
                    </li>
                    <li className="mb-2">
                      <strong className="text-black">Gender:</strong> Any
                    </li>
                    <li className="mb-2">
                      <strong className="text-black">
                        Application Deadline:
                      </strong>{" "}
                      {new Date(job.application_deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </li>
                  </ul>
                </div>
                {/* 
                  <div
                    className="bg-light p-3 border rounded"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <h3 className="text-primary mt-3 h5 pl-3 mb-3">Share</h3>
                    <div className="px-3">
                      <Link to="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-facebook"></span>
                      </Link>
                      <Link to="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-twitter"></span>
                      </Link>
                      <Link to="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-linkedin"></span>
                      </Link>
                      <Link to="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-pinterest"></span>
                      </Link>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* call to action  */}

      <section
        className="bg-image overlay-primary fixed overlay"
        id="next-section"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184316/pexels-photo-3184316.jpeg')",
          padding: "6rem 0",
          marginTop: "7rem",
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
                Discover More Opportunities
              </h2>
              <p className="text-white">
                Keep exploring thousands of job openings and find the one that
                fits your career goals on SimplyfyJob.
              </p>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/contact")}
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDescription;

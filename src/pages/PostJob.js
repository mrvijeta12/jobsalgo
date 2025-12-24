import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SkillsInput from "../admin/Components/SkillsInput";
import FrontendContext from "../context/FrontendContext";
import { validate } from "../admin/Utils/Validate";
import { postFrontendJob } from "../Utils/frontendJobs";
import Notification from "../admin/Components/Notification";

const PostJob = () => {
  const { errors, setErrors, notif, setNotif, user, token } =
    useContext(FrontendContext);
  // console.log(user);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [jobFormData, setJobFormData] = useState({
    company_name: "",
    job_title: "",
    category: "",
    work_mode: "",
    location: "",
    experience: "",
    job_level: "",
    salary_range: "",
    openings: "1",
    job_type: "Full Time",
    employment_type: "",
    job_description: "",
    skills: [],
    company_email: "",
    company_website: "",
    company_description: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    education: "",
    posted_date: "",
    application_deadline: "",
  });

  const refs = {
    company_name: useRef(null),
    job_title: useRef(null),
    category: useRef(null),
    work_mode: useRef(null),
    location: useRef(null),
    experience: useRef(null),
    job_level: useRef(null),
    salary_range: useRef(null),
    openings: useRef(null),
    job_type: useRef(null),
    employment_type: useRef(null),
    job_description: useRef(null),
    skills: useRef(null),
    company_email: useRef(null),
    company_website: useRef(null),
    company_description: useRef(null),
    facebook: useRef(null),
    twitter: useRef(null),
    linkedin: useRef(null),
    education: useRef(null),
    posted_date: useRef(null),
    application_deadline: useRef(null),
  };

  // clear notification msg

  useEffect(() => {
    if (notif?.message) {
      setNotif({ id: null, message: "", type: "" });
    }
  }, []);

  // clear error msg

  useEffect(() => {
    setErrors({});
  }, []);

  // handle onchange

  function handleChange(e) {
    const { name, value } = e.target;
    setJobFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  //validate

  const validationConfig = {
    company_name: [{ required: true, message: "Company name can't be empty." }],

    job_title: [{ required: true, message: "Job title can't be empty." }],

    category: [{ required: true, message: "Category can't be empty." }],

    work_mode: [{ required: true, message: "Work mode can't be empty." }],

    location: [
      {
        custom: (value, formData) => {
          // Location required for Onsite & Hybrid
          if (
            formData.work_mode === "Onsite" ||
            formData.work_mode === "Hybrid"
          ) {
            return value.trim() !== "";
          }
          return true; // Optional for Remote
        },
        message: "Location is required for Onsite or Hybrid work mode.",
      },
    ],

    experience: [{ required: true, message: "Experience can't be empty." }],

    job_level: [{ required: true, message: "Job level can't be empty." }],

    salary_range: [{ required: true, message: "Salary range can't be empty." }],

    openings: [
      { required: true, message: "Number of openings can't be empty." },
    ],

    job_type: [{ required: true, message: "Job type can't be empty." }],

    employment_type: [
      { required: true, message: "Employment type can't be empty." },
    ],

    job_description: [
      { required: true, message: "Job description can't be empty." },
    ],

    skills: [
      {
        custom: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one skill is required.",
      },
    ],

    company_email: [
      { required: true, message: "Company email can't be empty." },
      {
        pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Please enter a valid email address.",
      },
    ],
    education: [{ required: true, message: "Education can't be empty." }],

    posted_date: [{ required: true, message: "Posted date can't be empty." }],

    application_deadline: [
      { required: true, message: "Application deadline can't be empty." },
    ],
  };

  // submitt form
  async function handleSubmit(e) {
    e.preventDefault();

    // Run normal validation
    const errors = validate(
      jobFormData,
      {
        company_name: validationConfig.company_name,
        job_title: validationConfig.job_title,
        category: validationConfig.category,
        work_mode: validationConfig.work_mode,
        location: validationConfig.location,
        experience: validationConfig.experience,
        job_level: validationConfig.job_level,
        salary_range: validationConfig.salary_range,
        openings: validationConfig.openings,
        job_type: validationConfig.job_type,
        employment_type: validationConfig.employment_type,
        job_description: validationConfig.job_description,
        skills: validationConfig.skills,
        company_email: validationConfig.company_email,
        education: validationConfig.education,
        posted_date: validationConfig.posted_date,
        application_deadline: validationConfig.application_deadline,
      },

      setErrors
    );

    setErrors(errors);

    // Stop submit if any errors exist and focus to the first error field
    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      setTimeout(() => {
        refs[firstErrorKey]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        refs[firstErrorKey]?.current?.focus?.();
      }, 100);
      // refs[firstErrorKey]?.current?.focus?.();
      return;
    }

    // console.log(jobFormData);

    try {
      setLoading(true);

      const res = await postFrontendJob(jobFormData, token, user?.id);

      if (!res.success) {
        setNotif({ id: Date.now(), message: res.message, type: "error" });
        return;
      }
      setNotif({ id: Date.now(), message: res.message, type: "success" });

      setJobFormData({
        company_name: "",
        job_title: "",
        category: "",
        work_mode: "",
        location: "",
        experience: "",
        job_level: "",
        salary_range: "",
        openings: "1",
        job_type: "Full Time",
        employment_type: "",
        job_description: "",
        skills: [],
        company_email: "",
        company_website: "",
        company_description: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        education: "",
        posted_date: "",
        application_deadline: "",
      });
    } catch (error) {
      console.log(error.message);
      const errorMsg = error.message;
      setNotif({
        id: Date.now(),
        message: errorMsg || "Something went wrong.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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
        style={{ backgroundImage: "url('images/jobsalgo-hero.jpg')" }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7" data-aos="fade-up" data-aos-delay="200">
              <h1 className="text-white font-weight-bold">Post Job</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Post Job</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="d-flex align-items-center">
                <div>
                  <h2 style={{ fontWeight: "600" }}>Job Details</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5" data-aos="zoom-in" data-aos-delay="200">
            <div className="col-lg-12">
              <form
                className="py-3 p-md-5 border rounded row"
                onSubmit={handleSubmit}
              >
                {/* Company Name */}
                <div className="form-group col-md-6">
                  <label htmlFor="company_name">Company Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company_name"
                    name="company_name"
                    placeholder="Enter your company name"
                    value={jobFormData.company_name}
                    onChange={handleChange}
                    ref={refs.company_name}
                  />
                  {errors.company_name && (
                    <p className="text-danger">{errors.company_name}</p>
                  )}
                </div>

                {/* Job Title */}
                <div className="form-group col-md-6">
                  <label htmlFor="job_title">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="job_title"
                    name="job_title"
                    placeholder="Enter job title"
                    value={jobFormData.job_title}
                    onChange={handleChange}
                    ref={refs.job_title}
                  />
                  {errors.job_title && (
                    <p className="text-danger">{errors.job_title}</p>
                  )}
                </div>

                {/* Category */}
                <div className="form-group col-md-4">
                  <label htmlFor="category">Category*</label>
                  <select
                    className="form-control border rounded"
                    id="category"
                    name="category"
                    value={jobFormData.category}
                    onChange={handleChange}
                    ref={refs.category}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                  </select>
                  {errors.category && (
                    <p className="text-danger">{errors.category}</p>
                  )}
                </div>

                {/* Work Mode */}
                <div className="form-group col-md-4">
                  <label htmlFor="work_mode">Work Mode*</label>
                  <select
                    className="form-control border rounded"
                    id="work_mode"
                    name="work_mode"
                    value={jobFormData.work_mode}
                    onChange={handleChange}
                    ref={refs.work_mode}
                  >
                    <option value="" disabled>
                      Select Work Mode
                    </option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  {errors.work_mode && (
                    <p className="text-danger">{errors.work_mode}</p>
                  )}
                </div>

                {/* Location */}
                <div className="form-group col-md-4">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    placeholder="Enter your job location"
                    value={jobFormData.location}
                    onChange={handleChange}
                    ref={refs.location}
                  />
                  {errors.location && (
                    <p className="text-danger">{errors.location}</p>
                  )}
                </div>

                {/* Experience */}
                <div className="form-group col-md-4">
                  <label htmlFor="experience">Experience*</label>
                  <select
                    className="form-control border rounded"
                    id="experience"
                    name="experience"
                    value={jobFormData.experience}
                    onChange={handleChange}
                    ref={refs.experience}
                  >
                    <option value="" disabled>
                      Select Experience
                    </option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                  {errors.experience && (
                    <p className="text-danger">{errors.experience}</p>
                  )}
                </div>

                {/* Job Level */}
                <div className="form-group col-md-4">
                  <label htmlFor="job_level">Job level*</label>
                  <select
                    className="form-control border rounded"
                    id="job_level"
                    name="job_level"
                    value={jobFormData.job_level}
                    onChange={handleChange}
                    ref={refs.job_level}
                  >
                    <option value="" disabled>
                      Select Job level
                    </option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                  {errors.job_level && (
                    <p className="text-danger">{errors.job_level}</p>
                  )}
                </div>

                {/* Salary */}
                <div className="form-group col-md-4">
                  <label htmlFor="salary_range">Salary Range*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="salary_range"
                    name="salary_range"
                    placeholder="e.g. $4000-$6000"
                    value={jobFormData.salary_range}
                    onChange={handleChange}
                    ref={refs.salary_range}
                  />
                  {errors.salary_range && (
                    <p className="text-danger">{errors.salary_range}</p>
                  )}
                </div>

                {/* Openings */}
                <div className="form-group col-md-4">
                  <label htmlFor="openings">No. of Openings</label>
                  <input
                    type="number"
                    className="form-control"
                    id="openings"
                    name="openings"
                    min={1}
                    value={jobFormData.openings}
                    onChange={handleChange}
                    ref={refs.openings}
                  />
                  {errors.openings && (
                    <p className="text-danger">{errors.openings}</p>
                  )}
                </div>

                {/* Job Type */}
                <div className="form-group col-md-4">
                  <label htmlFor="job_type">Job Type</label>
                  <select
                    className="form-control border rounded"
                    id="job_type"
                    name="job_type"
                    value={jobFormData.job_type}
                    onChange={handleChange}
                    ref={refs.job_type}
                  >
                    <option value="Part Time">Part Time</option>
                    <option value="Full Time">Full Time</option>
                  </select>
                  {errors.job_type && (
                    <p className="text-danger">{errors.job_type}</p>
                  )}
                </div>

                {/* Employment */}
                <div className="form-group col-md-4">
                  <label htmlFor="employment_type">Employment Type*</label>
                  <select
                    className="form-control border rounded"
                    id="employment_type"
                    name="employment_type"
                    value={jobFormData.employment_type}
                    onChange={handleChange}
                    ref={refs.employment_type}
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                  {errors.employment_type && (
                    <p className="text-danger">{errors.employment_type}</p>
                  )}
                </div>
                {/* Education */}
                <div className="form-group col-md-4">
                  <label htmlFor="education">Education*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="education"
                    name="education"
                    placeholder="e.g. B.Tech / MBA"
                    value={jobFormData.education}
                    onChange={handleChange}
                    ref={refs.education}
                  />
                  {errors.education && (
                    <p className="text-danger">{errors.education}</p>
                  )}
                </div>

                {/* Posted Date */}
                <div className="form-group col-md-4">
                  <label htmlFor="posted_date">Posted Date*</label>
                  <input
                    type="date"
                    className="form-control"
                    id="posted_date"
                    name="posted_date"
                    value={jobFormData.posted_date}
                    onChange={handleChange}
                    ref={refs.posted_date}
                  />
                  {errors.posted_date && (
                    <p className="text-danger">{errors.posted_date}</p>
                  )}
                </div>

                {/* Application Deadline */}
                <div className="form-group col-md-4">
                  <label htmlFor="application_deadline">
                    Application Deadline*
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="application_deadline"
                    name="application_deadline"
                    value={jobFormData.application_deadline}
                    onChange={handleChange}
                    ref={refs.application_deadline}
                  />
                  {errors.application_deadline && (
                    <p className="text-danger">{errors.application_deadline}</p>
                  )}
                </div>

                {/* Description */}
                <div className="form-group col-12">
                  <label htmlFor="job_description">Job Description</label>
                  <textarea
                    className="w-100"
                    rows={6}
                    id="job_description"
                    name="job_description"
                    value={jobFormData.job_description}
                    onChange={handleChange}
                    ref={refs.job_description}
                  />
                  {errors.job_description && (
                    <p className="text-danger">{errors.job_description}</p>
                  )}
                </div>

                {/* Skills */}
                <div className="form-group col-12">
                  <label htmlFor="skills">Skills*</label>
                  <SkillsInput
                    value={jobFormData.skills}
                    ref={refs.skills}
                    onChange={(skillsList) => {
                      setJobFormData((prev) => ({
                        ...prev,
                        skills: skillsList,
                      }));
                      setErrors((prev) => ({ ...prev, skills: "" }));
                    }}
                  />
                  {errors.skills && (
                    <p className="text-danger">{errors.skills}</p>
                  )}
                </div>

                <h3
                  className="text-black my-5 pb-2 col-12"
                  style={{ fontWeight: "600" }}
                >
                  Company Details
                </h3>

                {/* Company Details  */}
                <div className="form-group col-md-6">
                  <label htmlFor="company_details_name">Company Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company_email"
                    name="company_email"
                    value={jobFormData.company_email}
                    onChange={handleChange}
                    ref={refs.company_email}
                  />
                  {errors.company_email && (
                    <p className="text-danger">{errors.company_email}</p>
                  )}
                </div>

                {/* Website */}
                <div className="form-group col-md-6">
                  <label htmlFor="company_website">Website (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company_website"
                    name="company_website"
                    placeholder="https://"
                    value={jobFormData.company_website}
                    onChange={handleChange}
                    ref={refs.company_website}
                  />
                </div>

                {/* Description */}
                <div className="form-group col-12">
                  <label htmlFor="company_description">
                    Company Description (Optional)
                  </label>
                  <textarea
                    className="w-100"
                    rows={4}
                    id="company_description"
                    name="company_description"
                    value={jobFormData.company_description}
                    onChange={handleChange}
                    ref={refs.company_description}
                  />
                </div>

                {/* Social Links */}
                <div className="form-group col-md-4">
                  <label htmlFor="facebook">Facebook Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="facebook"
                    name="facebook"
                    placeholder="companyname"
                    value={jobFormData.facebook}
                    onChange={handleChange}
                    ref={refs.facebook}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="twitter">Twitter Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="twitter"
                    name="twitter"
                    placeholder="@companyname"
                    value={jobFormData.twitter}
                    onChange={handleChange}
                    ref={refs.twitter}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="linkedin">LinkedIn Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="linkedin"
                    name="linkedin"
                    placeholder="companyname"
                    value={jobFormData.linkedin}
                    onChange={handleChange}
                    ref={refs.linkedin}
                  />
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-block btn-primary btn-md w-md-50"
                    style={{ fontWeight: "600" }}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

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
                Connect with SimplyfyJob
              </h2>
              <p className="text-white">
                Whether you’re looking for top talent or exploring career
                opportunities, SimplyfyJob makes it simple to connect the right
                people with the right jobs.
              </p>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/contact")}
              >
                Let’s Talk
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostJob;

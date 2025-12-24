import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Input from "../Components/Input";
import AdminContext from "../Context/AdminContext";
import styles from "../assets/admin.module.css";
// import TextEditor from "../Components/TextEditor";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { validate } from "../Utils/Validate";
import { addJob } from "../Utils/jobsLogic";
import Notification from "../Components/Notification";
import { getEmployer, getEmployersByUser } from "../Utils/employersLogic";
import SkillsInput from "../Components/SkillsInput";

const AddNewJob = () => {
  const {
    errors,
    setErrors,
    token,
    setNotif,
    notif,
    isValidImage,
    createdEmployersByUser,
    selectEmployerId,
    setSelectEmployerId,
    company,
    setCompany,
    setRefreshJob,
  } = useContext(AdminContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // console.log(company);

  const refs = {
    job_title: useRef(),
    email: useRef(),
    job_type: useRef(),
    category: useRef(),
    location: useRef(),
    salary: useRef(),
    experience: useRef(),
    number_of_openings: useRef(),
    application_deadline: useRef(),
    posted_date: useRef(),
    skills: useRef(),
    education: useRef(),
    work_mode: useRef(),
    employment_type: useRef(),
    job_level: useRef(),
    job_description: useRef(), // editor
  };

  const [jobFormData, setJobFormData] = useState({
    job_title: "",
    job_type: "",
    category: "",
    location: "",
    salary: "",
    experience: "",
    number_of_openings: "1",
    application_deadline: "",
    posted_date: "",
    job_description: "",
    skills: [],
    education: "",
    work_mode: "",
    employment_type: "",
    email: "",
    job_level: "",
    application_link: "",
    jobStatus: "Draft",
  });

  // console.log(jobFormData);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Job Description...",
      height: 400,
    }),
    []
  );

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

  // handle form input
  function handleChange(e) {
    const { name, value } = e.target;
    setJobFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevError) => ({ ...prevError, [name]: "" }));
  }

  // validate input
  const validationConfig = {
    job_title: [{ required: true, message: "This fields can't be empty." }],
    email: [
      { required: true, message: "This fields can't be empty." },
      {
        pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Please enter a valid email address.",
      },
    ],

    category: [{ required: true, message: "This fields can't be empty." }],
    job_type: [{ required: true, message: "This fields can't be empty." }],
    location: [
      {
        custom: (value, formData) => {
          // If work_mode is Onsite or Hybrid → location must not be empty
          if (
            formData.work_mode === "Onsite" ||
            formData.work_mode === "Hybrid"
          ) {
            return value.trim() !== "";
          }
          return true; // Otherwise, location is optional
        },
        message: "Location is required for Onsite or Hybrid work mode.",
      },
    ],

    salary: [{ required: true, message: "Please select salary range." }],
    experience: [{ required: true, message: "This fields can't be empty." }],
    number_of_openings: [
      { required: true, message: "This fields can't be empty." },
    ],
    application_deadline: [
      { required: true, message: "This fields can't be empty." },
    ],
    posted_date: [{ required: true, message: "This fields can't be empty." }],
    job_description: [
      { required: true, message: "This fields can't be empty." },
    ],
    skills: [
      {
        custom: (value) => Array.isArray(value) && value.length > 0,
        message: "Skill is required.",
      },
    ],

    education: [{ required: true, message: "This fields can't be empty." }],
    work_mode: [{ required: true, message: "This fields can't be empty." }],
    employment_type: [
      { required: true, message: "This fields can't be empty." },
    ],
    job_level: [{ required: true, message: "This fields can't be empty." }],
    work_mode: [{ required: true, message: "This fields can't be empty." }],
  };

  // form submit
  async function handleSubmit(e) {
    e.preventDefault();

    // Run normal validation
    const errors = validate(
      jobFormData,
      {
        job_title: validationConfig.job_title,
        email: validationConfig.email,
        job_type: validationConfig.job_type,
        category: validationConfig.category,
        location: validationConfig.location,
        salary: validationConfig.salary,
        experience: validationConfig.experience,
        number_of_openings: validationConfig.number_of_openings,
        application_deadline: validationConfig.application_deadline,
        posted_date: validationConfig.posted_date,
        job_description: validationConfig.job_description,
        skills: validationConfig.skills,
        education: validationConfig.education,
        work_mode: validationConfig.work_mode,
        employment_type: validationConfig.employment_type,
        job_level: validationConfig.job_level,
      },
      setErrors
    );

    // Clean HTML content for job description
    const cleanDescription = jobFormData.job_description
      .replace(/<[^>]+>/g, "")
      .trim();

    // Override error only if HTML content is empty
    if (!cleanDescription) {
      errors.job_description = "This field can't be empty.";
    }

    // Apply final errors
    setErrors(errors); // ✅ THIS WAS MISSING

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
    try {
      setLoading(true);
      const res = await addJob(jobFormData, token, selectEmployerId);
      if (!res.success) {
        setNotif({ id: Date.now(), message: res.message, type: "error" });
        return;
      }
      setRefreshJob((prev) => !prev);
      setNotif({ id: Date.now(), message: res.message, type: "success" });
      setJobFormData({
        company_logo: "",
        job_title: "",
        job_type: "",
        category: "",
        location: "",
        salary: "",
        experience: "",
        number_of_openings: "1",
        application_deadline: "",
        posted_date: "",
        job_description: "",
        skills: [],
        education: "",
        work_mode: "",
        employment_type: "",
        email: "",
        job_level: "",
        application_link: "",
        jobStatus: "Draft",
      });
      setSelectEmployerId("");
      setCompany({ logo: "", name: "" });

      setTimeout(() => {
        navigate("/admin/jobs");
      }, 4000);
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
      <form
        className="container rounded  shadow px-3 pt-3 pb-5 bg-white "
        onSubmit={handleSubmit}
      >
        {/* Job Info Section */}
        <div className="row mb-5">
          <div className="col-sm-6">
            {" "}
            <h4 className="mb-3 fw-bold"> Job Information</h4>
          </div>
          <div className="col-sm-6">
            <select
              className="form-control"
              onChange={(e) => setSelectEmployerId(e.target.value)}
              value={selectEmployerId}
            >
              <option value="" disabled>
                Select Employer
              </option>

              {createdEmployersByUser?.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.company_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectEmployerId && (
          <div>
            <div className="row g-3 ">
              {/* company logo  */}
              <div className="col-12 d-flex flex-column justify-content-center align-items-center mb-2">
                <div className={`${styles.company_logo} mb-3`}>
                  {isValidImage ? (
                    <img
                      src={company.logo ? company.logo : null}
                      alt="company logo"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  ) : (
                    // Default company logo (SVG)
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="#999"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L2 7v2h20V7l-10-5zm0 3.1L17.74 8H6.26L12 5.1zM2 11h20v11H2V11zm6 2v7h2v-7H8zm6 0v7h2v-7h-2z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="col-12 mb-2 ">
                <label className="form-label fw-semibold">Company Logo*</label>
                <Input
                  type="text"
                  id="company_logo"
                  placeholder="Company Logo"
                  name="company_logo"
                  onChange={handleChange}
                  value={company.logo}
                  readOnly={true}
                />
                {errors.company_logo && (
                  <p className="text-danger">{errors.company_logo}</p>
                )}
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">Company Name</label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Tech Corp"
                  name="company_name"
                  onChange={handleChange}
                  value={company.name}
                  readOnly={true}
                />
                {errors.company_name && (
                  <p className="text-danger">{errors.company_name}</p>
                )}
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">Job Title*</label>
                <Input
                  ref={refs.job_title}
                  type="text"
                  className="form-control"
                  placeholder="Frontend Developer"
                  name="job_title"
                  onChange={handleChange}
                  value={jobFormData.job_title}
                />
                {errors.job_title && (
                  <p className="text-danger">{errors.job_title}</p>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Category*</label>
                <select
                  ref={refs.category}
                  className="form-select w-100"
                  style={{ padding: "6px 12px" }}
                  name="category"
                  value={jobFormData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
                {errors.category && (
                  <p className="text-danger">{errors.category}</p>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Work Mode*</label>
                <select
                  ref={refs.work_mode}
                  className="form-select w-100"
                  style={{ padding: "6px 12px" }}
                  name="work_mode"
                  value={jobFormData.work_mode}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Mode
                  </option>
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.work_mode && (
                  <p className="text-danger">{errors.work_mode}</p>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Job Location*</label>
                <Input
                  ref={refs.location}
                  type="text"
                  className="form-control"
                  placeholder="Bangalore / Remote"
                  name="location"
                  onChange={handleChange}
                  value={jobFormData.location}
                />
                {errors.location && (
                  <p className="text-danger">{errors.location}</p>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Salary Range*</label>
                <Input
                  ref={refs.salary}
                  type="text"
                  className="form-control"
                  placeholder="₹4,00,000 - ₹6,00,000/year"
                  name="salary"
                  onChange={handleChange}
                  value={jobFormData.salary}
                />
                {errors.salary && (
                  <p className="text-danger">{errors.salary}</p>
                )}
              </div>

              <div className="col-md-4 mb-2">
                <label className="form-label">Experience*</label>
                <select
                  ref={refs.experience}
                  className="form-select w-100"
                  style={{ padding: "6px 12px" }}
                  name="experience"
                  value={jobFormData.experience}
                  onChange={handleChange}
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
              <div className="col-md-4 mb-2">
                <label className="form-label">Job Level*</label>
                <select
                  ref={refs.job_level}
                  className="form-select w-100"
                  style={{ padding: "6px 12px" }}
                  name="job_level"
                  value={jobFormData.job_level}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Level
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
              <div className="col-md-4 mb-2">
                <label className="form-label">Number of Openings*</label>
                <Input
                  ref={refs.number_of_openings}
                  type="number"
                  className="form-control"
                  name="number_of_openings"
                  onChange={handleChange}
                  value={jobFormData.number_of_openings}
                />
                {errors.number_of_openings && (
                  <p className="text-danger">{errors.number_of_openings}</p>
                )}
              </div>

              <div className="col-md-4 mb-2">
                <label className="form-label">Job Type*</label>
                <select
                  ref={refs.job_type}
                  className="form-select w-100 "
                  style={{ padding: "6px 12px" }}
                  name="job_type"
                  value={jobFormData.job_type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                </select>
                {errors.job_type && (
                  <p className="text-danger">{errors.job_type}</p>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Employment Type*</label>
                <select
                  ref={refs.employment_type}
                  className="form-select w-100"
                  style={{ padding: "6px 12px" }}
                  name="employment_type"
                  value={jobFormData.employment_type}
                  onChange={handleChange}
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

              <div className="col-md-4 mb-2">
                <label className="form-label">Posted Date*</label>
                <Input
                  ref={refs.posted_date}
                  type="date"
                  className="form-control"
                  name="posted_date"
                  onChange={handleChange}
                  value={jobFormData.posted_date}
                />
                {errors.posted_date && (
                  <p className="text-danger">{errors.posted_date}</p>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Application Deadline*</label>
                <Input
                  ref={refs.application_deadline}
                  type="date"
                  className="form-control"
                  name="application_deadline"
                  onChange={handleChange}
                  value={jobFormData.application_deadline}
                />
                {errors.application_deadline && (
                  <p className="text-danger">{errors.application_deadline}</p>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Education Requirement*</label>
                <Input
                  ref={refs.education}
                  type="text"
                  className="form-control"
                  placeholder="B.Tech, MCA"
                  name="education"
                  onChange={handleChange}
                  value={jobFormData.education}
                />
                {errors.education && (
                  <p className="text-danger">{errors.education}</p>
                )}
              </div>
            </div>

            <h4 className="mt-5 mb-3 fw-bold"> Job Details*</h4>
            <div className="mb-3">
              <label className="form-label">Job Description</label>
              <JoditEditor
                ref={refs.job_description}
                value={jobFormData.job_description}
                config={config}
                onChange={(newContent) => {
                  setJobFormData({
                    ...jobFormData,
                    job_description: newContent,
                  });
                  setErrors((prev) => ({ ...prev, job_description: "" }));
                }}
              />

              {errors.job_description && (
                <p className="text-danger">{errors.job_description}</p>
              )}

              {/* You can replace this textarea with <ReactQuill /> */}
            </div>

            <div className="mb-2">
              <label className="form-label">Required Skills*</label>

              <div ref={refs.skills}>
                <SkillsInput
                  value={jobFormData.skills}
                  onChange={(skillsList) => {
                    setJobFormData((prev) => ({ ...prev, skills: skillsList }));
                    setErrors((prev) => ({ ...prev, skills: "" }));
                  }}
                />
              </div>

              {errors.skills && <p className="text-danger">{errors.skills}</p>}
            </div>

            {/* Contact & Application Section */}
            <h4 className="mt-3 mb-3 fw-bold"> Contact & Application</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Contact Email*</label>
                <Input
                  ref={refs.email}
                  type="email"
                  className="form-control"
                  placeholder="hr@example.com"
                  name="email"
                  onChange={handleChange}
                  value={jobFormData.email}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Application Link (Optional)
                </label>
                <Input
                  type="url"
                  className="form-control"
                  placeholder="https://apply.job.com"
                  name="application_link"
                  onChange={handleChange}
                  value={jobFormData.application_link}
                />
              </div>
              <div className="col-md-4 mb-4">
                <label className="form-label">Job Status</label>
                <select
                  className="form-select w-100"
                  style={{ padding: "6px 12px" }}
                  name="jobStatus"
                  onChange={handleChange}
                  value={jobFormData.jobStatus}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.global_btn} btn px-4`}
              style={{
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              Save Job
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default AddNewJob;

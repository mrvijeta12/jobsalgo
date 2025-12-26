import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Input from "../Components/Input";
import { validate } from "../Utils/Validate";
import AdminContext from "../Context/AdminContext";
import Notification from "../Components/Notification";
import styles from "../assets/admin.module.css";
import JoditEditor from "jodit-react";
import { getJob, updatejob } from "../Utils/jobsLogic";

import { useNavigate, useSearchParams } from "react-router-dom";
import SkillsInput from "../Components/SkillsInput";

const EditJob = () => {
  const { errors, setErrors, token, setNotif, notif, company } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")?.trim();
  const navigate = useNavigate();
  const [isValidImage, setIsValidImage] = useState(true);

  const refs = {
    job_title: useRef(),
    email: useRef(),
    company_name: useRef(),
    job_type: useRef(),
    category: useRef(),
    location: useRef(),
    minSalary: useRef(),
    maxSalary: useRef(),
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
    minSalary: "",
    maxSalary: "",
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

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
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

  //fetch job by id
  useEffect(() => {
    // Define an inner async function
    async function fetchJob() {
      try {
        setLoading(true);

        // Token validation
        if (!token) {
          setNotif({
            id: Date.now(),
            message: "Your session has expired. Please log in again.",
            type: "error",
          });
          navigate("/admin/login");
          return;
        }

        // ID validation
        if (!id) {
          setNotif({
            id: Date.now(),
            message: "Invalid job ID",
            type: "error",
          });
          return;
        }

        // Fetch job data
        const res = await getJob(id, token);
        // console.log(res);

        if (!res.success) {
          setNotif({
            id: Date.now(),
            message: res.message,
            type: "error",
          });
          return;
        }

        setJobFormData({
          ...res.job,
          posted_date: res.job.posted_date?.split("T")[0] || "",
          application_deadline:
            res.job.application_deadline?.split("T")[0] || "",
        });
        // console.log(jobFormData);
      } catch (error) {
        console.error("fetch job error:", error);
        setNotif({
          id: Date.now(),
          message: "Error occurred while fetching job data.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id, token]);

  // handle inputs

  function handleChange(e) {
    const { name, value } = e.target;
    setJobFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevError) => ({ ...prevError, [name]: "" }));
  }

  //validate input
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

    minSalary: [{ required: true, message: "This fields can't be empty." }],
    maxSalary: [
      { required: true, message: "This fields can't be empty." },
      {
        custom: (value, jobFormData) => {
          let min = parseFloat(jobFormData.minSalary);
          let max = parseFloat(value);
          if (isNaN(min) || isNaN(max)) return true;
          return max >= min;
        },
        message:
          "Maximum salary must be greater than or equal to minimum salary.",
      },
    ],
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

  // company logo
  useEffect(() => {
    if (!jobFormData.createdBy?.company_logo) {
      setIsValidImage(false);
      return;
    }

    const img = new Image();
    img.src = jobFormData.createdBy.company_logo;

    img.onload = () => setIsValidImage(true); // URL is correct
    img.onerror = () => setIsValidImage(false); // URL is broken
  }, [jobFormData?.createdBy?.company_logo]);

  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(
      jobFormData,
      {
        job_title: validationConfig.job_title,
        email: validationConfig.email,
        job_type: validationConfig.job_type,
        category: validationConfig.category,
        location: validationConfig.location,
        minSalary: validationConfig.minSalary,
        maxSalary: validationConfig.maxSalary,
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

    // Stop submit if any errors exist
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
      const res = await updatejob(id, jobFormData, token);
      if (!res.success) {
        setNotif({
          id: Date.now(),
          message: res.message,
          type: "success",
        });
        return;
      }

      setNotif({
        id: Date.now(),
        message: res.message || "Job custom updated successfully",
        type: "success",
      });
      setJobFormData({
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

      setTimeout(() => {
        navigate("/admin/jobs");
      }, 4000);
    } catch (error) {
      console.log(error.message);
      const errorMsg = error.message || "Update failed";
      setNotif({
        id: Date.now(),
        message: errorMsg || "Error updating job ",
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
      <div className="container rounded shadow px-3 pt-3 pb-5 bg-white ">
        <div className="row mb-4 d-flex justify-content-between">
          <div className="col-md-6 d-flex">
            <h3 className="mb-0 fw-bold">Edit Job</h3>
          </div>
        </div>

        <form
          className="container rounded  shadow px-3 pt-3 pb-5 bg-white "
          onSubmit={handleSubmit}
        >
          {/* Job Info Section */}
          <h4 className="mb-3 fw-bold"> Job Information</h4>
          <div className="row g-3">
            {/* company logo  */}
            <div className="col-12 d-flex flex-column justify-content-center align-items-center mb-2">
              <div className={`${styles.company_logo} mb-3`}>
                {isValidImage ? (
                  <img
                    src={
                      jobFormData.createdBy?.company_logo
                        ? jobFormData.createdBy?.company_logo
                        : null
                    }
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
                ref={refs.company_logo}
                type="text"
                id="company_logo"
                placeholder="Company Logo"
                name="company_logo"
                onChange={handleChange}
                value={jobFormData.createdBy?.company_logo}
                readOnly={true}
              />
              {errors.company_logo && (
                <p className="text-danger">{errors.company_logo}</p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Company Name</label>
              <Input
                ref={refs.company_name}
                type="text"
                className="form-control"
                placeholder="Tech Corp"
                name="company_name"
                onChange={handleChange}
                value={jobFormData.createdBy?.company_name}
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
              <label className="form-label">Minimun Salary*</label>
              <Input
                ref={refs.minSalary}
                className="form-control"
                type="number"
                min="0"
                max="1000"
                step="0.1"
                placeholder="3.5 or 110 Lpa"
                name="minSalary"
                onChange={handleChange}
                value={jobFormData.minSalary}
              />
              {errors.minSalary && (
                <p className="text-danger">{errors.minSalary}</p>
              )}
            </div>
            <div className="col-md-4 mb-2">
              <label className="form-label">Maximum Salary*</label>
              <Input
                ref={refs.maxSalary}
                className="form-control"
                type="number"
                min="0"
                max="1000"
                step="0.1"
                placeholder="3.5 or 110 Lpa"
                name="maxSalary"
                onChange={handleChange}
                value={jobFormData.maxSalary}
              />
              {errors.maxSalary && (
                <p className="text-danger">{errors.maxSalary}</p>
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

          {/* Job Details Section */}
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
              <label className="form-label">Application Link (Optional)</label>
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
            Update Job
          </button>
        </form>
      </div>
    </>
  );
};

export default EditJob;

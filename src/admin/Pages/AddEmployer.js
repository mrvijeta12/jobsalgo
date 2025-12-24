import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "../Components/Input";
import styles from "../assets/admin.module.css";

import { validate } from "../Utils/Validate";
import AdminContext from "../Context/AdminContext";
import Notification from "../Components/Notification";
import { addEmployer } from "../Utils/employersLogic";

import { useNavigate } from "react-router-dom";

const AddEmployer = () => {
  const { errors, setErrors, token, setNotif, notif, setRefreshEmployers } =
    useContext(AdminContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);
  const refs = {
    company_logo: useRef(),
    name: useRef(),
    email: useRef(),
    company_name: useRef(),
    company_size: useRef(),
    industry: useRef(),
    company_location: useRef(),
  };

  const [empFormData, setEmpFormData] = useState({
    company_logo: "",
    name: "",
    email: "",
    company_name: "",
    company_size: "",
    industry: "",
    company_location: "",
    company_website: "",
    contact_number: "",
    description: "",
    status: "active",
  });

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
    setEmpFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevError) => ({ ...prevError, [name]: "" }));
  }

  // validate input
  const validationConfig = {
    name: [
      { required: true, message: "Please enter your name" },
      { minLength: 3, message: "Name should be at least 3 characters" },
    ],
    email: [
      { required: true, message: "Please enter your email" },
      {
        pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Please enter a valid email address",
      },
    ],
    company_name: [
      { required: true, message: "Please enter your company name" },
    ],
    company_size: [{ required: true, message: "Please select company size" }],
    company_logo: [{ required: true, message: "Please paste logo url" }],

    industry: [{ required: true, message: "Please enter industry type" }],
    company_location: [
      { required: true, message: "Please enter your company location" },
    ],
  };

  useEffect(() => {
    if (!empFormData.company_logo) {
      setIsValidImage(false);
      return;
    }

    const img = new Image();
    img.src = empFormData.company_logo;

    img.onload = () => setIsValidImage(true); // URL is correct
    img.onerror = () => setIsValidImage(false); // URL is broken
  }, [empFormData.company_logo]);

  // form submit
  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(
      empFormData,
      {
        name: validationConfig.name,
        email: validationConfig.email,
        company_name: validationConfig.company_name,
        company_size: validationConfig.company_size,
        industry: validationConfig.industry,
        company_location: validationConfig.company_location,
        company_logo: validationConfig.company_logo,
      },
      setErrors
    );

    setErrors(errors);
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

      const res = await addEmployer(empFormData, token);
      // console.log(res);

      if (!res.success) {
        setNotif({ id: Date.now(), message: res.message, type: "error" });
        return;
      }

      setNotif({ id: Date.now(), message: res.message, type: "success" });
      setRefreshEmployers((prev) => !prev);
      setEmpFormData({
        name: "",
        email: "",
        company_name: "",
        company_size: "",
        industry: "",
        company_location: "",
        company_website: "",
        contact_number: "",
        description: "",
        status: "active",
        company_logo: "",
      });

      setTimeout(() => {
        navigate("/admin/employers");
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
      <div className="container rounded shadow px-3 pt-3 pb-5 bg-white ">
        <div className="row mb-4 d-flex justify-content-between">
          <div className="col-md-6 d-flex">
            <h3 className="mb-0 fw-bold">Add Employer</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* company logo  */}
            <div className="col-12 d-flex flex-column justify-content-center align-items-center mb-2">
              <div className={`${styles.company_logo} mb-3`}>
                {isValidImage ? (
                  <img
                    src={
                      empFormData.company_logo ? empFormData.company_logo : null
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
                // required={true}
                value={empFormData.company_logo}
              />
              {errors.company_logo && (
                <p className="text-danger">{errors.company_logo}</p>
              )}
            </div>
            {/* Name */}
            <div className="col-md-6 mb-md-4 mb-2 ">
              <label className="form-label fw-semibold">Contact Person*</label>
              <Input
                ref={refs.name}
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                // required={true}
                value={empFormData.name}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="col-md-6 mb-md-4 mb-2">
              <label className="form-label fw-semibold">Email*</label>
              <Input
                ref={refs.email}
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                // required={true}
                value={empFormData.email}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            {/* Company Name */}
            <div className="col-md-6 mb-md-4 mb-2">
              <label className="form-label fw-semibold">Company Name*</label>
              <Input
                ref={refs.company_name}
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={empFormData.company_name}
                onChange={handleChange}
                // required={true}
              />
              {errors.company_name && (
                <p className="text-danger">{errors.company_name}</p>
              )}
            </div>
            {/* Company Size */}
            <div className="col-md-6 mb-md-4 mb-2">
              <label className="form-label fw-semibold d-block">
                Company Size*
              </label>
              <select
                ref={refs.company_size}
                className="form-select  w-100"
                name="company_size"
                onChange={handleChange}
                value={empFormData.company_size}
                // required
                style={{
                  padding: "6px",
                  width: "200px",
                  border: "1px solid #ccc",
                  outline: "none",
                  borderRadius: "4px",
                }}
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
              {errors.company_size && (
                <p className="text-danger">{errors.company_size}</p>
              )}
            </div>

            {/* Industry */}
            <div className="col-md-6 mb-md-4 mb-2">
              <label className="form-label fw-semibold">Industry*</label>
              <Input
                ref={refs.industry}
                type="text"
                name="industry"
                placeholder="e.g. IT, Finance, Healthcare"
                value={empFormData.industry}
                onChange={handleChange}
                // required={true}
              />
              {errors.industry && (
                <p className="text-danger">{errors.industry}</p>
              )}
            </div>

            {/* Company Location */}
            <div className="col-md-6 mb-md-4 mb-2">
              <label className="form-label fw-semibold">
                Company Location*
              </label>
              <Input
                ref={refs.company_location}
                type="text"
                name="company_location"
                placeholder="City, Country"
                value={empFormData.company_location}
                onChange={handleChange}
                // required={true}
              />
              {errors.company_location && (
                <p className="text-danger">{errors.company_location}</p>
              )}
            </div>

            {/* Contact Number */}
            <div className="col-md-6 mb-md-4 mb-2">
              <label className="form-label fw-semibold">Contact Number</label>
              <Input
                type="text"
                name="contact_number"
                placeholder="+1 234 567 890"
                value={empFormData.contact_number}
                onChange={handleChange}
              />
            </div>

            {/* Company Website */}
            <div className="col-md-6 mb-md-4 mb-2">
              <label className="form-label fw-semibold">Company Website</label>
              <Input
                type="text"
                name="company_website"
                placeholder="https://example.com"
                value={empFormData.company_website}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="col-12 mb-md-4 mb-2">
              <label className="form-label fw-semibold">
                Company Description
              </label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                placeholder="Brief company overview..."
                value={empFormData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Status */}
            <div className="col-md-6 ">
              <label className="form-label fw-semibold d-block">Status</label>
              <div className="form-check form-check-inline">
                <Input
                  type="radio"
                  name="status"
                  id="statusActive"
                  value="active"
                  onChange={handleChange}
                  required={true}
                  checked={empFormData.status === "active"}
                />
                <label className="form-check-label" htmlFor="statusActive">
                  Active
                </label>
              </div>
              <div className="form-check form-check-inline mb-4">
                <Input
                  type="radio"
                  name="status"
                  id="statusInactive"
                  value="inactive"
                  onChange={handleChange}
                  required={true}
                  checked={empFormData.status === "inactive"}
                />
                <label className="form-check-label" htmlFor="statusInactive">
                  Inactive
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="col-12 text-end">
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
                Save Employer
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployer;

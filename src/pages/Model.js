// Model.js
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validate } from "../admin/Utils/Validate";
import FrontendContext from "../context/FrontendContext.js";
import ReCAPTCHA from "react-google-recaptcha";

export default function Model() {
  const { errors, setErrors, setNotif, notif, isModelOpen, setIsModelOpen } =
    useContext(FrontendContext);
  const [submitError, setSubmitError] = useState("");

  const [modelFormStep, setModelFormStep] = useState(1);

  const [showModelPassword, setShowModelPassword] = useState(false);
  const [showModelConfirmPassword, setShowModelConfirmPassword] =
    useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  // console.log(errors);

  const [modelFormData, setModelFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
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

  useEffect(() => {
    if (submitError) {
      console.log(submitError);
    }
  }, [submitError]);
  useEffect(() => {
    if (modelFormStep === 4) {
      setSubmitError("");
    }
  }, [modelFormStep]);

  function handleChange(e) {
    const { name, value } = e.target;
    setModelFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
  function handleModalClose() {
    setCaptchaValue(null);

    setSubmitError("");
    setIsModelOpen(false);
    setModelFormStep(1);
    setModelFormData({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  }

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
    password: [
      { required: true, message: "Please enter your password" },
      { minLength: 6, message: "Password must be at least 6 characters" },
    ],
    confirmPassword: [
      { required: true, message: "Please confirm your password" },
      { minLength: 6, message: "Password must be at least 6 characters" },
      {
        custom: (value, modelFormData) => value === modelFormData.password,
        message: "Passwords do not match",
      },
    ],
  };

  const totalSteps = 4;

  // const handleNext = () => setModelFormStep((prev) => prev + 1);
  const handleNext = () => {
    let stepFields = {};

    if (modelFormStep === 1) {
      stepFields = { email: validationConfig.email };
    }
    if (modelFormStep === 2) stepFields = { name: validationConfig.name };
    if (modelFormStep === 3)
      stepFields = {
        password: validationConfig.password,
        confirmPassword: validationConfig.confirmPassword,
      };

    const stepErrors = validate(modelFormData, stepFields, setErrors);

    if (Object.keys(stepErrors).length > 0) return;
    setSubmitError("");
    setModelFormStep((prev) => prev + 1);
  };

  const handleBack = () => setModelFormStep((prev) => prev - 1);

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(
      modelFormData,
      {
        email: validationConfig.email,
        name: validationConfig.name,
        password: validationConfig.password,
        confirmPassword: validationConfig.confirmPassword,
      },
      setErrors
    );
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      if (modelFormStep !== 4) return;
      if (!captchaValue) {
        setSubmitError("Please verify captcha");
        return;
      }
      setModelFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setCaptchaValue(null);
      setSubmitError("");
      setIsModelOpen(false);
      setErrors({});
      setModelFormStep(1);
      console.log(modelFormData);
    } catch (err) {
      console.log(err);
    }
  }

  const progress = (modelFormStep / totalSteps) * 100;
  if (!isModelOpen) return null;

  return (
    <div
      className={`modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center   ${
        Object.keys(errors).length > 0 ? "error" : ""
      }`}
    >
      <div className=" modal-box bg-white rounded-2xl shadow-lg relative d-flex flex-row flex-md-row flex-column-reverse row m-2 ">
        <div className=" mb-4 model-image col-md-6">
          <img src="/images/model-image.png" alt="" className="img-fluid" />
        </div>

        <div className="mb-6 col-md-6">
          <div className="position-relative d-flex justify-content-end mb-5">
            <button
              onClick={handleModalClose}
              className="modal-close text-gray-600 hover:text-black"
            >
              ✖
            </button>
          </div>

          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {modelFormStep === 1 && (
              <div>
                <label className="block mb-2 text-black">Enter Email</label>
                <input
                  type="email"
                  name="email"
                  value={modelFormData.email}
                  onChange={handleChange}
                  className="w-100 border p-2 rounded form-control"
                  placeholder="Email"
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
            )}

            {modelFormStep === 2 && (
              <div>
                <label className="block mb-2 text-black">Enter Name</label>
                <input
                  type="text"
                  name="name"
                  value={modelFormData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded form-control"
                  placeholder=" Name"
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>
            )}

            {modelFormStep === 3 && (
              <div>
                {/* Password */}
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-group rounded">
                    <input
                      type={showModelPassword ? "text" : "password"}
                      name="password"
                      value={modelFormData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                    />

                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowModelPassword(!showModelPassword)}
                      >
                        {showModelPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div>
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-group rounded">
                    <input
                      type={showModelConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={modelFormData.confirmPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm Password"
                    />

                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setShowModelConfirmPassword(!showModelConfirmPassword)
                        }
                      >
                        {showModelConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div>
                    {errors.confirmPassword && (
                      <small className="text-danger">
                        {errors.confirmPassword}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            )}

            {modelFormStep === 4 && (
              <div className="mt-3">
                {/* <label className="block mb-2 text-black">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={modelFormData.otp}
                  onChange={handleChange}
                  className="w-full border p-2 rounded form-control"
                  required
                  placeholder="Enter OTP"
                /> */}
                <ReCAPTCHA
                  sitekey="6Lc2wR8sAAAAAGG_PgbYhMpCZkEGMS3PgW6KQGFd"
                  onChange={(value) => setCaptchaValue(value)}
                />
                {submitError && (
                  <small className="text-danger">{submitError}</small>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-4 ">
              {modelFormStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-1 ml-1  rounded model-btn"
                >
                  Back
                </button>
              )}

              {modelFormStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-1 ml-1  text-white rounded model-btn"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!captchaValue}
                  className={`px-4 py-1 ml-1 text-white rounded model-btn ${
                    !captchaValue ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

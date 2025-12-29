import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FrontendContext from "../context/FrontendContext";
import Notification from "../admin/Components/Notification.js";
import { validate } from "../admin/Utils/Validate.js";
import {
  frontendUserregister,
  loginFrontendUser,
} from "../Utils/frontendAuth.js";

const Login = React.memo(() => {
  //form state
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  // page title
  useEffect(() => {
    document.title = `${isLogin ? "JobsAlgo | LogIn" : "JobsAlgo | SignUp"}`;
  }, [isLogin]);

  // import from context
  const { errors, setErrors, signup, login, notif, setNotif } =
    useContext(FrontendContext);

  useEffect(() => {
    if (notif?.message) {
      setNotif({ id: null, message: "", type: "" });
    }
  }, []);

  useEffect(() => {
    setErrors({});
  }, []);

  // form inputs
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const [signupUser, setSignupUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // password state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // handle form onchange
  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLoginUser((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
  function handleSignupChange(e) {
    const { name, value } = e.target;
    setSignupUser((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // validation for login
  const loginValidationConfig = {
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
  };

  // validation for Signup
  const signupValidationConfig = {
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
      { required: true, message: "Please enter your password" },
      { minLength: 6, message: "Password must be at least 6 characters" },
      {
        custom: (value, signupUser) => value === signupUser.password,
        message: "Password does not match",
      },
    ],
  };

  // handle for submitt
  async function handleSignupSubmit(e) {
    e.preventDefault();
    const errors = validate(
      signupUser,
      {
        name: signupValidationConfig.name,
        email: signupValidationConfig.email,
        password: signupValidationConfig.password,
        confirmPassword: signupValidationConfig.confirmPassword,
      },
      setErrors
    );
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      setLoading(true);
      const res = await frontendUserregister(signupUser);
      console.log(res);

      if (!res.success || !res.token) {
        setErrors((prev) => ({
          ...prev,
          general: res.message || "Signup Failed",
        }));

        return;
      }

      setErrors({});
      signup(res.user, res.token);

      setNotif({ id: Date.now(), message: res.message, type: "success" });
      setSignupUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 4000);
    } catch (error) {
      console.log("Signup error:", error);
      const errorMsg =
        error.message || "Something went wrong. Please try again.";
      setErrors((prev) => ({ ...prev, general: errorMsg }));
    } finally {
      setLoading(false);
    }
  }

  // login
  async function handleLoginSubmit(e) {
    e.preventDefault();
    const errors = validate(
      loginUser,
      {
        email: loginValidationConfig.email,
        password: loginValidationConfig.password,
      },
      setErrors
    );
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const res = await loginFrontendUser(loginUser);

      if (!res.success || !res.token) {
        setErrors((prev) => ({
          ...prev,
          general: res.message || "Signup Failed",
        }));

        return;
      }

      setErrors({});
      login(res.user, res.token);
      setNotif({ id: Date.now(), message: res.message, type: "success" });
      setLoginUser({
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 4000);
    } catch (error) {
      console.log("Signup error:", error);
      const errorMsg =
        error.message || "Something went wrong. Please try again.";
      setErrors((prev) => ({ ...prev, general: errorMsg }));
    } finally {
      setLoading(false);
    }
  }

  // style for eye icon
  const iconStyle = {
    position: "absolute",
    right: "30px",
    top: "70%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

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
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Sign Up/Login</h1>
              <div className="custom-breadcrumbs">
                <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Log In</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`site-section ${
          Object.keys(errors).length > 0 ? "error" : ""
        }`}
      >
        <div className="container">
          <div className="row mb-5 justify-content-center ">
            {isLogin ? (
              // log in
              <div
                className="col-lg-6 p-4"
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <h2
                  className="mb-4 text-center"
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Log In
                </h2>
                <form onSubmit={handleLoginSubmit} className="p-4">
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        onChange={handleLoginChange}
                        value={loginUser.email}
                      />
                    </div>
                    {errors.email && (
                      <p
                        className="text-danger"
                        style={{ paddingRight: "15px", paddingLeft: "15px" }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="row form-group mb-4">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="password">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={handleLoginChange}
                        value={loginUser.password}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={iconStyle}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.password && (
                      <p
                        className="text-danger"
                        style={{ paddingRight: "15px", paddingLeft: "15px" }}
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="row form-group">
                    <div className="col-md-12">
                      <input
                        type="submit"
                        value="Log In"
                        className="btn px-4 btn-primary text-white"
                        style={{ fontWeight: "600" }}
                      />
                    </div>
                  </div>
                </form>
                {errors.general && (
                  <p className="text-danger">{errors.general}</p>
                )}
                <p className="mt-3">
                  Do not have an account?{" "}
                  <button
                    style={{
                      border: "none", // Remove border
                      background: "none", // Remove background
                      padding: "0", // Optional: Remove padding if needed
                      outline: "none", // Remove outline
                      cursor: "pointer", // Optional: Add pointer cursor on hover
                      marginLeft: "5px",
                      fontWeight: "600",
                    }}
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            ) : (
              // sign up
              <div
                className="col-lg-6 p-4"
                style={{
                  // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <h2
                  className="mb-4 text-center"
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </h2>
                <form onSubmit={handleSignupSubmit} className="p-4 ">
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        onChange={handleSignupChange}
                        value={signupUser.name}
                      />
                    </div>
                    {errors.name && (
                      <p
                        className="text-danger"
                        style={{ paddingRight: "15px", paddingLeft: "15px" }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        onChange={handleSignupChange}
                        value={signupUser.email}
                      />
                    </div>
                    {errors.email && (
                      <p
                        className="text-danger"
                        style={{ paddingRight: "15px", paddingLeft: "15px" }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="password">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={handleSignupChange}
                        value={signupUser.password}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={iconStyle}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.password && (
                      <p
                        className="text-danger"
                        style={{ paddingRight: "15px", paddingLeft: "15px" }}
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="row form-group mb-4">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="confirmPassword">
                        Re-Type Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Re-type Password"
                        onChange={handleSignupChange}
                        value={signupUser.confirmPassword}
                      />
                      <span
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={iconStyle}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <p
                        className="text-danger"
                        style={{ paddingRight: "15px", paddingLeft: "15px" }}
                      >
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="row form-group">
                    <div className="col-md-12">
                      <input
                        type="submit"
                        value="Sign Up"
                        className="btn px-4 btn-primary text-white"
                        style={{ fontWeight: "600" }}
                      />
                    </div>
                  </div>
                </form>
                {errors.general && (
                  <p className="text-danger">{errors.general}</p>
                )}
                <p className="mt-3">
                  Already have an account?{" "}
                  <button
                    style={{
                      border: "none", // Remove border
                      background: "none", // Remove background
                      padding: "0", // Optional: Remove padding if needed
                      outline: "none", // Remove outline
                      cursor: "pointer", // Optional: Add pointer cursor on hover
                      marginLeft: "5px",
                      fontWeight: "600",
                    }}
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    Log In
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

export default Login;

import React, { useContext, useState } from "react";
import AdminContext from "../Context/AdminContext";
import Input from "../Components/Input";
import { useNavigate } from "react-router-dom";
import { validate } from "../Utils/Validate";
import { loginUser } from "../Utils/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "../assets/admin.module.css";

const AuthUser = React.memo(() => {
  const { errors, setErrors, formData, setFormData, login, setLoggedInUser } =
    useContext(AdminContext);
  // console.log(isSignUpMode);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
  };

  function onchange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevError) => ({ ...prevError, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(
      formData,
      {
        email: validationConfig.email,
        password: validationConfig.password,
      },
      setErrors
    );

    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      setLoading(true);
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      // console.log(res);

      // Handle failed response
      if (!res.success || !res.token) {
        setErrors((prev) => ({
          ...prev,
          general: res.message || "Login failed.",
        }));
        return;
      }

      // Success case
      setErrors({});
      login(res.token);
      setLoggedInUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/admin/dashboard");
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.message || "Something went wrong. Please try again.";
      setErrors((prev) => ({ ...prev, general: errorMsg }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${styles.auth_container} ${
        Object.keys(errors).length > 0 ? "error" : ""
      }`}
    >
      <div className="forms-container">
        <form className={`${styles.sign_in_form}`} onSubmit={handleSubmit}>
          <h2 className={`${styles.title}`}>Welcome !</h2>
          <div className={`${styles.input_wrapper} mb-2`}>
            <div className={`${styles.input_field}`}>
              <i className="fas fa-user"></i>

              <Input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={onchange}
                value={formData.email}
                error={errors.email}
              />
            </div>
          </div>
          {errors.email && <p className="text-danger">{errors.email}</p>}

          <div className={`${styles.input_wrapper} mb-2`}>
            <div
              className={`${styles.input_field}`}
              style={{ position: "relative" }}
            >
              <i className="fas fa-lock"></i>

              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={onchange}
                placeholder="Password"
                errors={errors.password}
              />

              {/* Eye Icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {errors.password && <p className="text-danger">{errors.password}</p>}

          <div>
            {errors.general && <p className="text-danger">{errors.general}</p>}
          </div>

          <input
            type="submit"
            value="Sign In"
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
            className={`${styles.admin_login_btn} btn solid `}
          />
        </form>
      </div>
    </div>
  );
});

export default AuthUser;

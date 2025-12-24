import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FrontendContext from "../context/FrontendContext";
import { validate } from "../admin/Utils/Validate";
import { sendMail } from "../Utils/frontendAuth";
import Notification from "../admin/Components/Notification";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { notif, setNotif, errors, setErrors } = useContext(FrontendContext);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef();

  useEffect(() => {
    if (notif?.message) {
      setNotif({ id: null, message: "", type: "" });
    }
  }, []);

  // clear error msg
  useEffect(() => {
    setErrors({});
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const validationConfig = {
    fname: [
      { required: true, message: "Please enter your first name" },
      { minLength: 3, message: "Name should be at least 3 characters" },
    ],
    lname: [
      { required: true, message: "Please enter your last name" },
      { minLength: 3, message: "Name should be at least 3 characters" },
    ],
    email: [
      { required: true, message: "Please enter your email" },
      {
        pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Please enter a valid email address",
      },
    ],
    subject: [{ required: true, message: "Please enter your last name" }],
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // 1️⃣ Validation
    const errors = validate(
      formData,
      {
        email: validationConfig.email,
        fname: validationConfig.fname,
        lname: validationConfig.lname,
        subject: validationConfig.subject,
      },
      setErrors
    );
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // 2️⃣ Captcha check
    if (!captchaVerified) {
      setErrors((prev) => ({
        ...prev,
        general: "Please verify captcha",
      }));
      return;
    }

    // 3️⃣ Check 24-hour submission rule
    const storedUsers = JSON.parse(
      localStorage.getItem("userAlreadySubmitted") || "[]"
    );
    const now = Date.now();
    const HOURS_24 = 24 * 60 * 60 * 1000;

    const existingUser = storedUsers.find((u) => u.email === formData.email);

    if (existingUser) {
      const diff = now - existingUser.submittedAt;
      if (diff < HOURS_24) {
        // setErrors((prev) => ({
        //   ...prev,
        //   general: `You already submitted your query. Please wait 24 hours.`,
        // }));
        setNotif({
          id: Date.now(),
          message:
            "You already submitted your query. Our team will reach you within 24 hrs.",
          type: "error",
        });
        return;
      }
      // 24h passed → update timestamp after success
    }

    try {
      // 4️⃣ Send mail
      const res = await sendMail(formData);

      if (!res.success) {
        setNotif({ id: Date.now(), message: res.message, type: "error" });
        return;
      }

      // 5️⃣ Update localStorage **only on success**
      if (existingUser) {
        existingUser.submittedAt = now;
      } else {
        storedUsers.push({
          email: formData.email,
          submittedAt: now,
        });
      }
      localStorage.setItem("userAlreadySubmitted", JSON.stringify(storedUsers));

      // 6️⃣ Reset form & show success
      setNotif({ id: Date.now(), message: res.message, type: "success" });
      setFormData({
        fname: "",
        lname: "",
        email: "",
        subject: "",
        message: "",
      });
      setCaptchaVerified(false);
      if (captchaRef.current) {
        captchaRef.current.reset(); // <-- this unchecks the ReCAPTCHA
      }
    } catch (error) {
      setNotif({
        id: Date.now(),
        message: error.message || "Something went wrong.",
        type: "error",
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>JobsAlgo | Contact Us</title>
      </Helmet>
      {notif.message && (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
        />
      )}
      <div
        className={`site-wrap ${Object.keys(errors).length > 0 ? "error" : ""}`}
      >
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
              <h1 className="text-white font-weight-bold">Contact Us</h1>
              <div className="custom-breadcrumbs">
                <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Contact Us</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section" id="next-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <form
                onSubmit={handleSubmit}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="row form-group">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="fname">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      className="form-control"
                      name="fname"
                      onChange={handleChange}
                      value={formData.fname}
                    />
                    {errors.fname && (
                      <small className="text-danger">{errors.fname}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="text-black" htmlFor="lname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      className="form-control"
                      name="lname"
                      onChange={handleChange}
                      value={formData.lname}
                    />
                    {errors.lname && (
                      <small className="text-danger">{errors.lname}</small>
                    )}
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      type="subject"
                      id="subject"
                      className="form-control"
                      name="subject"
                      onChange={handleChange}
                      value={formData.subject}
                    />
                    {errors.subject && (
                      <small className="text-danger">{errors.subject}</small>
                    )}
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="7"
                      className="form-control"
                      placeholder="Write your notes or questions here..."
                      onChange={handleChange}
                      value={formData.message}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey="6Lc2wR8sAAAAAGG_PgbYhMpCZkEGMS3PgW6KQGFd"
                    onChange={() => {
                      setCaptchaVerified(true);
                      setErrors((prev) => ({ ...prev, general: "" }));
                    }}
                    onExpired={() => setCaptchaVerified(false)}
                  />

                  {errors.general && (
                    <small className="text-danger ">{errors.general}</small>
                  )}
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      value="Submit "
                      className="btn btn-primary btn-md text-white mt-3"
                      style={{ fontWeight: "600" }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div
              className="col-lg-5 ml-auto"
              data-aos="zoom-in"
              data-aos-delay="200"
              style={{
                backgroundColor: "#212529",
              }}
            >
              <div className="p-4 mb-3 ">
                <p className="mb-0 font-weight-bold" style={{ color: "#fff" }}>
                  Address
                </p>
                <p className="mb-4">
                  E-38 Paryavaran Complex, Block E, Saket, Delhi
                </p>

                <p className="mb-0 font-weight-bold" style={{ color: "#fff" }}>
                  Phone
                </p>
                <p className="mb-4" style={{ color: "#7f848c" }}>
                  +91-9118618111
                </p>

                <p className="mb-0 font-weight-bold" style={{ color: "#fff" }}>
                  Email Address
                </p>
                <p className="mb-0" style={{ color: "#7f848c" }}>
                  hr@jobsalgo.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-light">
        <div className="container">
          <div className="row mb-5" data-aos="zoom-in" data-aos-delay="200">
            <div className="col-12 text-center" data-aos="fade">
              <h2 className="section-title mb-3">Happy Candidates Says</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div className="block__87154 bg-white rounded">
                <blockquote>
                  <p>
                    &ldquo;Reaching out through the JobsAlgo contact page was
                    quick and effortless. Their team responded within hours and
                    guided me through every step of the hiring process. The
                    support felt personal and genuinely helpful.&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="/images/testimonial/anita-sharma.jpg"
                      alt="Anita Sharma"
                      className="img-fluid"
                    />
                  </figure>
                  <div className="testimonial-user">
                    <h3>Anita Sharma </h3>
                    <span className="position">HR Manager</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ marginBottom: "7rem" }}
            >
              <div className="block__87154 bg-white rounded">
                <blockquote>
                  <p>
                    &ldquo;I used the contact form to clarify some queries about
                    job postings, and I was impressed by how fast and
                    professional the response was. JobsAlgo really values
                    communication with clients and job seekers alike.&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="/images/testimonial/david-lee.jpg"
                      alt="David Lee"
                      className="img-fluid"
                    />
                  </figure>
                  <div className="testimonial-user">
                    <h3>David Lee</h3>
                    <span className="position">Recruitment Lead</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

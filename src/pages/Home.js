import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Model from "./Model";
import { CiCircleCheck } from "react-icons/ci";
import FrontendContext from "../context/FrontendContext.js";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { setIsModelOpen, isModelOpen } = useContext(FrontendContext);
  const navigate = useNavigate();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   navigate("/");
  //   setEmail("");
  // }

  useEffect(() => {
    if (window.$) {
      window.$(".selectpicker").selectpicker(); // Initialize Bootstrap select if using jQuery
      window.$(".owl-carousel").owlCarousel(); // Owl Carousel
    }
  }, []);
  useEffect(() => {
    if (window.innerWidth < 772) {
      const cards = document.querySelectorAll(".card-img-wrapper");

      const handleClick = (e) => {
        const clickedCard = e.currentTarget;

        const isActive = clickedCard.classList.contains("active");

        // Remove 'active' from all cards
        cards.forEach((c) => c.classList.remove("active"));

        // Add it back only if not active before
        if (!isActive) {
          clickedCard.classList.add("active");
        }
      };

      // Attach event listener
      cards.forEach((card) => card.addEventListener("click", handleClick));

      // Clean up
      return () => {
        cards.forEach((card) => card.removeEventListener("click", handleClick));
      };
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>JobsAlgo | Home</title>
      </Helmet>
      {/* <div id="overlayer"></div> */}

      {/* Hero Section */}
      <section
        className="home-section section-hero overlay bg-image"
        id="home-section"
        style={{ backgroundImage: "url('images/jobsalgo-hero.jpg')" }}
      >
        <div className="container" data-aos="zoom-in" data-aos-delay="200">
          <div className="row d-flex align-items-center justify-lg-content-start  ">
            <div className="col-xl-8">
              <div
                className="mb-3
              "
              >
                <h1 className=" font-weight-bold text-white">
                  Find Work That{" "}
                  <span style={{ color: "#89ba16" }}>Actually Fits</span>
                </h1>

                <p className="" style={{ fontSize: "18px" }}>
                  AI-powered jobs for real careers — not noise. <br /> 100+
                  fresh opportunities added daily across <br />
                  <strong className="text-white mr-2"> Banking ,</strong>
                  <strong className="text-white mr-2"> Distillery ,</strong>
                  <strong className="text-white mr-2"> Automobile</strong>
                </p>
                <h5 style={{ color: "#89ba16", fontWeight: "700" }}>
                  <i>JobsAlgo is a unit of Tekalgo</i>
                </h5>
                {/* <h2
                  style={{ color: "#fff", fontWeight: "700" }}
                  className="mt-4"
                >
                  <span style={{ color: "" }}>JobsAlgo </span> is a unit of{" "}
                  <span style={{ color: "#89ba16" }}>Tekalgo </span>
                </h2> */}
              </div>
              <form method="" className="search-jobs-form" id="job-search-form">
                <div className="row mb-3 d-flex ">
                  {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <select
                      className="selectpicker"
                      data-style="btn-white btn-lg"
                      data-width="100%"
                      title="Industry"
                      name="industry"
                    >
                      <option value="Distellery">Distellery</option>

                      <option value="Finance & Banking">
                        Finance & Banking
                      </option>
                      <option value="Automobile">Automobile</option>
                    </select>
                  </div> */}
                  <div className="col-12 col-md-10 mb-sm-3 mb-2 d-flex flex-sm-row">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search roles: Regional Manager, Cane Manager, Service Head"
                      name="keyword"
                      style={{ borderRadius: "0" }}
                    />
                    <div
                      className="d-flex align-items-center search-btn-wrapper justify-content-center"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="icon-search icon mr-2 text-white btn-search ">
                        {" "}
                      </span>
                      <span
                        className="text-white"
                        style={{ fontWeight: "600" }}
                      >
                        Search Job
                      </span>
                    </div>
                  </div>
                  {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <select
                      className="selectpicker"
                      data-style="btn-white btn-lg"
                      data-width="100%"
                      title="Location"
                      data-live-search="true"
                    >
                      <option>Gurugram</option>

                      <option>Hyderabad</option>
                    </select>
                  </div>{" "} */}
                  {/* <div className="col-12 col-sm-6 col-md-3  mb-4 mb-lg-0">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block text-white btn-search"
                      onClick={() => navigate("/jobs-listing")}
                    >
                      <span className="icon-search icon mr-2"></span>Search Job
                    </button>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div id="form-error" className="text-white d-none"></div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-md-12 popular-keywords d-flex flex-md-row flex-column ">
                  <h6 style={{ fontWeight: "600" }} className="text-white mr-2">
                    Trending Right Now:
                  </h6>
                  <ul className="keywords list-unstyled m-0 p-0">
                    <li>
                      <a href="/" className="mr-1 mb-1">
                        Regional Manager
                      </a>
                    </li>
                    <li>
                      <a href="/" className="mr-1 mb-1">
                        Cane Manager
                      </a>
                    </li>
                    <li>
                      <a href="/" className="mr-1 mb-1">
                        {" "}
                        Service Head
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/jobs")}
              >
                Start Exploring Jobs
              </button>
            </div>
          </div>
        </div>

        {/* <a href="#next" className="scroll-button smoothscroll">
            <span className="icon-keyboard_arrow_down"></span>
          </a> */}
      </section>

      {/* why choose */}
      <section className="site-section pb-4">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 mb-5 mb-lg-0"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src="images/why_choose_jobsalgo.jpg"
                alt="Why Choose SimplifyJob"
                className="img-fluid img-shadow h-100"
              />
            </div>
            <div
              className="col-lg-5 ml-auto"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="d-flex align-items-start justify-content-start mb-3">
                <div
                  style={{
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    visibility: "hidden",
                  }}
                >
                  <CiCircleCheck
                    style={{ fontSize: "24px", color: "#28a745" }}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h2
                    className="section-title mb-2"
                    style={{ color: "#89ba16" }}
                  >
                    Why JobsAlgo?
                  </h2>
                  {/* <h5 className=" mb-1" style={{ fontWeight: "500" }}>
                    Designed for focus. Built for speed.
                  </h5> */}
                  <p className="mb-1">
                    <i> Designed for focus. Built for speed</i>
                  </p>
                </div>
              </div>

              <div>
                {/* First Item */}
                <div className="d-flex align-items-start justify-content-start mb-3">
                  <div
                    style={{
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CiCircleCheck
                      style={{ fontSize: "24px", color: "#89ba16" }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <h5 className="feature-title">Industry-First Hiring</h5>
                    <p className=" m-0">
                      Industry-Focused Opportunities in Banking, Distillery &
                      Automobile.
                    </p>
                  </div>
                </div>

                {/* Second Item */}
                <div className="d-flex align-items-start mb-3">
                  <div
                    style={{
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CiCircleCheck
                      style={{ fontSize: "24px", color: "#89ba16" }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <h5 className="feature-title">Smart AI Matching</h5>
                    <p className=" m-0">
                      Your profile talks. Our engine listens.
                    </p>
                  </div>
                </div>

                {/* Third Item */}
                <div className="d-flex align-items-start mb-3">
                  <div
                    style={{
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CiCircleCheck
                      style={{ fontSize: "24px", color: "#89ba16" }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <h5 className="feature-title">
                      Zero Spam. Only Real Employers
                    </h5>
                    <p className=" m-0">
                      Every job is reviewed before it goes live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* category  */}
      <section
        className="site-section services-section bg-light block__62849"
        id="next-section"
      >
        <div className="container">
          <div
            className="row mb-5 justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Browse by Category</h2>
              <p>Careers, neatly organized</p>
            </div>
          </div>
          <div className="row">
            <div
              className="col-12 col-md-4 mb-4 mb-md-0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <a
                href="service-single.html"
                className="block__16443 text-center d-block h-100"
              >
                <span className="custom-icon mx-auto">
                  <span className="icon-briefcase d-block"></span>
                </span>
                <h3>Banking & Finance</h3>
                <p>13 Open Roles</p>
              </a>
            </div>
            <div
              className="col-12 col-md-4 mb-4 mb-md-0 "
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <a
                href="service-single.html"
                className="block__16443 text-center d-block h-100"
              >
                <span className="custom-icon mx-auto">
                  <span className="icon-glass d-block"></span>
                </span>
                <h3>Distillery & Manufacturing</h3>
                <p>5 Open Roles</p>
              </a>
            </div>
            <div
              className="col-12 col-md-4 mb-4 mb-md-0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <a
                href="service-single.html"
                className="block__16443 text-center d-block h-100"
              >
                <span className="custom-icon mx-auto">
                  <span className="icon-car d-block"></span>
                </span>
                <h3>Automobile & Mobility</h3>
                <p>8 Open Roles</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* jobs locations */}
      <section className="location-section">
        <div className="container my-5">
          <div
            className="row mb-5 justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Work Without Borders</h2>
              <p>Jobs by Location</p>
            </div>
          </div>
          <div className="row g-4">
            <div
              className="col-12 col-sm-6 col-lg-3 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card h-100">
                <div className="card-img-wrapper">
                  <img
                    src="images/Lucknow.jpg"
                    className="img-fluid"
                    alt="Lucknow"
                  />
                  <div className="overlay">
                    <p className="mb-1">
                      <i className="fas fa-briefcase mx-2"></i>12 Roles
                    </p>
                    <p>
                      <i className="fas fa-building mx-2"></i>6 Companies
                    </p>
                  </div>
                </div>
              </div>
              <div className="country text-center">
                <strong>Lucknow</strong>
              </div>
            </div>

            <div
              className="col-12 col-sm-6 col-lg-3 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card h-100">
                <div className="card-img-wrapper">
                  <img
                    src="images/chennai.avif"
                    className="img-fluid"
                    alt="chennai"
                  />
                  <div className="overlay">
                    <p className="mb-1">
                      <i className="fas fa-briefcase mx-2"></i>9 Roles
                    </p>
                    <p>
                      <i className="fas fa-building mx-2"></i>4 Companies
                    </p>
                  </div>
                </div>
              </div>
              <div className="country text-center">
                <strong>Chennai</strong>
              </div>
            </div>

            <div
              className="col-12 col-sm-6 col-lg-3 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card h-100">
                <div className="card-img-wrapper">
                  <img
                    src="images/indore.jpg"
                    className="img-fluid"
                    alt="indore"
                  />
                  <div className="overlay">
                    <p className="mb-1">
                      <i className="fas fa-briefcase mx-2"></i>8 Roles
                    </p>
                    <p>
                      <i className="fas fa-building mx-2"></i>5 Companies
                    </p>
                  </div>
                </div>
              </div>
              <div className="country text-center">
                <strong>Indore</strong>
              </div>
            </div>

            <div
              className="col-12 col-sm-6 col-lg-3 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card h-100">
                <div className="card-img-wrapper">
                  <img
                    src="images/mumbai.jpg"
                    className="img-fluid"
                    alt="mumbai"
                  />
                  <div className="overlay">
                    <p className="mb-1">
                      <i className="fas fa-briefcase mx-2"></i>7 Roles
                    </p>
                    <p>
                      <i className="fas fa-building mx-2"></i>3 Companies
                    </p>
                  </div>
                </div>
              </div>
              <div className="country text-center">
                <strong>Maharastra</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* hiring */}

      <section
        className="py-5 bg-image overlay-primary fixed overlay d-flex align-items-center "
        style={{
          backgroundImage: "url('images/we_are_hiring.jpg')",
          height: "400px",
        }}
      >
        <div className="container">
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="col-md-8 mb-3">
              <h1 className=" section-title" style={{ color: "#89ba16" }}>
                We are HIRING
              </h1>
              <h5 className="" style={{ color: "#89ba16" }}></h5>
              <p className="mb-0 text-white" style={{ fontSize: "18px" }}>
                <i> Let’s build your next chapter. </i>
                <br /> Whether you’re growing, switching, or restarting <br />{" "}
                there’s a role waiting for you.
              </p>
            </div>
            <div className="col-md-3 ml-auto">
              <button
                onClick={() => {
                  console.log("clicked");
                  setIsModelOpen(true);
                }}
                className="btn btn-block btn-lg apply-now"
                style={{ fontWeight: "600" }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiters  */}
      <section className="site-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center mt-4 mb-5">
              <div className="row justify-content-center">
                <div
                  className="col-md-7"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <h2 className="section-title mb-2">
                    Companies Hiring on JobsAlgo
                  </h2>
                  <p>The teams shaping the future</p>
                </div>
              </div>
            </div>
            <div
              className="col-6 col-lg-3 col-md-6 text-center mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="images/tesla-svgrepo-com.svg"
                alt="tesla"
                className="img-fluid logo-1 recruiters-logo"
              />
            </div>
            <div
              className="col-6 col-lg-3 col-md-6 text-center mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="images/amazon-icon-logo-svgrepo-com.svg"
                alt="amazon"
                className="img-fluid logo-2 recruiters-logo"
              />
            </div>
            <div
              className="col-6 col-lg-3 col-md-6 text-center mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="images/linkedin-161-svgrepo-com.svg"
                alt="linkedin"
                className="img-fluid logo-3 recruiters-logo"
              />
            </div>
            <div
              className="col-6 col-lg-3 col-md-6 text-center mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="images/exela-technologies-logo-png_seeklogo-350880.svg"
                alt="exela"
                className="img-fluid logo-4 recruiters-logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* career tips */}

      <section
        className="site-section services-section bg-light block__62849"
        id="next-section"
        style={{ marginBottom: "7rem" }}
      >
        <div className="container">
          <div
            className="row mb-5 justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2" style={{ fontWeight: "700" }}>
                Learn. Apply. Grow.
              </h2>
              <p>Career resources that don’t waste your time</p>
            </div>
          </div>
          <div className="row d-flex align-items-stretch">
            <div
              className="col-12 col-md-4 mb-4 align-items-stretch d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <a href="/" className="block__16443 text-center d-block">
                <span className="custom-icon mx-auto">
                  <span className="icon-chat d-block"></span>
                </span>
                <h3>Interview Smarter</h3>
                <p>21 proven tips to walk into interviews with confidence.</p>
              </a>
            </div>
            <div
              className="col-12 col-md-4 mb-4 align-items-stretch d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <a href="/" className="block__16443 text-center d-block">
                <span className="custom-icon mx-auto">
                  <span className="icon-briefcase d-block"></span>
                </span>
                <h3>Finance Resume Playbook (2025)</h3>
                <p>What recruiters actually look for — explained clearly.</p>
              </a>
            </div>
            <div
              className="col-12 col-md-4 mb-4  align-items-stretch d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <a href="/" className="block__16443 text-center d-block">
                <span className="custom-icon mx-auto">
                  <span className="icon-beer d-block"></span>
                </span>
                <h3>Inside the Distillery Industry</h3>
                <p>Skills, roles, and how to break in.</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* subscribe  */}
      <section
        className="site-section bg-image overlay-hiring fixed overlay"
        style={{
          backgroundImage: "url('images/cta-3.jpg')",
          padding: "6rem 0rem",
        }}
      >
        <div className="container">
          <div
            className="row align-items-center d-flex flex-column"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="col-md-8 mx-auto text-center">
              <h2 className="text-white section-title">
                Your Career. Accelerated.
              </h2>
              <p className="mb-0 text-white" style={{ fontSize: "18px" }}>
                Thousands of roles. Verified companies. One simple platform.
              </p>
            </div>
            <div className="col-md-6 mx-auto py-2 d-flex justify-content-center mt-3">
              <button
                className="cta-btn mt-4"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/jobs");
                }}
              >
                Start Your Job Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <Model />
    </>
  );
};

export default Home;

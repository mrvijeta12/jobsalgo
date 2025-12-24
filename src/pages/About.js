import React from "react";
import { Link } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>JobsAlgo | About Us</title>
      </Helmet>
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
              <h1 className="text-white font-weight-bold">About Us</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>About Us</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section  pb-0">
        <div className="container">
          <div className="row  ">
            <div
              className="col-lg-6 mb-5 mb-lg-0"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src="/images/smart_job_connection.jpg"
                alt="about-intro"
                className="img-fluid img-shadow h-100"
              />
            </div>
            <div className="col-lg-6 ">
              <h2
                className="section-title mb-3"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                The Smart Way People and Jobs Connect
              </h2>
              <div>
                {/* First paragraph with icon */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px", // Space between icon and text
                    }}
                  >
                    <CiCircleCheck
                      style={{ fontSize: "24px", color: "#28a745" }}
                    />
                  </div>
                  <p data-aos="fade-up" data-aos-delay="200">
                    At JobsAlgo, we exist to make job searching and hiring
                    simple. Traditional portals overwhelm users with clutter,
                    leaving both job seekers and employers frustrated.
                  </p>
                </div>

                {/* Second paragraph with icon */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px", // Space between icon and text
                    }}
                  >
                    <CiCircleCheck
                      style={{ fontSize: "24px", color: "#28a745" }}
                    />
                  </div>
                  <p data-aos="fade-up" data-aos-delay="200">
                    For job seekers, the challenge is endless applications,
                    unclear job descriptions, and little feedback. JobsAlgo
                    helps candidates discover clear, relevant opportunities
                    tailored to their skills.
                  </p>
                </div>

                {/* Third paragraph with icon */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px", // Space between icon and text
                    }}
                  >
                    <CiCircleCheck
                      style={{ fontSize: "24px", color: "#28a745" }}
                    />
                  </div>
                  <p data-aos="fade-up" data-aos-delay="200">
                    For employers, hiring often means wasting time filtering
                    irrelevant resumes. JobsAlgo enables smarter, faster
                    recruitment by delivering quality candidates who truly match
                    job requirements.
                  </p>
                </div>

                {/* Fourth paragraph with icon */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px", // Space between icon and text
                    }}
                  >
                    <CiCircleCheck
                      style={{ fontSize: "24px", color: "#28a745" }}
                    />
                  </div>
                  <p data-aos="fade-up" data-aos-delay="200">
                    By bridging this gap, JobsAlgo creates meaningful
                    connections between people and opportunities. Our mission is
                    clear — simplify the hiring process for everyone.
                  </p>
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
          <div className="row mb-5">
            <div className="col-md-7" data-aos="zoom-in" data-aos-delay="200">
              <h2 className="section-title mb-2">Services for Job Seekers</h2>
            </div>
          </div>
          <div className="row align-items-stretch">
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5 "
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="icon-search d-block"></span>
                </span>
                <h3>Smart Job Search</h3>
                {/* <p>13 Jobs Available</p> */}
              </div>
            </div>
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="fas fa-file-alt fa-2x d-block"></span>
                </span>
                <h3>Resume Upload & Profile Creation</h3>
              </div>
            </div>
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="fas fa-robot fa-2x d-block"></span>
                </span>
                <h3>AI-Powered Job Matching</h3>
              </div>
            </div>
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="fas fa-tasks fa-2x d-block"></span>
                </span>
                <h3>Application Tracking</h3>
              </div>
            </div>
          </div>
          <div className="row mb-5" data-aos="zoom-in" data-aos-delay="200">
            <div className="col-md-7">
              <h2 className="section-title mb-2">Services for Employers</h2>
            </div>
          </div>
          <div className="row">
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="fas fa-briefcase fa-2x d-block"></span>
                </span>
                <h3>Job Postings</h3>
                {/* <p>13 Jobs Available</p> */}
              </div>
            </div>
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="fas fa-users fa-2x d-block"></span>
                </span>
                <h3>Candidate Management</h3>
              </div>
            </div>
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="fas fa-tools fa-2x d-block"></span>
                </span>
                <h3>Efficient Recruitment Tools</h3>
              </div>
            </div>
            <div
              className="col-12 col-md-3 mb-4 mb-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__16443 text-center d-block h-100">
                <span className="custom-icon mx-auto">
                  <span className="fas fa-brain fa-2x d-block"></span>
                </span>
                <h3>AI-Driven Matching</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-5 bg-image overlay-primary fixed overlay d-flex align-items-center"
        id="next-section"
        style={{
          backgroundImage: "url('images/jobsalgo_site_stats.jpg')",
          marginTop: "4rem",
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
                JobsAlgo Site Stats
              </h2>
              <p className="lead text-white">
                Discover the growth and success we’ve achieved together with job
                seekers and employers who trust our platform.
              </p>
            </div>
          </div>
          <div
            className="row pb-0 block__19738 section-counter"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">1200</strong>
                <strong className="number">+</strong>
              </div>
              <span className="caption">Jobs Posted</span>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">500</strong>
                <strong className="number">+</strong>
              </div>
              <span className="caption">Verified Employers</span>
            </div>

            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">2000</strong>
                <strong className="number">+</strong>
              </div>
              <span className="caption">Candidates Hired</span>
            </div>

            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">98</strong>
                <strong className="number">%</strong>
              </div>
              <span className="caption">User Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* testimonial  */}
      <section className="about-testimonial">
        <div className="container position-relative">
          <div className="about-testimonial-shape"></div>
          <div className="row mb-5">
            <div className="col-md-7" data-aos="zoom-in" data-aos-delay="200">
              <h2 className="section-title mb-2">What Our Users Say</h2>
              <p>
                Real stories from job seekers and employers who found success
                through JobsAlgo.
              </p>
            </div>
          </div>
          <div className="row about-testimonial-card text-center position-relative">
            <div className="col-md-4 mt-3 mt-md-4 ">
              <div
                className="card about-testimonial-item  h-100"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="card-body p-4 py-5">
                  <img
                    src="/images/testimonial/david.jpg"
                    alt="David"
                    className="img-fluid rounded-circle border mb-4"
                    width="100"
                  />
                  <h4 className="about-testimonial-title fs-4 mb-2">David</h4>
                  <small>Marketing Executive</small>
                  <p className="mb-4 about-testimonial-rating">
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star-half-alt active"></span>
                  </p>
                  <p className="about-testimonial-content mb-0">
                    JobsAlgo made my job search so easy! I uploaded my resume,
                    applied in one click, and landed a job within two weeks.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3 mt-md-4">
              <div
                className="card about-testimonial-item h-100"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="card-body p-4 py-5">
                  <img
                    src="/images/testimonial/sofia.jpg"
                    alt="Sofia"
                    className="img-fluid rounded-circle border mb-4"
                    width="100"
                  />
                  <h4 className="about-testimonial-title fs-4 mb-2">Sofia</h4>
                  <small> HR Manager</small>
                  <p className="mb-4 about-testimonial-rating">
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star-half-alt active"></span>
                  </p>
                  <p className="about-testimonial-content mb-0">
                    Hiring used to be time-consuming, but JobsAlgo’s AI-matching
                    helped us find the right candidate in days, not weeks.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3 mt-md-4">
              <div
                className="card about-testimonial-item h-100"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="card-body p-4 py-5">
                  <img
                    src="/images/testimonial/liam.jpg"
                    alt="Liam"
                    className="img-fluid rounded-circle border mb-4"
                    width="100"
                  />
                  <h4 className="about-testimonial-title fs-4 mb-2">
                    Liam Novak
                  </h4>
                  <small>Software Developer</small>
                  <p className="mb-4 about-testimonial-rating">
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star-half-alt active"></span>
                  </p>
                  <p className="about-testimonial-content mb-0">
                    I loved how simple the platform is. Clear job listings,
                    quick applications, and helpful career tips — it really
                    boosted my confidence."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* call to action  */}

      <section
        className="bg-image overlay-primary fixed overlay"
        id="next-section"
        style={{
          backgroundImage: "url('images/cta-2.jpg')",
          padding: "6rem 0",
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
                Grow Your Career with JobsAlgo
              </h2>
              <p className="text-white">
                We connect job seekers with the right opportunities and help
                employers find the best talent. Join us and be part of a smarter
                hiring journey.
              </p>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/contact")}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

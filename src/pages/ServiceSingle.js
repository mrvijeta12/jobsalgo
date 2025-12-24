import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ServiceSingle = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  return (
    <>
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
              <h1 className="text-white font-weight-bold">Service Single</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Service Single</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section block__18514" id="next-section">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-3 mr-auto"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="border p-4 rounded">
                <ul className="list-unstyled block__47528 mb-0">
                  <li>
                    <Link
                      to="#"
                      className={`${tab === 1 ? "service_single_current" : ""}`}
                      onClick={() => setTab(1)}
                    >
                      Smart Job Search
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className={`${tab === 2 ? "service_single_current" : ""}`}
                      onClick={() => setTab(2)}
                    >
                      Employer Connection
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className={`${tab === 3 ? "service_single_current" : ""}`}
                      onClick={() => setTab(3)}
                    >
                      Career Advice
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className={`${tab === 4 ? "service_single_current" : ""}`}
                      onClick={() => setTab(4)}
                    >
                      Skill Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className={`${tab === 5 ? "service_single_current" : ""}`}
                      onClick={() => setTab(5)}
                    >
                      Salary & Market Insights
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {tab === 1 && (
              <div className="col-lg-8" data-aos="zoom-in" data-aos-delay="200">
                <span className="text-primary d-block mb-5">
                  <span className="icon-search display-1"></span>
                </span>
                <h2 className="mb-4">Smart Job Search</h2>
                <p>
                  SimplifyJob provides a powerful smart search engine to help
                  job seekers find the perfect opportunity quickly. Filter jobs
                  by location, salary, type, and skills to discover positions
                  that match your profile.
                </p>
                <p>
                  Advanced AI-driven recommendations suggest jobs based on your
                  resume, experience, and career goals, saving you time and
                  effort.
                </p>
                <p>
                  Stay updated with personalized job alerts, ensuring you never
                  miss an opportunity that suits your skills and aspirations.
                </p>
                <p>
                  <Link to="#" className="btn btn-primary btn-md mt-4">
                    Start Your Job Search
                  </Link>
                </p>
              </div>
            )}
            {tab === 2 && (
              <div className="col-lg-8" data-aos="zoom-in" data-aos-delay="200">
                <span className="text-primary d-block mb-5">
                  <span className="icon-briefcase display-1"></span>
                </span>
                <h2 className="mb-4">Employer Connection</h2>
                <p>
                  Connect directly with top employers and companies actively
                  hiring in your industry. SimplifyJob bridges the gap between
                  candidates and recruiters for a smooth hiring process.
                </p>
                <p>
                  Create a professional profile that employers can discover,
                  making it easier for the right opportunities to reach you.
                </p>
                <p>
                  Track applications, communicate with recruiters, and get
                  feedback to improve your chances of landing the job you want.
                </p>
                <p>
                  <Link to="#" className="btn btn-primary btn-md mt-4">
                    Connect with Employers
                  </Link>
                </p>
              </div>
            )}{" "}
            {tab === 3 && (
              <div className="col-lg-8" data-aos="zoom-in" data-aos-delay="200">
                <span className="text-primary d-block mb-5">
                  <i className="fas fa-lightbulb display-1"></i>
                </span>

                <h2 className="mb-4">Career Advice</h2>
                <p>
                  Access expert career advice and resources to boost your
                  professional growth. Get tips on resume writing, interview
                  preparation, and personal branding.
                </p>
                <p>
                  Learn strategies for negotiating salaries, advancing your
                  career, and making informed decisions at every stage.
                </p>
                <p>
                  Our curated articles, webinars, and guides help you stay
                  competitive in a fast-changing job market.
                </p>
                <p>
                  <Link to="#" className="btn btn-primary btn-md mt-4">
                    Explore Career Advice
                  </Link>
                </p>
              </div>
            )}{" "}
            {tab === 4 && (
              <div className="col-lg-8" data-aos="zoom-in" data-aos-delay="200">
                <span className="text-primary d-block mb-5">
                  <span className="icon-graduation-cap display-1"></span>
                </span>
                <h2 className="mb-4">Skill Development</h2>
                <p>
                  Enhance your skills with SimplifyJob’s learning resources and
                  courses. Stay ahead by acquiring new skills relevant to the
                  jobs you want.
                </p>
                <p>
                  From coding and design to leadership and communication, we
                  provide online courses and certifications to improve
                  employability.
                </p>
                <p>
                  Track your progress and showcase new skills on your profile to
                  attract top employers.
                </p>
                <p>
                  <Link to="#" className="btn btn-primary btn-md mt-4">
                    Start Learning Today
                  </Link>
                </p>
              </div>
            )}{" "}
            {tab === 5 && (
              <div className="col-lg-8" data-aos="zoom-in" data-aos-delay="200">
                <span className="text-primary d-block mb-5">
                  <span className="icon-bar-chart display-1"></span>
                </span>
                <h2 className="mb-4">Salary & Market Insights</h2>
                <p>
                  Make informed career decisions with accurate salary data and
                  market trends. SimplifyJob provides insights into average
                  salaries, industry demand, and career growth potential.
                </p>
                <p>
                  Compare salaries by role, location, and experience level to
                  negotiate better offers confidently.
                </p>
                <p>
                  Stay updated on emerging industries and skills to align your
                  career path with market needs.
                </p>
                <p>
                  <Link
                    to="#"
                    className="btn btn-primary btn-md mt-4"
                    style={{ fontWeight: "600" }}
                  >
                    View Market Insights
                  </Link>
                </p>
              </div>
            )}
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
                Ready to Take the Next Step?
              </h2>
              <p className="text-white">
                Discover how SimplyfyJob’s services can make your hiring or job
                search journey easier. Let’s connect and explore how we can
                support your goals.
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

export default ServiceSingle;

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>JobsAlgo | Blogs</title>
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
              <h1 className="text-white font-weight-bold">Our Blog</h1>
              <div className="custom-breadcrumbs">
                <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Blogs</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section blog-section">
        <div className="container">
          <div className="row mb-5">
            <div
              className="col-md-6 col-lg-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link href="blog-single.html">
                <img
                  src="/images/blogs/find-right-job.jpg"
                  alt="find-right-job"
                  className="img-fluid rounded mb-4 blog-img"
                />
              </Link>
              <h3>
                <Link href="blog-single.html" className="text-black">
                  7 Tips to Find the Right Job Faster
                </Link>
              </h3>
              <div>August 20, 2025</div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link href="blog-single.html">
                <img
                  src="/images/blogs/write-standard-resume.jpg"
                  alt="write-standard-resume"
                  className="img-fluid rounded mb-4 blog-img"
                />
              </Link>
              <h3>
                <Link href="blog-single.html" className="text-black">
                  How to Write a Standout Resume for JobsAlgo
                </Link>
              </h3>
              <div>August 18, 2025</div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link href="blog-single.html">
                <img
                  src="/images/blogs/connect-with-top-employee.jpg"
                  alt="connect-with-top-employee"
                  className="img-fluid rounded mb-4 blog-img"
                />
              </Link>
              <h3>
                <Link href="blog-single.html" className="text-black">
                  How to Connect with Top Employers Online
                </Link>
              </h3>
              <div>August 15, 2025</div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link href="blog-single.html">
                <img
                  src="/images/blogs/maximize-job-alert.jpg"
                  alt="maximize-job-alert"
                  className="img-fluid rounded mb-4 blog-img"
                />
              </Link>
              <h3>
                <Link href="blog-single.html" className="text-black">
                  Maximizing Job Alerts to Never Miss Opportunities
                </Link>
              </h3>
              <div>August 12, 2025</div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link href="blog-single.html">
                <img
                  src="/images/blogs/skill-dev-course.jpg"
                  alt="Skill Development Courses "
                  className="img-fluid rounded mb-4 blog-img"
                />
              </Link>
              <h3>
                <Link href="blog-single.html" className="text-black">
                  Skill Development Courses to Boost Your Career
                </Link>
              </h3>
              <div>August 10, 2025</div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link href="blog-single.html">
                <img
                  src="/images/blogs/understanding-salary-insight.jpg"
                  alt="Understanding Salary Insights Before Negotiation"
                  className="img-fluid rounded mb-4 blog-img"
                />
              </Link>
              <h3>
                <Link href="blog-single.html" className="text-black">
                  Understanding Salary Insights Before Negotiation
                </Link>
              </h3>
              <div>August 8, 2025</div>
            </div>
          </div>
          {/* 
          <div className="row pagination-wrap mt-5">
            <div className="col-md-12 text-center">
              <div className="custom-pagination ml-auto">
                <Link href="#" className="prev">
                  Prev
                </Link>
                <div className="d-inline-block">
                  <Link href="#" className="active">
                    1
                  </Link>
                  <Link href="#">2</Link>
                  <Link href="#">3</Link>
                  <Link href="#">4</Link>
                </div>
                <Link href="#" className="next">
                  Next
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* call to action  */}

      <section
        className="bg-image overlay-primary fixed overlay"
        id="next-section"
        style={{
          backgroundImage: "url('images/cta-3.jpg')",
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
                Have Questions or Need Guidance?
              </h2>
              <p className="text-white">
                Whether you’re exploring career advice or hiring strategies from
                our blog, our team is here to support you. Get in touch to
                discuss your goals with JobsAlgo.
              </p>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

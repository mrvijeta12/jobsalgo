import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BlogSingle = () => {
  const navigate = useNavigate();
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
            <div className="col-md-12" data-aos="fade-up" data-aos-delay="200">
              <div className="custom-breadcrumbs mb-0">
                <span className="slash">Posted by</span> <span> Admin</span>
                {/* <span className="mx-2 slash">&bullet;</span> */}
                <span className="text-white ml-2">
                  <strong>August 22, 2025</strong>
                </span>
              </div>

              <h1 className="text-white" style={{ fontWeight: "600" }}>
                How to Land Your Dream Job with SimplifyJob
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section single-blog" id="next-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 blog-content">
              {/* <h3 className="mb-4" data-aos="zoom-in" data-aos-delay="200"></h3> */}
              <h2
                class="section-title mb-3 aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                SimplifyJob: Making Job Search Smarter and Easier
              </h2>
              <p className="" data-aos="zoom-in" data-aos-delay="200">
                SimplifyJob is a modern job portal designed to connect job
                seekers with top employers efficiently. Our smart platform
                streamlines the job search process and helps candidates find
                roles that truly match their skills.
              </p>
              <p data-aos="zoom-in" data-aos-delay="200">
                <img
                  src="images/job_single_img_1.jpg"
                  alt="Job Search"
                  className="img-fluid rounded"
                />
              </p>
              <p data-aos="fade-up" data-aos-delay="1000">
                From filtering jobs by location, salary, or experience to
                receiving personalized job recommendations, SimplifyJob makes
                your search faster and more effective. With AI-driven
                suggestions, users can discover opportunities they might
                otherwise miss.
              </p>

              <blockquote>
                <p data-aos="fade-up" data-aos-delay="1000">
                  “SimplifyJob transformed my career search! The personalized
                  alerts and curated listings saved me countless hours.” – Jane
                  Doe
                </p>
              </blockquote>

              <p data-aos="fade-up" data-aos-delay="1000">
                Our platform also provides a range of services for employers,
                including posting jobs, tracking applications, and discovering
                the best candidates for their teams. This dual approach ensures
                both sides of the job market are served effectively.
              </p>

              <h4
                className="mt-5 mb-4"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                Enhance Your Career with SimplifyJob Features
              </h4>
              <p data-aos="fade-up" data-aos-delay="1000">
                SimplifyJob offers tools such as resume building, skill
                development courses, career advice, and detailed market
                insights. By leveraging these features, job seekers can improve
                their profiles, gain new skills, and make informed career
                decisions.
              </p>
              <p data-aos="fade-up" data-aos-delay="1000">
                Whether you are looking for full-time, part-time, freelance, or
                remote opportunities, SimplifyJob has a comprehensive database
                of listings across multiple industries.
              </p>
              <p data-aos="fade-up" data-aos-delay="1000">
                Stay updated with alerts for the latest job postings, and
                connect directly with top employers looking for candidates just
                like you.
              </p>
              <p data-aos="fade-up" data-aos-delay="1000">
                <Link
                  to="#"
                  className="btn btn-primary btn-md mt-4"
                  style={{ fontWeight: "600" }}
                >
                  Explore Jobs Now
                </Link>
              </p>
            </div>

            <div
              className="col-lg-4 sidebar pl-lg-5"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="sidebar-box">
                <img
                  src="images/person_1.jpg"
                  alt="Sneha"
                  className="img-fluid mb-4 w-50 rounded-circle"
                />
                <h3 style={{ fontWeight: "600" }}>About The Author</h3>
                <p>
                  Sneha is an experienced career consultant with extensive
                  expertise in guiding professionals through the job market. She
                  is dedicated to simplifying the job search process and
                  provides valuable insights and strategies for both job seekers
                  and employers.
                </p>

                {/* <p>
                  <Link to="#" className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                </p> */}
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
                Liked What You Read?
              </h2>
              <p className="text-white">
                If this article inspired you or raised questions, let’s continue
                the conversation. Our team at SimplyfyJob is here to help you
                with career growth and hiring solutions.
              </p>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/contact")}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSingle;

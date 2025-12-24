import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>JobsAlgo | FAQ</title>
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
              <h1 className="text-white font-weight-bold">
                Frequently Ask Questions
              </h1>
              <div className="custom-breadcrumbs">
                <Link href="index.html">Home</Link>{" "}
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>FAQ</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section" id="accordion">
        <div className="container">
          <div className="row accordion justify-content-center block__76208">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
              <img
                src="images/sq_img_8.jpg"
                alt="Faq"
                className="img-fluid rounded"
              />
            </div>
            <div
              className="col-lg-5 ml-auto"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {/* Employer FAQ */}
              <div className="accordion-item">
                <h3 className="mb-0 heading">
                  <a
                    className="btn-block h4"
                    data-toggle="collapse"
                    href="#collapseFive"
                    role="button"
                    aria-expanded="true"
                    aria-controls="collapseFive"
                  >
                    What is JobsAlgo? <span className="icon"></span>
                  </a>
                </h3>
                <div
                  id="collapseFive"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="body-text">
                    <p>
                      JobsAlgo is a modern job portal that connects job seekers
                      with employers. Employees can create profiles, upload
                      resumes, and apply for roles, while employers can post
                      vacancies and find candidates faster using smart search
                      filters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Employer FAQ */}
              <div className="accordion-item">
                <h3 className="mb-0 heading">
                  <a
                    className="btn-block h4"
                    data-toggle="collapse"
                    href="#collapseSix"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    What are the charges for posting jobs?{" "}
                    <span className="icon"></span>
                  </a>
                </h3>
                <div
                  id="collapseSix"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="body-text">
                    <p>
                      Employers can post a limited number of jobs for free. For
                      extended visibility and premium features like highlighted
                      listings and resume access, subscription plans are
                      available for 1, 3, or 6 months at competitive rates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Employee FAQ */}
              <div className="accordion-item">
                <h3 className="mb-0 heading">
                  <a
                    className="btn-block h4"
                    data-toggle="collapse"
                    href="#collapseSeven"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    Do I need to pay to apply for jobs?{" "}
                    <span className="icon"></span>
                  </a>
                </h3>
                <div
                  id="collapseSeven"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="body-text">
                    <p>
                      No, job seekers can apply to jobs for free. Simply create
                      a profile, upload your resume, and start applying. Premium
                      job alerts and resume boosting are optional paid features
                      to improve visibility.
                    </p>
                  </div>
                </div>
              </div>

              {/* General Support FAQ */}
              <div className="accordion-item">
                <h3 className="mb-0 heading">
                  <a
                    className="btn-block h4"
                    data-toggle="collapse"
                    href="#collapseEight"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseEight"
                  >
                    Who should I contact for support?{" "}
                    <span className="icon"></span>
                  </a>
                </h3>
                <div
                  id="collapseEight"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="body-text">
                    <p>
                      For assistance, both employers and job seekers can reach
                      out to our support team via the Help Center or email. Our
                      team is available 24/7 to resolve issues like account
                      setup, posting jobs, or applying to opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-light">
        <div className="container">
          <div className="row mb-5" data-aos="zoom-in" data-aos-delay="200">
            <div className="col-12 text-center" data-aos="fade">
              <h2 className="section-title mb-3">Happy Candidates Say</h2>
            </div>
          </div>
          <div className="row">
            {/* Testimonial 1 */}
            <div className="col-lg-6">
              <div
                className="block__87154 bg-white rounded"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <blockquote>
                  <p>
                    &ldquo;JobsAlgo made my job search stress-free. The smart
                    filters helped me find roles that matched my skills, and I
                    landed interviews within days of signing up. Highly
                    recommended for job seekers!&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="images/testimonial/priya-nair.jpg"
                      alt="Priya Nair"
                      className="img-fluid"
                    />
                  </figure>
                  <div className="testimonial-user">
                    <h3>Priya Nair</h3>
                    <span className="position">Marketing Executive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div className="block__87154 bg-white rounded">
                <blockquote>
                  <p>
                    &ldquo;I uploaded my resume and within a week received
                    multiple interview calls. The job alerts kept me updated,
                    and I finally got placed in a company I love. Thank you
                    JobsAlgo!&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="images/testimonial/karan.jpg"
                      alt="Karan"
                      className="img-fluid"
                    />
                  </figure>
                  <div className="testimonial-user">
                    <h3>Karan Malhotra</h3>
                    <span className="position">Software Developer</span>
                  </div>
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
                Still Have Questions?
              </h2>
              <p className="text-white">
                If you didn’t find the answer you were looking for, our team at
                JobsAlgo is here to help. Reach out and we’ll guide you
                personally.
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

export default FAQ;

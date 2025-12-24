import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>JobsAlgo | Testimonials</title>
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
              <h1 className="text-white font-weight-bold">Testimonials</h1>
              <div className="custom-breadcrumbs">
                <Link href="/">Home</Link> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Testimonials</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section" id="next-section">
        <div className="container">
          <div className="row">
            {/* Employee Testimonial */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__87154">
                <blockquote>
                  <p>
                    &ldquo;JobsAlgo made job hunting so much easier. Within a
                    week I found multiple roles that matched my skills and got
                    an interview quickly. The resume builder helped me create a
                    strong CV in minutes.&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 testimonial-user d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="/images/testimonial/ananya-desai.jpg"
                      alt="Ananya Desai"
                      className="img-fluid"
                    />
                  </figure>
                  <div>
                    <h3>Ananya Desai</h3>
                    <span className="position">Data Analyst</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Testimonial */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__87154">
                <blockquote>
                  <p>
                    &ldquo;As an employer, JobsAlgo has been a game changer. The
                    candidate search filters are excellent, and I was able to
                    connect with qualified applicants in less than 48
                    hours.&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 testimonial-user d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="/images/testimonial/vikram-iyer.jpg"
                      alt="Vikram Iyer"
                      className="img-fluid"
                    />
                  </figure>
                  <div>
                    <h3>Vikram Iyer</h3>
                    <span className="position">HR Manager</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Testimonial */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__87154">
                <blockquote>
                  <p>
                    &ldquo;The instant job alerts kept me updated on new
                    opportunities daily. I never missed an opening that matched
                    my career goals, and I landed a role faster than I
                    expected.&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 testimonial-user d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="/images/testimonial/arjun.jpg"
                      alt="Arjun"
                      className="img-fluid"
                    />
                  </figure>
                  <div>
                    <h3>Arjun </h3>
                    <span className="position">Software Developer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Testimonial */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="block__87154">
                <blockquote>
                  <p>
                    &ldquo;We’ve hired several skilled candidates through
                    JobsAlgo. The platform is easy to use, and the skill
                    assessments gave us confidence in the applicants’ abilities
                    before interviews.&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 testimonial-user d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="/images/testimonial/priya-nair.jpg"
                      alt="Priya Nair"
                      className="img-fluid"
                    />
                  </figure>
                  <div>
                    <h3>Priya Nair</h3>
                    <span className="position">Recruitment Lead</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlighted Testimonial */}
            <div
              className="col-lg-12 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="block__87154 bg-primary">
                <blockquote>
                  <p className="text-white">
                    &ldquo;JobsAlgo bridges the gap between employers and
                    employees. Whether you are looking for the right opportunity
                    or the right talent, this platform makes the process smooth,
                    fast, and reliable.&rdquo;
                  </p>
                </blockquote>
                <div className="block__91147 testimonial-user d-flex align-items-center">
                  <figure className="mr-4">
                    <img
                      src="/images/testimonial/alex-morgan.jpg"
                      alt="Alex Morgan"
                      className="img-fluid"
                    />
                  </figure>
                  <div>
                    <h3 className="text-white">Alex Morgan</h3>
                    <span className="position position-2 text-white">
                      Business Consultant
                    </span>
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
          backgroundImage: "url('images/cta-2.jpg')",
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
                Be Our Next Success Story
              </h2>
              <p className="text-white">
                Thousands of professionals and companies have already achieved
                their goals with JobsAlgo. Ready to start your own journey?
                Let’s build your success together.
              </p>
              <button
                className="cta-btn mt-4"
                onClick={() => navigate("/contact")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;

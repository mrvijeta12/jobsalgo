import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "JobsAlgo | Terms & Conditions";
  }, []);
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
      <div
        className="container"
        style={{ paddingBottom: "60px", paddingTop: "100px" }}
      >
        <h1
          className="text-start mb-2"
          style={{ color: "#89ba16", fontWeight: 700, fontSize: "48px" }}
        >
          Terms & Conditions
        </h1>

        <hr
          style={{
            border: "0",
            height: "1px",
            backgroundColor: "#89ba16",
            opacity: 1,
          }}
        />

        <p>
          Welcome to JobsAlgo <strong>https://www.jobsalgo.com</strong>. By
          accessing or using this website, you agree to be bound by these Terms
          and Conditions. If you do not agree with any part of these terms, you
          must not use the JobsAlgo platform.
        </p>

        <p>
          JobsAlgo is a job discovery and job listing platform designed to
          connect job seekers with employers. JobsAlgo does not act as an
          employer, recruitment agency, or placement service, and does not
          guarantee employment, job offers, or interview opportunities.
        </p>

        <p>
          Users are responsible for ensuring that all information provided on
          their profiles, resumes, and job postings is accurate, complete, and
          lawful. JobsAlgo reserves the right to remove, modify, or restrict
          access to any content that is misleading, fraudulent, offensive, or in
          violation of applicable laws or these Terms and Conditions.
        </p>

        <p>
          Employers and recruiters using JobsAlgo agree to post only genuine job
          opportunities and to comply with all applicable labor laws,
          anti-discrimination regulations, and data protection requirements.
          JobsAlgo is not responsible for the authenticity of job postings or
          the conduct of employers or recruiters.
        </p>

        <p>
          Users must not use the platform for any unlawful purpose, including
          but not limited to posting false information, engaging in fraudulent
          activities, harvesting user data, or attempting to disrupt the
          operation or security of the website.
        </p>

        <p>
          JobsAlgo may contain links to third-party websites or services. These
          links are provided for convenience only, and JobsAlgo has no control
          over the content, policies, or practices of any third-party websites.
          Accessing such websites is done at your own risk.
        </p>

        <p>
          JobsAlgo shall not be liable for any direct, indirect, incidental,
          consequential, or special damages arising out of or in connection with
          the use or inability to use the platform, including but not limited to
          loss of data, loss of income, or loss of business opportunities.
        </p>

        <p>
          JobsAlgo reserves the right to update or modify these Terms and
          Conditions at any time without prior notice. Continued use of the
          website after changes are made constitutes acceptance of the revised
          terms. Users are encouraged to review this page periodically.
        </p>

        <p className="mt-4">
          If you have any questions regarding these Terms and Conditions, please
          contact us through the communication channels provided on the website.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;

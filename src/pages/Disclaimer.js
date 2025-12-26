import React, { useEffect } from "react";

const Disclaimer = () => {
  useEffect(() => {
    document.title = "JobsAlgo | Disclaimer";
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
        class="container"
        style={{ paddingBottom: "60px", paddingTop: "100px" }}
      >
        <h1
          className="text-start mb-2 "
          style={{ color: "#89ba16", fontWeight: 700, fontSize: "48px" }}
        >
          Disclaimer
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
          The information provided on JobsAlgo
          <strong> https://www.jobsalgo.com </strong> is for general
          informational purposes only. While we strive to ensure that all job
          listings, employer details, and related information published on this
          website are accurate and up to date, JobsAlgo makes no warranties or
          representations of any kind, express or implied, about the
          completeness, accuracy, reliability, or suitability of the information
          contained on the platform.
        </p>

        <p>
          JobsAlgo acts solely as a job listing and job discovery platform. We
          do not guarantee job placement, employment offers, interview calls, or
          responses from employers. Any reliance you place on information
          obtained through this website is strictly at your own risk.
        </p>

        <p>
          JobsAlgo is not responsible for the actions, conduct, or content of
          third-party employers, recruiters, or job seekers who use the
          platform. Users are advised to independently verify the authenticity
          of job postings, employer credentials, and any offers received.
          JobsAlgo will not be liable for any loss, damage, or inconvenience
          arising from fraudulent job postings, scams, misrepresentation, or
          misuse of information.
        </p>

        <p>
          The website may contain links to third-party websites or services that
          are not owned or controlled by JobsAlgo. We have no control over, and
          assume no responsibility for, the content, privacy policies, or
          practices of any third-party websites or services. Accessing such
          links is at your own discretion.
        </p>

        <p>
          JobsAlgo shall not be held liable for any direct, indirect,
          incidental, consequential, or special damages, including but not
          limited to loss of data, loss of income, or business interruption,
          arising out of the use or inability to use this website.
        </p>

        <p>
          By using JobsAlgo, you acknowledge that you have read, understood, and
          agree to this disclaimer. JobsAlgo reserves the right to modify or
          update this disclaimer at any time without prior notice. Users are
          encouraged to review this page periodically for any changes.
        </p>

        <p class="mt-4">
          If you have any questions or concerns regarding this disclaimer,
          please contact us through the appropriate channels available on the
          website.
        </p>
      </div>
    </>
  );
};

export default Disclaimer;

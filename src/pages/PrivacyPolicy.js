import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "JobsAlgo | Privacy Policy";
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
          Privacy Policy
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
          At JobsAlgo <strong>https://www.jobsalgo.com</strong>, we are
          committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you
          visit or use our website and services.
        </p>

        <p>
          We may collect personal information such as your name, email address,
          phone number, resume details, employment history, and other
          information you voluntarily provide when creating an account, applying
          for jobs, or communicating with employers through the platform.
        </p>

        <p>
          JobsAlgo also automatically collects certain non-personal information,
          including IP address, browser type, device information, pages visited,
          and usage patterns. This information is used to improve website
          performance, enhance user experience, and analyze platform usage.
        </p>

        <p>
          The information collected is used to provide and improve our services,
          facilitate job applications, connect job seekers with employers, send
          relevant notifications, and communicate important updates related to
          your account or the platform.
        </p>

        <p>
          JobsAlgo does not sell, rent, or trade your personal information to
          third parties. However, your information may be shared with employers,
          recruiters, or service providers solely for the purpose of delivering
          our services or when required by law.
        </p>

        <p>
          We implement reasonable technical and organizational security measures
          to protect your personal information from unauthorized access, misuse,
          or disclosure. However, no method of transmission over the internet or
          electronic storage is completely secure, and we cannot guarantee
          absolute security.
        </p>

        <p>
          JobsAlgo may use cookies and similar tracking technologies to enhance
          user experience, analyze traffic, and personalize content. You can
          choose to disable cookies through your browser settings, though some
          features of the website may not function properly.
        </p>

        <p>
          This website may contain links to third-party websites. JobsAlgo is
          not responsible for the privacy practices or content of such external
          sites, and users are encouraged to review the privacy policies of any
          third-party websites they visit.
        </p>

        <p>
          JobsAlgo reserves the right to update or modify this Privacy Policy at
          any time. Any changes will be posted on this page, and continued use
          of the website constitutes acceptance of the updated policy.
        </p>

        <p className="mt-4">
          If you have any questions or concerns regarding this Privacy Policy or
          how your information is handled, please contact us through the
          appropriate channels available on the website.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;

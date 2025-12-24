import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <Link href="#top" className="smoothscroll scroll-top">
          <span className="icon-keyboard_arrow_up"></span>
        </Link>

        <div className="container">
          <div className="row mb-5">
            <div className="col-md-4 mb-4 mb-md-0">
              <h1 style={{ color: "#89ba16", fontWeight: "700" }}>JobsAlgo</h1>
              <h6 className="text-white">Careers made simpler</h6>

              <h6 className="text-white">
                {" "}
                <i>JobsAlgo is a unit of Tekalgo</i>
              </h6>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>Company</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                {/* <li>
                  <Link to="#">Career</Link>
                </li> */}
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-4 mb-md-0">
              <h3>Quick Links</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/disclaimer">Disclaimer</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            {/* <div className="col-md-4 mb-4 mb-md-0">
              <h3>Contact Us</h3>
              <div className="footer-social">
                <Link href="#">
                  <span className="icon-facebook "></span>
                </Link>
                <Link href="#">
                  <span className="icon-twitter "></span>
                </Link>
                <Link href="#">
                  <span className="icon-instagram "></span>
                </Link>
                <Link href="#">
                  <span className="icon-linkedin "></span>
                </Link>
              </div>
            </div> */}
          </div>

          <div className="row text-center">
            <div className="col-12">
              <p className="copyright">
                <small>
                  Copyright &copy;
                  <script>document.write(new Date().getFullYear());</script>
                  JobsAlgo. All Rights Reserved.
                </small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

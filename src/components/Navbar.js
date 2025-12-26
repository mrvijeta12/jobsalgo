import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useFixMobileNav from "./useFixMobileNav";
import { useContext } from "react";
import FrontendContext from "../context/FrontendContext";
import { getCurrentUser } from "../Hooks/getCurrentUser";
import FrontEndProvider from "../context/FrontEndProvider";
import { FaXmark } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showMobNav, setShowMobNav] = useState(false);
  const [showMobNavDropdown, setShowMobNavDropdown] = useState(false);

  const { user, handleLogout } = useContext(FrontendContext);

  // close logout button
  useEffect(() => {
    setOpenDropdown(false);
  }, [user]);

  // close dropdwon
  useEffect(() => {
    setShowMobNavDropdown(false);
  }, [showMobNav]);

  // close mob nav and nav dropdown
  useEffect(() => {
    setShowMobNavDropdown(false);
    setShowMobNav(false);
  }, [location.pathname]);

  function handleCompanyClick(e) {
    if (window.innerWidth <= 1200) {
      e.preventDefault();
      setShowMobNavDropdown((prev) => !prev);
    }
  }

  return (
    <header className={`site-navbar py-4 `}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6">
            <NavLink to="/">
              <img
                src="/images/logo/jobsalgo-logo-removebg-preview.png"
                alt=""
                style={{ width: "130px", filter: "brightness(0) invert(1)" }}
              />
            </NavLink>
          </div>

          <nav
            className={`mx-auto site-navigation ${showMobNav ? "show" : ""}`}
          >
            <div className="site-logo d-xl-none d-flex justify-content-between">
              <NavLink to="/">
                <img
                  src="/images/logo/jobsalgo-logo-removebg-preview.png"
                  alt=""
                  style={{ width: "130px", filter: "brightness(0) invert(1)" }}
                />
              </NavLink>
              <button
                onClick={() => setShowMobNav(false)}
                className="mob-nav-close-btn"
                aria-label="Close menu"
              >
                <FaXmark />
              </button>
            </div>
            <ul className="site-menu d-xl-block ml-0 pl-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Jobs
                </NavLink>
              </li>

              <li className={`has-children`}>
                <NavLink to="#" onClick={handleCompanyClick}>
                  Company
                </NavLink>
                <ul
                  className={`dropdown ${
                    showMobNavDropdown ? "showDropdown" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/services"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Services
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/testimonials"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Testimonials
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/faq"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      FAQ
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Contact
                </NavLink>
              </li>
              {/* <li className="d-xl-none">
                <NavLink to="/post-job" className="w-100">
                  <span className="mr-2">+</span> Post a Job
                </NavLink>
              </li> */}
            </ul>
          </nav>

          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto d-flex align-items-center">
              {/* <NavLink
                to="/post-job"
                className="btn btn-outline-white border-width-2 d-none d-xl-inline-block me-1"
              >
                <span className="mr-2 icon-add"></span>Post a Job
              </NavLink> */}
              {user ? (
                <div
                  className="avatar-wrapper"
                  onMouseEnter={() => setOpenDropdown(true)}
                  onMouseLeave={() => setOpenDropdown(false)}
                >
                  <div
                    className="user-avatar d-flex align-items-center justify-content-center ml-lg-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgb(137, 186, 22)",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <ul
                    className={`custom-dropdown-menu ${
                      openDropdown ? "dropdown-open" : ""
                    }`}
                  >
                    <li>
                      <button
                        className="custom-dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="btn btn-primary border-width-2  ml-xl-2 mr-xl-3 log-in-btn"
                >
                  <span className="mr-2 icon-lock_outline"></span>Log In
                </NavLink>
              )}
            </div>

            <button
              onClick={() => setShowMobNav(!showMobNav)}
              className="site-menu-toggle js-menu-toggle d-flex align-items-center d-xl-none  ml-3 "
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <span className="icon-menu h3 m-0 p-0 "></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

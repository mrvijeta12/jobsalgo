import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AdminContext from "../Context/AdminContext";
import styles from "../assets/admin.module.css";

import { FaTachometerAlt, FaBriefcase, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(AdminContext);

  return (
    <>
      <div
        className={`${
          styles.sidebar
        } position-fixed top-0 start-0 vh-100 p-3 d-md-block ${
          showSidebar ? "" : styles.hidden
        }`}
        style={{ background: "#fff" }}
      >
        <h1
          className="mb-4 ms-2 "
          style={{ fontSize: "32px", color: "#0066ff", fontWeight: "700" }}
        >
          SimplifyJob
        </h1>
        <ul className="nav nav-pills flex-column ">
          <li className="nav-item">
            <NavLink
              to="/admin/dashboard"
              onClick={() => {
                if (window.innerWidth < 992) setShowSidebar(false);
              }}
              className={({ isActive }) =>
                `nav-link  ${
                  isActive
                    ? `fw-bold ${styles.bg_active}`
                    : "fw-semibold text-black"
                }`
              }
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/jobs"
              onClick={() => {
                if (window.innerWidth < 992) setShowSidebar(false);
              }}
              className={({ isActive }) =>
                `nav-link  ${
                  isActive
                    ? `fw-bold ${styles.bg_active}`
                    : "fw-semibold text-black"
                }`
              }
            >
              <FaBriefcase className="mr-2" />
              Jobs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/employers"
              onClick={() => {
                if (window.innerWidth < 992) setShowSidebar(false);
              }}
              className={({ isActive }) =>
                `nav-link   ${
                  isActive
                    ? `fw-bold ${styles.bg_active}`
                    : "fw-semibold text-black"
                }`
              }
            >
              <FaBriefcase className="mr-2" />
              Employers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/cv"
              onClick={() => {
                if (window.innerWidth < 992) setShowSidebar(false);
              }}
              className={({ isActive }) =>
                `nav-link   ${
                  isActive
                    ? `fw-bold ${styles.bg_active}`
                    : "fw-semibold text-black"
                }`
              }
            >
              <FaBriefcase className="mr-2" />
              CV
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/login"
              end
              className={({ isActive }) =>
                `nav-link    ${
                  isActive
                    ? `fw-bold ${styles.bg_active}`
                    : "fw-semibold text-black"
                }`
              }
              onClick={() => {
                localStorage.removeItem("token");
                if (window.innerWidth < 992) {
                  setShowSidebar(false);
                }
              }}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

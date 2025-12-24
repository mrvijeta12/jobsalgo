import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import styles from "../assets/admin.module.css";
import AdminContext from "../Context/AdminContext";

const AdminLayout = () => {
  const { showSidebar } = useContext(AdminContext);

  return (
    <>
      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
          backgroundColor: "#edf2fa",
          minWidth: "100%",
          overflow: "auto",
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="d-flex flex-column flex-grow-1 ">
          <main
            className={`${styles.adminMain}
             d-flex flex-column flex-grow-1  py-2 px-3 ${
               showSidebar ? styles.dynamic_margin : ""
             }`}
          >
            <Header />
            <Outlet />
            {/* <Check /> */}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

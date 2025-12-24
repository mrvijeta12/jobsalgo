import React, { useContext } from "react";

import { FaBars } from "react-icons/fa";
import styles from "../assets/admin.module.css";
import AdminContext from "../Context/AdminContext";

const Header = () => {
  const { showSidebar, setShowSidebar } = useContext(AdminContext);
  return (
    <header>
      <div className={`${styles.header} container`}>
        <div className="row mt-1 px-3 py-3 mb-3 bg-white shadow rounded">
          <div
            className={`${styles.sidebar_toggler}`}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaBars color="black" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

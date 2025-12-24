import React from "react";
import styles from "../assets/admin.module.css";

const CardStat = ({ title, value, icon: Icon, style }) => {
  return (
    <div className={` ${styles.admin_card} card  shadow `} style={style}>
      <div className={`${styles.admin_card_body} card-body rounded d-flex`}>
        <div
          className={`${styles.dash_icon_wrapper} icon d-flex justify-content-center align-items-center `}
          style={{ backgroundColor: "white" }}
        >
          {Icon && (
            <Icon size={24} color="black" className={`${styles.dash_icon}`} />
          )}
        </div>
        <div className="card-data text-white">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text fs-2 fw-medium " style={{ fontSize: "18px" }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardStat;

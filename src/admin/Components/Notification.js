import React, { useEffect, useState } from "react";
import styles from "../assets/admin.module.css";

const Notification = ({
  message,
  type = "success",
  duration = 4000,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);
  const [showNotification, setShowNotification] = useState(true);

  // 🩵 Reset when a new message comes in
  useEffect(() => {
    if (message) {
      setShowNotification(true);
      setProgress(100);
    }
  }, [message]);

  // Progress animation
  useEffect(() => {
    if (!showNotification) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, duration / 100);
    return () => clearInterval(interval);
  }, [duration, showNotification]);

  // Auto close when progress ends
  useEffect(() => {
    if (progress === 0) handleClose();
  }, [progress]);

  const handleClose = () => {
    setShowNotification(false);
    setProgress(100);
    if (onClose) onClose();
  };

  if (!message || !showNotification) return null;

  const isSuccess = type === "success";

  return (
    <div className={`${styles.notification} toast show position-fixed`}>
      <div className="toast-body d-flex border align-items-start">
        <i
          className={`mr-2 fa ${
            isSuccess
              ? "fa-check-circle text-success"
              : "fa-times-circle text-danger"
          }`}
          style={{
            fontSize: "1.5rem",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={handleClose}
        ></i>
        <span className="flex-fill" style={{ fontSize: "1rem" }}>
          {message}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-100"
        style={{
          height: "4px",
          background: "#eee",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: isSuccess ? "green" : "red",
            transition: "width 0.1s linear",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Notification;

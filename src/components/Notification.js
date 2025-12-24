import React, { useEffect, useState } from "react";

const Notification = ({
  message,
  type = "success",
  duration = 4000,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, duration / 100);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);
  useEffect(() => {
    if (progress === 0) {
      setShowNotification(false);
      if (onClose) onClose();
    }
  });

  if (!message) return;
  if (!showNotification) return null;
  const isSuccess = type === "success";

  return (
    <>
      {showNotification && (
        <div
          className="toast show position-fixed"
          style={{
            top: "90px",
            right: "20px",
            minWidth: "300px",
            zIndex: 9999,
            background: "white",
          }}
        >
          <div className="toast-body d-flex align-items-center">
            <i
              className={`mr-2 fa ${
                isSuccess
                  ? "fa-check-circle text-success"
                  : "fa-times-circle text-danger"
              }`}
              style={{ fontSize: "1.5rem" }}
            ></i>
            <span className="flex-fill">{message}</span>
          </div>

          {/* Progress bar (animated border from right to left) */}
          <div className="w-100" style={{ height: "4px", background: "#fff" }}>
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
      )}
    </>
  );
};

export default Notification;

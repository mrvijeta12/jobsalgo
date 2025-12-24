import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import Notification from "../Components/Notification";
import AdminContext from "../Context/AdminContext";
import { uploadcv } from "../Utils/uploadCV";

const UploadCV = () => {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { notif, setNotif } = useContext(AdminContext);

  useEffect(() => {
    if (notif?.message) {
      setNotif({ id: null, message: "", type: "" });
    }
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setLoading(true);
      const res = await uploadcv(formData);
      const { success, message } = res;
      if (!success) {
        setNotif({
          id: Date.now(),
          message: message,
          type: "error",
        });
      } else {
        setNotif({
          id: Date.now(),
          message: message,
          type: "success",
        });
      }
      console.log("Upload response:", res.data);
      fileRef.current.value = "";
    } catch (err) {
      console.error(err);
      setNotif({
        id: Date.now(),
        message: err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notif.message && (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
        />
      )}
      <div
        className="container rounded shadow px-3 pt-3 pb-5 bg-white "
        style={{
          minHeight: "85vh",
        }}
      >
        {/* Header row with title and Add button */}

        {/* Search row aligned right */}
        <div className="row mb-4 d-flex justify-content-between">
          <div className="col-md-6  d-flex ">
            <h3 className="mb-0 fw-bold">Upload CV</h3>
          </div>
        </div>
        <div
          className="row h-100 d-flex  justify-content-center py-5 position-relative"
          // style={{ border: "2px solid red" }}
        >
          {/* {loading ? (
            <div
              className="d-flex  flex-column align-items-center justify-content-center"
              style={{
                // border: "2px solid black",
                height: "250px",
                width: "90%",
                borderRadius: "10px",
                backgroundColor: "#f3f3f3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="spinner-border"
                role="status"
                style={{ color: "rgb(0, 102, 255)" }}
              >
                <span className="visually-hidden"></span>
              </div>
            </div>
          ) : (
            <div
              className="d-flex  flex-column align-items-center justify-content-center"
              style={{
                // border: "2px solid black",
                height: "250px",
                width: "90%",
                borderRadius: "10px",
                backgroundColor: "#f3f3f3",
              }}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleUpload}
                disabled={loading}
                style={{ display: "none" }}
              />

              <FaUpload
                size={80}
                onClick={() => !loading && fileRef.current.click()}
                style={{
                  cursor: loading ? "not-allowed" : "pointer",
                  color: loading ? "#aaa" : "rgb(0, 102, 255)",
                }}
              />
            </div>
          )} */}

          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              height: "250px",
              width: "90%",
              borderRadius: "10px",
              backgroundColor: "#f3f3f3",
              position: "relative", // optional, not used for overlay
            }}
          >
            {/* Hidden input always present */}
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleUpload}
              disabled={loading}
              style={{ display: "none" }}
            />

            {loading ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0,0,0,0.001)",
                }}
              >
                <div
                  className="spinner-border"
                  role="status"
                  style={{ color: "rgb(0, 102, 255)" }}
                >
                  <span className="visually-hidden"></span>
                </div>
              </div>
            ) : (
              <FaUpload
                size={80}
                onClick={() => !loading && fileRef.current.click()}
                style={{
                  cursor: loading ? "not-allowed" : "pointer",
                  color: loading ? "#aaa" : "rgb(0, 102, 255)",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadCV;

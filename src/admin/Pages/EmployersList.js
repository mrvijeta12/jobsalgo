import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../Context/AdminContext";
import Notification from "../Components/Notification";
import styles from "../assets/admin.module.css";
import Button from "../Components/Button";

import { Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { deletEmployer, getAllEmployers } from "../Utils/employersLogic";

const EmployersList = () => {
  const [loading, setLoading] = useState(false);
  const { token, notif, setNotif, empData, setEmpData } =
    useContext(AdminContext);
  const navigate = useNavigate();

  // clear notification msg

  useEffect(() => {
    if (notif?.message) {
      setNotif({ id: null, message: "", type: "" });
    }
  }, []);

  // fetch all employer
  useEffect(() => {
    async function fetchEmployers() {
      try {
        setLoading(true);
        if (!token) {
          setNotif({
            id: Date.now(),
            message: "Your session has expired. Please log in again.",
            type: "error",
          });
          navigate("/admin/login");
          return;
        }
        const res = await getAllEmployers(token);
        if (!res.success) {
          setNotif({
            id: Date.now(),
            message: res.message || "Failed to fetch employers",
            type: "error",
          });
          return;
        }

        setEmpData(res.employers);
      } catch (error) {
        console.error("Unexpected fetchEmployers error:", error);
        setNotif({
          id: Date.now(),
          message: "An unexpected error occurred while fetching employers.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchEmployers();
  }, []);

  // edit employer

  function handleEdit(id) {
    if (!token) {
      setNotif({
        id: Date.now(),
        message: "Your session has expired. Please log in again.",
        type: "error",
      });
      navigate("/admin/login");
      return;
    }
    if (!id) {
      setNotif({
        id: Date.now(),
        message: "Invalid employer ID",
        type: "error",
      });
      return;
    }
    navigate(`/admin/edit-employer?id=${id}`);
  }

  //delete employer
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employer?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const res = await deletEmployer(id, token);
      setEmpData((prev) => prev.filter((emp) => emp._id !== id));
      setNotif({
        id: Date.now(),
        message: res.message || "Employer deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      const errorMsg = error.message || "Update failed";
      setNotif({
        id: Date.now(),
        message: errorMsg || "Error deleting employer",
        type: "error",
      });
    }
  }

  return (
    <>
      {notif.message && (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
          // onClose={handleNotifClose}
        />
      )}
      <div
        className=" container rounded shadow px-3 pt-3 pb-5 bg-white  "
        style={{
          minHeight: "85vh",
        }}
      >
        {/* Header row with title and Add button */}

        {/* Search row aligned right */}
        <div className="row mb-4 d-flex justify-content-between">
          <div className="col-md-6  d-flex ">
            <h3 className="mb-0 fw-bold">Employers</h3>
          </div>
          <div className="col-md-6  text-lg-end  mt-2 mt-lg-0 d-flex justify-content-end">
            <Button
              className={`${styles.global_btn} `}
              onClick={() => navigate("/admin/add-employer")}
            >
              Add Employer
            </Button>
          </div>
        </div>
        <div className="row h-100">
          <div className="table-responsive rounded shadow-sm col-12">
            <table className="table table-striped align-middle mb-0">
              {/* ===== Table Header ===== */}
              <thead className="table-light">
                <tr>
                  {/* <th scope="col">Employer ID</th> */}
                  {/* <th scope="col">Employer Code</th> */}
                  <th scope="col">Contact Person</th>
                  <th scope="col">Email</th>
                  <th scope="col">Company Name </th>

                  <th scope="col"> Size</th>
                  <th scope="col">Location</th>

                  <th scope="col">Status</th>
                  {/* <th scope="col">Verified</th> */}
                  <th scope="col">Actions</th>
                </tr>

                {/* ===== Filter Row ===== */}
                {/* <tr>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search ID"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search Code"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search Name"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search Email"
                    />
                  </th>
                  <th>
                    <select className="form-select form-select-sm">
                      <option value="">All</option>
                      <option>New York</option>
                      <option>London</option>
                      <option>Berlin</option>
                    </select>
                  </th>
                  <th>
                    <select className="form-select form-select-sm">
                      <option value="">All</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>Germany</option>
                    </select>
                  </th>
                  <th>
                    <select className="form-select form-select-sm">
                      <option value="">All</option>
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-200</option>
                      <option>200+</option>
                    </select>
                  </th>
                  <th>
                    <select className="form-select form-select-sm">
                      <option value="">All</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Suspended</option>
                    </select>
                  </th>
                  <th>
                    <select className="form-select form-select-sm">
                      <option value="">All</option>
                      <option>Verified</option>
                      <option>Unverified</option>
                    </select>
                  </th>
                  <th>
                    <select className="form-select form-select-sm" disabled>
                      <option>—</option>
                    </select>
                  </th>
                </tr> */}
              </thead>

              {/* ===== Table Body ===== */}
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : empData && empData.length > 0 ? (
                  empData.map((emp) => (
                    <tr key={emp._id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>

                      <td>{emp.company_name}</td>
                      <td>{emp.company_size}</td>
                      <td>{emp.company_location}</td>
                      <td>{emp.status}</td>

                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            variant="light"
                            className="btn-sm border-0 bg-transparent shadow-none"
                          >
                            <FaEllipsisV />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleEdit(emp._id)}
                              className={`${styles.admin_action_btn}`}
                            >
                              <FaEdit className="me-2" /> Edit
                            </Dropdown.Item>

                            <Dropdown.Item
                              onClick={() => handleDelete(emp._id)}
                              className={`${styles.admin_action_btn}`}
                            >
                              <FaTrash className="me-2 text-danger m-0" />{" "}
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-3">
                      No employers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployersList;

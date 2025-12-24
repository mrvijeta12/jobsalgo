import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../Context/AdminContext";
import Notification from "../Components/Notification";
import Button from "../Components/Button";
import styles from "../assets/admin.module.css";

import { Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { deletEmployer, getAllEmployers } from "../Utils/employersLogic";
import { deletJob, getAllJobs } from "../Utils/jobsLogic";

const AdminJobsListing = () => {
  const navigate = useNavigate();

  const {
    token,
    notif,
    setNotif,
    allJobs,
    setAllJobs,
    loading,
    setLoading,
    fetchAllJobs,
  } = useContext(AdminContext);
  // console.log(jobData);

  // useContext(() => {
  //   if (allJobs.length === 0) {
  //     fetchAllJobs();
  //   }
  // }, []);

  useEffect(() => {
    if (notif?.message) {
      setNotif({ id: null, message: "", type: "" });
    }
  }, []);

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
    navigate(`/admin/editjob?id=${id}`);
  }

  //delete employer
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const res = await deletJob(id, token);
      setAllJobs((prev) => prev.filter((job) => job._id !== id));
      setNotif({
        id: Date.now(),
        message: res.message || "Job deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      const errorMsg = error.message || "Update failed";
      setNotif({
        id: Date.now(),
        message: errorMsg || "Error deleting job",
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
            <h3 className="mb-0 fw-bold">Jobs</h3>
          </div>
          <div className="col-md-6  text-lg-end  mt-2 mt-lg-0 d-flex justify-content-end">
            <Button
              className={`${styles.global_btn} `}
              onClick={() => navigate("/admin/addjob")}
            >
              Add New Job
            </Button>
          </div>
        </div>
        <div className="row h-100">
          <div className="table-responsive rounded shadow-sm col-12">
            <table className="table table-striped align-middle mb-0">
              <thead className="table-light">
                {/* ===== Header Row ===== */}
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Company</th>
                  <th scope="col">Category</th>
                  <th scope="col"> Type</th>
                  <th scope="col">Mode</th>
                  <th scope="col">Location</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Posted Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : allJobs && allJobs.length > 0 ? (
                  allJobs.map((job) => (
                    <tr key={job._id}>
                      <td>{job.job_title}</td>
                      <td>{job.createdBy?.company_name}</td>

                      <td>{job.category}</td>
                      <td>{job.job_type}</td>

                      <td>{job.work_mode}</td>
                      <td>{job.location ? job.location : "-"}</td>
                      <td>{job.experience}</td>
                      <td>
                        {new Date(job.posted_date).toLocaleDateString("en-GB")}
                      </td>
                      <td>{job.jobStatus}</td>

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
                              onClick={() => handleEdit(job._id)}
                              className={`${styles.admin_action_btn}`}
                            >
                              <FaEdit className="me-2" /> Edit
                            </Dropdown.Item>

                            <Dropdown.Item
                              onClick={() => handleDelete(job._id)}
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
                      No jobs found
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

export default AdminJobsListing;

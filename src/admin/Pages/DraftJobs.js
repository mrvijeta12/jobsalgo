import React from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";

const DraftJobs = () => {
  function handleChange() {}
  return (
    <>
      <div className="rounded shadow px-3 pt-3 pb-5">
        {/* Header row with title and Add button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0 fw-bold">Draft</h3>
        </div>

        {/* Search row aligned right */}
        <div className="row mb-4 d-flex justify-content-between">
          <div className="col-lg-6  d-flex col-6">
            <Input
              type="search"
              id="search"
              name="search"
              onChange={handleChange}
              placeholder="Enter job title"
              className="form-control me-2"
            />
            <Button className="btn-search">Search</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12"></div>
        </div>
      </div>
    </>
  );
};

export default DraftJobs;

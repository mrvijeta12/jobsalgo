import React, { useContext, useEffect } from "react";
import AdminContext from "../Context/AdminContext.js";
import CardStat from "../Components/CardStat";
import { FaUser, FaBriefcase, FaFileAlt, FaUserTie } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const chartData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 500 },
  { name: "May", users: 900 },
  { name: "Jun", users: 400 },
  { name: "July", users: 600 },
  { name: "Aug", users: 800 },
  { name: "Sep", users: 500 },
  { name: "Oct", users: 900 },
  { name: "Nov", users: 500 },
  { name: "Dec", users: 900 },
];

const pieData = [
  { name: "Active", value: 400 },
  { name: "Inactive", value: 300 },
  { name: "Pending", value: 200 },
];
const COLORS = ["#AB274F", "#FBCEB1", "#9966CC"];

const Dashboard = () => {
  const { allJobs, empData } = useContext(AdminContext);

  return (
    <div className="dashboard container rounded  ">
      <div className="row  d-flex flex-column pt-3 pb-5">
        <div className="">
          <h4 className="mb-0 fw-bold mb-3"> Dashboard</h4>
          {/* <button className="btn btn-primary">Add New</button> */}
        </div>

        <div className="row g-4 mt-0">
          <div className="col-md-6 mb-4">
            <CardStat
              title="All recruiters"
              value={empData.length}
              icon={FaUserTie}
              style={{
                backgroundColor: "#79021c",
              }}
            />
          </div>{" "}
          <div className="col-md-6 mb-4">
            <CardStat
              title="Applications"
              value="4,512"
              icon={FaFileAlt}
              style={{
                backgroundColor: "#526a40",
              }}
            />
          </div>
          <div className="col-md-6 mb-4">
            <CardStat
              title="Users"
              value="1,240"
              icon={FaUser}
              style={{
                backgroundColor: "#008585",
              }}
            />
          </div>
          <div className="col-md-6 mb-4">
            <CardStat
              title="Job Posted"
              value={allJobs.length}
              icon={FaBriefcase}
              style={{
                backgroundColor: "#c7522a",
              }}
            />
          </div>
          {/* <div className="col-lg-4 mb-4">
            <CardStat title="Active jobs" value="225" icon={FaCheckCircle} />
          </div> */}
          {/* <div className="col-lg-4 mb-4">
            <CardStat title="Closed jobs" value="25" icon={FaTimesCircle} />
          </div> */}
        </div>
      </div>
      <div className="container py-4">
        <div className="row gx-4 gy-4">
          {/* ===== Left Column: Bar Chart ===== */}
          <div className="col-lg-7 mb-3" style={{ height: 500 }}>
            <div className="w-100 h-100 p-3 rounded shadow-sm bg-white">
              <h5 className="mb-3 text-black">Applications</h5>

              <div
                className="recharts-wrapper"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis
                      dataKey="name"
                      axisLine={{ stroke: "#333", strokeWidth: 1 }}
                      tickLine={false}
                      tick={{ fill: "#666", fontSize: 12 }}
                    />

                    {/* ✅ Y-Axis line visible */}
                    <YAxis
                      axisLine={{ stroke: "#333", strokeWidth: 1 }}
                      tickLine={false}
                      tick={{ fill: "#666", fontSize: 12 }}
                    />

                    {/* Tooltip with no hover background */}
                    <Tooltip cursor={{ fill: "transparent" }} />

                    <Legend />

                    {/* Bars */}
                    <Bar
                      dataKey="users"
                      fill="#16476A"
                      barSize={10}
                      radius={[6, 6, 0, 0]}
                      activeBar={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ===== Right Column: Pie Chart ===== */}
          <div
            className="col-lg-5 mb-3 d-flex flex-column align-items-center justify-content-start"
            style={{ height: 500 }}
          >
            <div className="h-100 w-100 shadow-sm rounded-lg p-3 bg-white  d-flex flex-column">
              {/* Title pinned to top */}
              <h5 className="text-black mb-3">Users</h5>

              {/* Chart area takes remaining space, centers the pie */}
              <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      labelLine={false}
                      // label={({ name, percent }) =>
                      //   `${name} ${(percent * 100).toFixed(0)}%`
                      // }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

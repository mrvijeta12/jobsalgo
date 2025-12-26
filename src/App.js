import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// CONTEXT PROVIDER
import AdminProvider from "./admin/Context/AdminProvider.js";
import FrontEndProvider from "./context/FrontEndProvider.js";

// THIRD PARTY
import Aos from "aos";
import "aos/dist/aos.css";

// GENERAL ROUTE
import PageNotFound from "./pages/PageNotFound.js";

// FRONTEND
import Home from "./pages/Home";
import About from "./pages/About";
import JobSingle from "./pages/JobDescription.js";
import PostJob from "./pages/PostJob";
import Services from "./pages/Services";
import ServiceSingle from "./pages/ServiceSingle";

import BlogSingle from "./pages/BlogSingle";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs.js";

// BACKEND ADMIN
import ProtectedRoute from "./admin/Routes/ProtectedRoute.js";
import AuthUser from "./admin/Pages/AuthUser.js";
import AdminLayout from "./admin/Layout/AdminLayout";
import Dashboard from "./admin/Pages/Dashboard";
import AddNewJob from "./admin/Pages/AddNewJob";
import DraftJobs from "./admin/Pages/DraftJobs";
import EditJob from "./admin/Pages/EditJob";
import Layout from "./components/Layout";
import AdminJobsListing from "./admin/Pages/AdminJobsListing.js";
import JobListings from "./pages/JobListings";
import EmployersList from "./admin/Pages/EmployersList.js";
import AddEmployer from "./admin/Pages/AddEmployer.js";
import EditEmployer from "./admin/Pages/EditEmployer.js";
import ScrollToTop from "./components/ScrollToTop.js";
import Check from "./pages/Check.js";
import Disclaimer from "./pages/Disclaimer.js";
import TermsAndConditions from "./pages/TermsAndConditions.js";
import PrivacyPolicy from "./pages/PrivacyPolicy.js";
import JobDescription from "./pages/JobDescription.js";
import UploadCV from "./admin/Pages/uploadCV.js";

function App() {
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 800,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* FRONTEND */}
        <Route
          path="/*"
          element={
            <FrontEndProvider>
              <FrontendRoutes />
            </FrontEndProvider>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <AdminRoutes />
            </AdminProvider>
          }
        />
      </Routes>
    </Router>
  );

  function FrontendRoutes() {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="job-listings" element={<JobListings />} />
          <Route path="job-description/:id" element={<JobDescription />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="services" element={<Services />} />
          <Route path="service-single" element={<ServiceSingle />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog-single" element={<BlogSingle />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="check" element={<Check />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="terms-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />

          {/* Optional: leave only one */}
          <Route path="jobs" element={<JobListings />} />
        </Route>

        {/* 404 for frontend */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  function AdminRoutes() {
    return (
      <Routes>
        <Route path="login" element={<AuthUser />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<AdminJobsListing />} />
          <Route path="addjob" element={<AddNewJob />} />
          <Route path="draft" element={<DraftJobs />} />
          <Route path="editjob" element={<EditJob />} />
          <Route path="employers" element={<EmployersList />} />
          <Route path="add-employer" element={<AddEmployer />} />
          <Route path="edit-employer" element={<EditEmployer />} />
          <Route path="cv" element={<UploadCV />} />
        </Route>

        {/* 404 for admin */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }
}

export default App;

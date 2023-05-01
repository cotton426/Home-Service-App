import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage.jsx";
import ServicesPage from "./ServicesPage.jsx";
import { NavbarLogout } from "../components/Navbar.jsx";
import AdminHomepage from "./AdminHome.jsx";
import { useAuth } from "../contexts/auth.jsx";
import ServiceDetail from "./ServiceDetail.jsx";
// import ProfilePage from "./pages/ProfilePage";

function AuthenticatedApp({ isAdmin }) {
  const dash = sessionStorage.getItem("dash");
  return isAdmin && dash ? (
    <AdminHomepage />
  ) : (
    <div>
      <NavbarLogout isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/service" element={<ServicesPage />} />
        <Route path="*" element={<Homepage />} />
        <Route path="/select-service/:service_id" element={<ServiceDetail />} />
        {/* <Route path="/profile" component={ProfilePage} /> */}
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage.jsx";
import ServicesPage from "./ServicesPage.jsx";
import { NavbarLogout } from "../components/Navbar.jsx";
import AdminHomepage from "./AdminHome.jsx";
import { useAuth } from "../contexts/auth.jsx";
import BookingForm from "./orderService.jsx";
import { CustomerServiceList } from "./CustomerServiceList.jsx";
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
        <Route path="/order-service" element={<BookingForm />} />
        <Route path="/user-orders-list" element={<CustomerServiceList />} />
        <Route path="*" element={<Homepage />} />
        {/* <Route path="/profile" component={ProfilePage} /> */}
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage.jsx";
import ServicesPage from "./ServicesPage.jsx";
import { NavbarLogout } from "../components/Navbar.jsx";
import AdminHomepage from "./AdminHome.jsx";
import { CategoryNavbar } from "../components/AdminNavbar.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import { AdminSidebar } from "../components/AdminSidebar.jsx";
import ServiceTable from "../components/ServicesTable.jsx";
import { AddCategory } from "../components/AdminCategory.jsx";
import { AddCategoryNavbar } from "../components/AdminNavbar.jsx";
// import ProfilePage from "./pages/ProfilePage";

function AuthenticatedApp({ isAdmin }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <NavbarLogout />
            <Homepage />
          </div>
        }
      />
      <Route
        path="/service"
        element={
          <div>
            <NavbarLogout />
            <ServicesPage />
          </div>
        }
      />
      {/* <Route path="*" element={<Homepage />} /> */}
      <Route
        path="/admin-dashboard"
        element={isAdmin ? <AdminHomepage /> : <Navigate to="/" />}
      />
      <Route path="/categories" element={<TableOfContents />} />
      <Route path="/services" element={<ServiceTable />} />
      <Route
        path="/add-category"
        element={
          <>
            <AddCategoryNavbar />
            <AddCategory />
          </>
        }
      />

      {/* <Route path="/profile" component={ProfilePage} /> */}
    </Routes>
  );
}

export default AuthenticatedApp;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ServicesPage from "./ServicesPage";
import { NavbarLogin } from "../components/Navbar";
function UnauthenticatedApp() {
  return (
    <div>
      <NavbarLogin />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;

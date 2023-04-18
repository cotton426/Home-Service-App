import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
// import ProfilePage from "./pages/ProfilePage";
import AdminHomepage from "./AdminHome";

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/profile" component={ProfilePage} /> */}
      <Route path="/admin" element={<AdminHomepage/>} />
    </Routes>
  );
}

export default UnauthenticatedApp;

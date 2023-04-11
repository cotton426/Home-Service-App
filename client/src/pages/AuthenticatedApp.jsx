import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage.jsx";
// import ProfilePage from "./pages/ProfilePage";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/profile" component={ProfilePage} /> */}
    </Routes>
  );
}

export default AuthenticatedApp;

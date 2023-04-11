import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Homepage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";
// import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/profile" component={ProfilePage} /> */}
    </Routes>
  );
}

export default App;

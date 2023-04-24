import React from "react";
import { useAuth } from "./contexts/auth";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import { NavbarLogin, NavbarLogout } from "./components/Navbar";
import AdminHomepage from "./pages/AdminHome";

function App() {
  const { user } = useAuth();

  // Check if user has 'admin' role
  const isAdmin = user?.data?.user?.role === "admin";

  return user ? (
    <div>
      {isAdmin ? (
        <AdminHomepage />
      ) : (
        <div>
          <NavbarLogout />
          <AuthenticatedApp />
        </div>
      )}
    </div>
  ) : (
    <div>
      <NavbarLogin />
      <UnauthenticatedApp />
    </div>
  );
}

export default App;

import { useAuth } from "./contexts/auth";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import { NavbarLogin, NavbarLogout } from "./components/Navbar";
import AdminHomepage from "./pages/AdminHome";

function App() {
  const { user } = useAuth();

  return user ? (
    <div>
      <NavbarLogout />
      <AuthenticatedApp />
    </div>
  ) : (
    <div>
      {/* <NavbarLogin /> */}
      {/* <UnauthenticatedApp /> */}
      <AdminHomepage />
    </div>
  );
}

export default App;

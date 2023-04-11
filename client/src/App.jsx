import { useAuth } from "./contexts/auth";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import { NavbarLogin, NavbarLogout } from "./components/Navbar";

function App() {
  const { user } = useAuth();

  return user ? (
    <div>
      <NavbarLogout />
      <AuthenticatedApp />
    </div>
  ) : (
    <div>
      <NavbarLogin />
      <UnauthenticatedApp />
    </div>
  );
}

export default App;

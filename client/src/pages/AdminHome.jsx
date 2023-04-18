import { AdminSidebar } from "../components/AdminSidebar";
import { AdminNavbar } from "../components/AdminNavbar";

const AdminHomepage = () => {
  return (
    <div id="screen" className="grid grid-cols-[240px,1fr] h-screen">
      <div id="left-container side-bar" className="bg-black h-full text-white">
        <AdminSidebar />
      </div>
      <div
        id="right-container nav-bar"
        className="bg-blue-900 h-full text-white"
      >
        <AdminNavbar />
      </div>
    </div>
  );
};

export default AdminHomepage;

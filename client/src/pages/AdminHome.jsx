import { AdminSidebar } from "../components/AdminSidebar";
import {
  AddServiceNavbar,
  ServiceNavbar,
  SubCategoryNavbar,
  SubServiceNavbar,
  EditSubCategoryNavbar,
} from "../components/AdminNavbar";

const AdminHomepage = () => {
  return (
    <div id="screen" className="grid grid-cols-[280px,1fr] h-screen">
      <div id="left-container side-bar" className="flex h-full text-black">
        <AdminSidebar />
      </div>
      <div id="right-container nav-bar" className="bg-BG h-full text-white">
        <EditSubCategoryNavbar />
      </div>
    </div>
  );
};

export default AdminHomepage;

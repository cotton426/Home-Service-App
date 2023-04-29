import { AdminSidebar } from "../components/AdminSidebar";
import { CategoryNavbar, ServiceNavbar } from "../components/AdminNavbar";
import { Routes, Route } from "react-router-dom";
import AddService from "../components/AddService";
import TableOfContents from "../components/TableOfContents";
import {
  AddCategory,
  EditCategory,
  ViewCategory,
} from "../components/AdminCategory";
import ServiceTable from "../components/ServicesTable";
import EditService from "../components/EditService";

const AdminHomepage = () => {
  return (
    <div id="screen" className="grid grid-cols-[280px,1fr] h-screen">
      <div id="left-container side-bar" className="flex h-full text-black">
        <AdminSidebar />
      </div>
      <div
        id="right-container nav-bar"
        className="bg-BG h-full w-full text-white"
      >
        <Routes>
          <Route
            path="/categories"
            element={
              <>
                <CategoryNavbar />
                <TableOfContents />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <ServiceNavbar />
                <ServiceTable />
              </>
            }
          />
          <Route
            path="/add-category"
            element={
              <>
                <AddCategory />
              </>
            }
          />
          <Route
            path="/add-service"
            element={
              <>
                <AddService />
              </>
            }
          />
          <Route
            path="/edit-category/:category_id"
            element={
              <>
                <EditCategory />
              </>
            }
          />
          <Route
            path="/edit-service/:service_id"
            element={
              <>
                <EditService />
              </>
            }
          />
          <Route
            path="/view-category/:category_id"
            element={
              <>
                <ViewCategory />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHomepage;

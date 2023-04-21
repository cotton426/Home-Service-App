import { AdminSidebar } from "../components/AdminSidebar";
import {
  CategoryNavbar,
  ServiceNavbar,
  SubCategoryNavbar,
  AddCategoryNavbar,
  AddServiceNavbar,
  SubServiceNavbar,
  EditSubCategoryNavbar,
} from "../components/AdminNavbar";
import { Routes, Route } from "react-router-dom";
import AddService from "../components/AddService";
import TableOfContents from "../components/TableOfContents";
import { AddCategory,SubCategory,EditSubCategory } from "../components/AdminCategory";

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
                <AddService />
              </>
            }
          />
          <Route
            path="/add-category"
            element={
              <>
                <AddCategoryNavbar />
                <AddCategory />
              </>
            }
          />
          <Route
            path="/sub-category"
            element={
              <>
                <SubCategoryNavbar />
                <SubCategory />
              </>
            }
          />
          <Route
            path="/edit-category"
            element={
              <>
                <EditSubCategoryNavbar />
                <EditSubCategory />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHomepage;

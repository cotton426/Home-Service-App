import { AdminSidebar } from "../components/AdminSidebar";
import {
  CategoryNavbar,
  ServiceNavbar,
  DetailPromotionNavbar,
} from "../components/AdminNavbar";
import { Routes, Route } from "react-router-dom";
import AddService from "../components/AddService";
import TableOfContents from "../components/TableOfContents";
import {
  AddCategory,
  EditCategory,
  ViewCategory,
} from "../components/AdminCategory";
import ServiceTable from "../components/ServicesTable";
import EditService, { ViewService } from "../components/EditService";
// import ViewService from "../components/ViewService";
import AddOnList from "../components/AddOnList";
import { AddPromotion } from "../components/PromotionAdd";
import { EditPromotion } from "../components/PromotionEdit";
import PromotionTable from "../components/PromotionTable";
import ViewPromotionCode from "../components/ViewPromotionCode";

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
          <Route path="/promotions" element={<PromotionTable />} />
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
                {/* <DetailService/> */}
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
          <Route
            path="/view-service/:service_id"
            element={
              <>
                <ViewService />
              </>
            }
          />
          <Route
            path="/add-promotion"
            element={
              <>
                <AddPromotion />
              </>
            }
          />
          <Route
            path="/edit-promotion/:promotion_id"
            element={
              <>
                <EditPromotion />
              </>
            }
          />
          <Route
            path="/view-promotion/:promotion_id"
            element={
              <>
                <DetailPromotionNavbar />
                <ViewPromotionCode />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHomepage;

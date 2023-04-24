import React from "react";
import { Link } from "react-router-dom";
import logoHomeService from "/icons/logoHomeService.png";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineDocumentDuplicate, HiOutlineTicket } from "react-icons/hi";
import { useAuth } from "../contexts/auth";

const SidebarItem = ({ to, icon: Icon, text }) => {
  return (
    <div className="hover:bg-blue-900">
      <Link
        to={to}
        className="flex items-center py-5 px-7 w-full cursor-pointer justify-start"
      >
        <Icon className="text-xl" />
        <span className="ml-2">{text}</span>
      </Link>
    </div>
  );
};

export const AdminSidebar = () => {
  const { logout, setDash } = useAuth();
  return (
    <div className="fixed flex flex-col h-screen pb-16 w-[280px] bg-blue-950 text-white">
      <div className="flex flex-col flex-grow justify-between">
        <div id="top">
          <div id="button-app-logo" className="pt-8 pb-11 px-7">
            <Link
              to="/"
              onClick={()=> setDash(false)}
              className="flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600 hover:text-blue-800 hover:bg-white cursor-pointer w-[100%] h-[46px]"
            >
              <img
                className="w-[32px] h-[32px]"
                src={logoHomeService}
                alt="HomeServices Logo"
              />
              <span className="ml-2 font-medium text-xl">HomeService</span>
            </Link>
          </div>
          <div>
            <SidebarItem to="/categories" icon={TbCategory2} text="หมวดหมู่" />
            <SidebarItem
              to="/services"
              icon={HiOutlineDocumentDuplicate}
              text="บริการ"
            />
            <SidebarItem
              to="/serviceforbee"
              icon={HiOutlineTicket}
              text="Promotion Code"
            />
          </div>
        </div>
        <div id="bottom" className="hover:bg-blue-900">
          <div
            className="flex items-center py-5 px-7 w-full cursor-pointer justify-start"
            onClick={() => {
              logout();
              localStorage.removeItem("userData");
            }}
          >
            <HiOutlineLogout className="text-xl" />
            <span className="ml-2">ออกจากระบบ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

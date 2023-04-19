import React from "react";
import { Link } from "react-router-dom";
import logoHomeService from "/icons/logoHomeService.png";
import {TbCategory2} from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import {HiOutlineDocumentDuplicate,HiOutlineTicket} from "react-icons/hi";

export const AdminSidebar = () => {
  return (
    <div className="flex flex-col h-screen  pb-16 w-[100%] bg-blue-950 text-white">
      <div className="flex flex-col flex-grow justify-between">
        <div id="top">
          <div id="button-app-logo" className="pt-8 pb-11 px-7">
            <Link
              to="/service"
              className="flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600 hover:text-blue-800 hover:bg-white cursor-pointer w-[100%] h-[46px] "
            >
              <img
                className="w-[32px] h-[32px]"
                src={logoHomeService}
                alt="HomeServices Logo"
              />
              <span className="ml-2 font-medium text-xl ">
                HomeService
              </span>
            </Link>
          </div>
          <div>
            <div id="list-1" className="hover:bg-blue-900">
              <Link
                to="/service"
                className="flex items-center py-5 px-7 w-full cursor-pointer justify-start"
              >
                <TbCategory2 className="text-xl" />
                <span className="ml-2">หมวดหมู่</span>
              </Link>
            </div>

            <div id="list-2" className="hover:bg-blue-900">
              <Link
                to="/service"
                className="flex items-center py-5 px-7 w-full cursor-pointer justify-start"
              >
                <HiOutlineDocumentDuplicate className="text-xl" />
                <span className="ml-2">บริการ</span>
              </Link>
            </div>

            <div id="list-3" className="hover:bg-blue-900">
              <Link
                to="/service"
                className="flex items-center py-5 px-7 w-full cursor-pointer justify-start"
              >
                <HiOutlineTicket className="text-xl" />
                <span className="ml-2">Promotion Code</span>
              </Link>
            </div>
          </div>
        </div>
        <div id="bottom" className="hover:bg-blue-900">
          <div className="flex items-center py-5 px-7 w-full cursor-pointer justify-start">
            <HiOutlineLogout className="text-xl" />
            <span className="ml-2">ออกจากระบบ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

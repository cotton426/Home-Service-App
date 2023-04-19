import React from "react";
import {GoSearch} from "react-icons/go";


export const AdminNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div className="font-medium text-xl text-black">บริการ</div>

          <div className="flex items-center ">
            <div className="flex flex-row items-center border border-gray-300 px-2 rounded-xl ">
              <GoSearch className="h-5 w-5 text-gray-500 ml-2" />

              <input
                type="text"
                placeholder="ค้นหาบริการ..."
                className=" text-black focus:outline-none  ml-2 px-1 py-2 rounded border-none"
              />
            </div>

            <div className="pl-12">
              <button className="btn-primary">เพิ่มบริการ +</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

// navbar for "หมวดหมู่"
export const CategoryNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div id="left-container" className="font-medium text-xl text-black">
            หมวดหมู่
          </div>

          <div className="flex items-center ">
            <div className="flex flex-row items-center border border-gray-300 px-2 rounded-xl ">
              <GoSearch className="h-5 w-5 text-gray-500 ml-2" />

              <input
                type="text"
                placeholder="ค้นหาบริการ..."
                className=" text-black focus:outline-none  ml-2 px-1 py-2 rounded border-none"
              />
            </div>

            <div className="pl-6">
              <button className="btn-primary">เพิ่มบริการ +</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// navbar for "บริการ"
export const ServiceNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div id="left-container" className="font-medium text-xl text-black">
            บริการ
          </div>

          <div className="flex items-center ">
            <div className="flex flex-row items-center border border-gray-300 px-2 rounded-xl ">
              <GoSearch className="h-5 w-5 text-gray-500 ml-2" />

              <input
                type="text"
                placeholder="ค้นหาบริการ..."
                className=" text-black focus:outline-none  ml-2 px-1 py-2 rounded border-none"
              />
            </div>

            <div className="pl-6">
              <button className="btn-primary">เพิ่มบริการ +</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// navbar for "เพิ่มหมวดหมู่"
export const AddCategoryNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div id="left-container" className="font-medium text-xl text-black">
            เพิ่มหมวดหมู่
          </div>

          <div className="flex items-center ">
            <div>
              <button className="btn-primary">ยกเลิก</button>
            </div>

            <div className="pl-6">
              <button className="btn-primary">ยืนยัน</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// navbar for "เพิ่มบริการ"
export const AddServiceNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div id="left-container" className="font-medium text-xl text-black">
            เพิ่มบริการ
          </div>

          <div className="flex items-center ">
            <div>
              <button className="btn-primary">ยกเลิก</button>
            </div>

            <div className="pl-6">
              <button className="btn-primary">ยืนยัน</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// navbar for "หมวดหมู่ย่อย"
export const SubCategoryNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div className="flex flex-row">
            <Link to="/service">
              <IoIosArrowBack className="w-10 h-10 text-gray-700 mr-3" />
            </Link>
            <div className="flex flex-col ">
              <span className="text-gray-700 font-normal text-xs">
                หมวดหมู่
              </span>
              <div
                id="left-container"
                className="font-medium text-xl text-black"
              >
                หมวดหมู่ย่อย
              </div>
            </div>
          </div>

          <div className="flex items-center ">
            <div>
              <button className="btn-primary">ยกเลิก</button>
            </div>

            <div className="pl-6">
              <button className="btn-primary">ยืนยัน</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// navbar for "บริการย่อย"
export const SubServiceNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div className="flex flex-row">
            <Link to="/service">
              <IoIosArrowBack className="w-10 h-10 text-gray-700 mr-3" />
            </Link>
            <div className="flex flex-col ">
              <span className="text-gray-700 font-normal text-xs">
                บริการ
              </span>
              <div
                id="left-container"
                className="font-medium text-xl text-black"
              >
                บริการย่อย
              </div>
            </div>
          </div>

          <div className="flex items-center ">
            <div>
              <button className="btn-primary">ยกเลิก</button>
            </div>

            <div className="pl-6">
              <button className="btn-primary">ยืนยัน</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// navbar for "แก้ไขหมวดหมู่ย่อย" 
export const EditSubCategoryNavbar = () => {
  return (
    <>
      <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
        <div className="flex flex-row">
            <Link to="/service">
              <IoIosArrowBack className="w-10 h-10 text-gray-700 mr-3" />
            </Link>
            <div className="flex flex-col ">
              <span className="text-gray-700 font-normal text-xs">
                หมวดหมู่
              </span>
              <div
                id="left-container"
                className="font-medium text-xl text-black"
              >
                แก้ไขหมวดหมู่ย่อย
              </div>
            </div>
          </div>

          <div className="flex items-center ">
            <div className="pl-6">
              <button className="btn-primary">แก้ไข</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

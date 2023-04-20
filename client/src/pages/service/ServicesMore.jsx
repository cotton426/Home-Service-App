import Footer from "../../components/Footer";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useState } from "react";
import ServiceList from "../../components/ServiceList";

export const HeaderService = () => {
  return (
    <header>
      <img
        src="public\images\banner.png"
        alt="My service"
        className=" w-screen"
      />
    </header>
  );
};

export const Footerservice = () => {
  return (
    <footer className="h-[613px] w-screen">
      <div className="flex flex-col">
        <div className="flex bg-blue-600 h-[378px] relative justify-center items-center ">
          <h1 className="text-white text-[22px] text-center text-xl font-normal flex flex-col gap-1.5">
            เพราะเราคือช่าง ผู้ให้บริการเรื่องบ้านอันดับ 1 แบบครบวงจร
            โดยทีมช่างมืออาชีพมากกว่า 100 ทีม
            <h1>สามารถตอบโจทย์ด้านการบริการเรื่องบ้านของคุณ และสร้าง</h1>
            <h1>
              ความสะดวกสบายในการติดต่อกับทีมช่าง ได้ทุกที่ ทุกเวลา ตลอด 24 ชม.
            </h1>
            <h1>มั่นใจ ช่างไม่ทิ้งงาน พร้อมรับประกันคุณภาพงาน</h1>
          </h1>
          <img
            src="\images\house.png"
            alt="home"
            className="absolute right-0 bottom-0 "
          />
        </div>
        <Footer />
      </div>
    </footer>
  );
};

export const NavService = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="bg-white py-4 w-screen h-[80px]">
      <div className="w-[80%] mx-auto flex items-center">
        <div className="w-[350px] flex items-center border rounded-lg overflow-hidden">
          <div className="flex-shrink-0 px-4 py-2">
            <BsSearch className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="px-4 py-2 w-[350px] text-gray-700 focus:outline-none"
            type="text"
            placeholder="ค้นหาบริการ..."
          />
        </div>
        <div className="inline-block relative mx-4  outline-none">
          <label htmlFor="category" className="text-gray-700 font-normal">
            หมวดหมู่บริการ
          </label>
          <div className="relative">
            <select
              id="category"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled selected hidden>
                บริการทั้งหมด
              </option>
              <option>บริการทั่วไป</option>
              <option>บริการห้องครัว</option>
              <option>บริการห้องน้ำ</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
        <div className="inline-block relative mx-4 outline-none">
          <label htmlFor="price" className="text-gray-700 font-normal">
            ราคา
          </label>
          <div className="relative">
            <div
              className="w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onClick={toggleDropdown}
            >
              <div className="flex justify-between items-center">
                <span>{dropdownVisible ? "ราคา" : "ราคา"}</span>
                <button
                  className="flex items-center px-2  text-gray-700 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                    <IoMdArrowDropdown />
                  </div>
                  {dropdownVisible && (
                    <div className="absolute z-10 w-full bottom-[-20px] left-0 bg-white h-full mt-[200px]">
                      <input
                        type="range"
                        id="price"
                        className="block w-full h-2 bg-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
                        min="0"
                        max="2000"
                      />
                      <div className="absolute right-0 -mr-1 ">
                        <span className="text-sm text-blue-700">2000</span>
                      </div>
                      <div className="absolute left-0 -ml-1">
                        <span className="text-sm text-blue-700">0</span>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-block relative mx-4  outline-none">
          <label htmlFor="sort-by" className="text-gray-700 font-normal">
            เรียงตาม
          </label>
          <div className="relative">
            <select
              id="sort-by"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled selected hidden>
                ตามราคา
              </option>
              <option>บริการแนะนำ</option>
              <option>บริการยอดนิยม</option>
              <option>บริการราคาน้อยไปมาก</option>
              <option>บริการราคามากไปน้อย</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
        <button className="btn-primary font-medium">ค้นหา</button>
      </div>
    </nav>
  );
};

export default ServiceList;

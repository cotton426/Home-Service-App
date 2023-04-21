import Footer from "../../components/Footer";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useState } from "react";

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
            <p>สามารถตอบโจทย์ด้านการบริการเรื่องบ้านของคุณ และสร้าง</p>
            <p>
              ความสะดวกสบายในการติดต่อกับทีมช่าง ได้ทุกที่ ทุกเวลา ตลอด 24 ชม.
            </p>
            <p>มั่นใจ ช่างไม่ทิ้งงาน พร้อมรับประกันคุณภาพงาน</p>
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
  const [valueLeft, setValueLeft] = useState("0");
  const [valueRight, setValueRight] = useState("0");

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSliderChangeLeft = (event) => {
    setValueLeft(event.target.value);
  };
  const handleSliderChangeRight = (event) => {
    setValueRight(event.target.value);
  };

  return (
    <nav className="bg-white py-4 px-[10%] w-screen h-[80px] shadow mb-20">
      <div className="flex w-full justify-center">
        <div className="w-full flex justify-between ">
          <div>
            <div className="w-[350px] flex items-center border rounded-lg overflow-hidden border-gray-300">
              <div className="flex-shrink-0 px-4 py-2">
                <BsSearch className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="px-4 py-2 w-[350px] text-gray-300 focus:outline-none"
                type="text"
                placeholder="ค้นหาบริการ..."
              />
            </div>
          </div>
          <div className="bg-white mr-10 mb-5">
            <div className="inline-block relative mr-10 outline-none border-right w-[200px]">
              <label
                htmlFor="category"
                className="text-gray-700 font-normal text-xs"
              >
                หมวดหมู่บริการ
              </label>
              <div className="relative">
                <select
                  id="category"
                  defaultValue=""
                  className=" block font-medium appearance-none w-full border-none px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled hidden>
                    บริการทั้งหมด
                  </option>
                  <option>บริการทั้งหมด</option>
                  <option>บริการทั่วไป</option>
                  <option>บริการห้องครัว</option>
                  <option>บริการห้องน้ำ</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center px-2 text-gray-700">
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>
            <div className="inline-block relative mr-10 outline-none border-right w-[200px]">
              <label
                htmlFor="price"
                className="text-gray-700 font-normal text-xs"
              >
                ราคา
              </label>
              <div className="relative">
                <div
                  className="w-full  border-none border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:shadow-outline"
                  onClick={toggleDropdown}
                >
                  <div className="flex justify-between items-center font-medium">
                    <span>{dropdownVisible ? valueLeft : valueLeft}</span>-
                    <span>{dropdownVisible ? valueRight : valueRight}</span>
                    <button
                      className="flex items-center px-2  text-gray-700 cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <div className="pointer-events-none absolute inset-y-0 right-[20px] flex items-center px-2 text-gray-700">
                        <IoMdArrowDropdown />
                      </div>
                      {dropdownVisible && (
                        <div className="absolute z-10 w-full bottom-[-35px] bg-white left-0  h-full mt-[200px]">
                          <input
                            type="Range"
                            className="absolute z-20 left-0 block w-full h-2appearance-none bg-blue-500 rounded-full  focus:outline-none focus:ring-10 focus:ring-offset-2 focus:ring-blue-500 "
                            min="0"
                            max="3000"
                            value={valueLeft}
                            onChange={handleSliderChangeLeft}
                          />
                          <input
                            type="range"
                            className="absolute right-0 w-full h-2 appearance-none bg-blue-500 rounded-full focus:outline-none focus:ring-10 focus:ring-offset-2 focus:ring-blue-500"
                            value={valueRight}
                            onChange={handleSliderChangeRight}
                            min="0"
                            max="3000"
                          />
                          <div className="absolute right-0 -mr-1 mt-2">
                            <span className="text-sm text-blue-700">3000</span>
                          </div>
                          <div className="absolute left-0 -ml-1 mt-2">
                            <span className="text-sm text-blue-700">0</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block relative mr-[-25px] outline-none">
              <label
                htmlFor="sort-by"
                className="text-gray-700 font-normal text-xs"
              >
                เรียงตาม
              </label>
              <div className="relative">
                <select
                  id="sort-by"
                  defaultValue=""
                  className="block font-medium appearance-none w-full border-none border-gray-400 hover:border-gray-500 px-4 py-2  rounded leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled selected hidden>
                    ตามราคา (Ascending)
                  </option>
                  <option>บริการแนะนำ</option>
                  <option>บริการยอดนิยม</option>
                  <option>บริการราคาน้อยไปมาก</option>
                  <option>บริการราคามากไปน้อย</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center ml-2 text-gray-700">
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>
          </div>
          <button className="btn-primary font-medium w-[100px] h-[45px] mt-2 ml-2 ">
            ค้นหา
          </button>
        </div>
      </div>
    </nav>
  );
};

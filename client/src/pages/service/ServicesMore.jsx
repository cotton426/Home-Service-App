import Footer from "../../components/Footer";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import useData from "../../hooks/useData";
import useUser from "../../hooks/useUser";
import ServiceMore from "./ServiceCard";

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
    <footer className="h-[613px] w-screen gray-50 ">
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

export const NavService = ({ filter, setFilter }) => {
  const { items: list, getCategories } = useData();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [valueLeft, setvalueLeft] = useState("0");
  const [valueRight, setvalueRight] = useState("0");
  const { userGetServices, items } = useUser();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // const handleSliderChangeLeft = (event) => {
  //   setValueLeft(event.target.value);
  // };
  // const handleSliderChangeRight = (event) => {
  //   setValueRight(event.target.value);
  // };

  // const handleSelection = (item) => {
  //   // setSelect(item)
  //   const { category_id } = items.filter((x) => x.name === item)[0];
  // };

  // const getCategoryName = (categoryId) => {
  //   const category = items.find((item) => item.category_id === categoryId);
  //   return category ? category.name : "";
  // };

  useEffect(() => {
    getCategories();
    userGetServices({
      search: "",
    });
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          search: "",
          category_id: "",
          minPrice: "0",
          maxPrice: "0",
          sortBy: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          userGetServices(values);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <nav className="bg-white py-4 px-[10%] w-screen h-[80px] shadow ">
            <Form>
              <div className="flex w-full justify-center">
                <div className="w-full flex justify-between ">
                  <div>
                    <div className="w-[350px] flex items-center border rounded-lg overflow-hidden border-gray-300">
                      <div className="flex-shrink-0 px-4 py-2">
                        <BsSearch className="h-5 w-5 text-gray-500" />
                      </div>
                      <Field
                        className="px-4 py-2 w-[350px] focus:outline-none"
                        type="text"
                        name="search"
                        placeholder="ค้นหาบริการ..."
                      />
                    </div>
                  </div>
                  {/* <div className="bg-white mr-10 mb-5 flex">
                    <div className="inline-block relative mr-10 outline-none border-right w-[200px]">
                      <label
                        htmlFor="category_id"
                        className="text-gray-700 font-normal text-xs"
                      >
                        หมวดหมู่บริการ
                      </label>
                      <div className="relative">
                        <select
                          name="category_id"
                          id="category_id"
                          className="block appearance-none input-default w-[450px] bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(event) =>
                            setFieldValue("category_id", event.target.value)
                          }
                          value={values.category_id}
                        >
                          <option value="">บริการทั้งหมด</option>
                          {list.map((item, index) => {
                            return (
                              <option key={index} value={item.category_id}>
                                {item.name}
                              </option>
                            );
                          })}
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
                            <span>
                              {dropdownVisible ? valueLeft : valueLeft}
                            </span>
                            -
                            <span>
                              {dropdownVisible ? valueRight : valueRight}
                            </span>
                            <button
                              className="flex items-center px-2  text-gray-700 cursor-pointer"
                              onClick={toggleDropdown}
                            >
                              <div className="pointer-events-none absolute inset-y-0 right-[20px] flex items-center px-2 text-gray-700">
                                <IoMdArrowDropdown />
                              </div>
                              {dropdownVisible && (
                                <div className="absolute z-10 w-full bottom-[-35px] bg-white left-0  h-full mt-[200px]">
                                  <label
                                    htmlFor="price"
                                    className="text-gray-700 font-normal text-xs"
                                  >
                                    0-3000฿
                                  </label>
                                  <input
                                    type="Range"
                                    name="priceLeft"
                                    className="absolute z-20 left-0 block w-full h-2 bg-blue-500 rounded-full  focus:outline-none focus:ring-10 focus:ring-offset-2 focus:ring-blue-500 "
                                    min="0"
                                    max="3000"
                                    value={values.priceLeft}
                                    onChange={handleChange}
                                  />
                                  <input
                                    type="range"
                                    name="priceRight"
                                    className="absolute right-0 w-full h-2  bg-blue-500 rounded-full focus:outline-none focus:ring-10 focus:ring-offset-2 focus:ring-blue-500 transform rotate-180"
                                    value={values.priceRight}
                                    onChange={handleChange}
                                    min="0"
                                    max="3000"
                                  />
                                  <div className="absolute right-0 -mr-1 mt-2">
                                    <span className="text-sm text-blue-700">
                                      3000
                                    </span>
                                  </div>
                                  <div className="absolute left-0 -ml-1 mt-2">
                                    <span className="text-sm text-blue-700">
                                      0
                                    </span>
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
                          name="sortBy"
                          value={values.sortBy}
                          onChange={handleChange}
                          className="block font-medium appearance-none w-full border-none border-gray-400 hover:border-gray-500 px-4 py-2  rounded leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="" disabled hidden>
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
                  </div> */}
                  <button
                    className="btn-primary font-medium w-[100px] h-[45px] mt-2 ml-2"
                    type="submit"
                  >
                    ค้นหา
                  </button>
                </div>
              </div>
            </Form>
          </nav>
        )}
      </Formik>
      <ServiceMore items={items} />
    </>
  );
};

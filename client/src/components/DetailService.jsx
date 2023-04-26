import React from "react";
import { EditSubCategoryNavbar } from "./AdminNavbar";

function DetailService() {
  const subServiceName = [
    {
      subServiceName: "9,000 - 18,000 BTU, แบบติดผนัง",
      serviceCharge: "800.20",
      serviceUnit: "เครื่อง",
    },
    {
      subServiceName: "9,000 - 18,000 BTU, แบบติดผนัง",
      serviceCharge: "800.20",
      serviceUnit: "เครื่อง",
    },
    {
      subServiceName: "9,000 - 18,000 BTU, แบบติดผนัง",
      serviceCharge: "800.20",
      serviceUnit: "เครื่อง",
    },
  ];
  return (
    <>
      <EditSubCategoryNavbar />
      <div className=" bg-BG h-full w-full p-[5%]">
        <div className="flex flex-col justify-start border border-gray-300 rounded-lg bg-white w-full">
          <div className="ml-5 mr-5 flex flex-col justify-center">
            <div className="h-[450px] flex flex-col justify-start items-start mt-6">
              <div className=" flex flex-row justify-center items-center space-x-40 ">
                <label className="w-[100px] text-gray-700 p-0">
                  ชื่อบริการ
                  <label className="text-red">*</label>
                </label>
                <div className="w-[450px] text-gray-950">ล้างแอร์</div>
              </div>

              <div className=" flex flex-row justify-center items-center space-x-40  mt-10">
                <label className="w-[100px] text-gray-700 p-0">
                  หมวดหมู่
                  <label className="text-red">*</label>
                </label>
                <div className="w-[450px] text-gray-950">บริการทั่วไป</div>
              </div>

              <div>
                <div className="flex flex-row justify-center space-x-40 mt-10 text-gray-700">
                  <label
                    htmlFor="image"
                    className="w-[100px] text-gray-700 p-0"
                  >
                    รูปภาพ
                    <label className="text-red">*</label>
                  </label>
                  <div className="flex flex-col justify-start items-start  border-gray-300 rounded h-[200px] w-[450px] p-0">
                    <img className="rounded-lg" src="/images/air.png" />
                  </div>
                </div>
              </div>
              <div className="w-full mt-10 border-b-2 border-gray-300"></div>
            </div>

            <div className="mt-3">
              <h1 className="text-gray-700 text-base font-medium">
                รายการบริการย่อย
              </h1>

              <div className="flex flex-col justify-start items-start mt-6 gap-5 text-gray-950 w-full ">
                {subServiceName.map((item, index) => {
                  return (
                    <div className="flex flex-row justify-start items-center gap-5 w-full ">
                      <div className="flex flex-col ">
                        <label className="text-gray-700">ชื่อรายการ</label>
                        <div className=" w-72">{item.subServiceName}</div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700">หน่วยการบริการ</label>
                        <div className=" w-72">{item.serviceUnit}</div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700">
                          ค่าบริการ / 1 หน่วย
                        </label>
                        <div className="">{item.serviceCharge}</div>
                      </div>
                    </div>
                  );
                })}
                <div className="w-full mt-10 border-b-2 border-gray-300"></div>
                <div className="flex flex-row items-center w-full pb-3 mt-10">
                  <div className="flex w-[180px]  text-gray-700">
                    สร้างเมื่อ
                  </div>
                  <div className="pl-[120px] w-full">
                    <div className="py-2 w-[433px] h-[44px] px-2">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center w-full mb-5">
                  <div className="flex w-[180px]  text-gray-700">
                    แก้ไขล่าสุด
                  </div>
                  <div className="pl-[120px] w-full">
                    <div className="py-2 w-[433px] h-[44px] px-2">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailService;

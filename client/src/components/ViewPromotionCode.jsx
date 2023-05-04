import React from "react";
import { formatTime } from "../utils/timeUtils";

function ViewPromotionCode() {
  const viewPromoList = [
    {
      name: "Promotion Code",
      value: "HOME0202",
    },
    {
      name: "ประเภท",
      value: "Fixed",
    },
    {
      name: "ราคาที่ลด",
      value: "-50.00฿",
    },
    {
      name: "โควต้าการใช้",
      value: "10/100 ครั้ง",
    },
    {
      name: "วันหมดอายุ",
      value: "12/06/2022 10:30PM",
    },
  ];


  // const {  } = useData();

  return (
    <div className=" w-full flex flex-col justify-center items-center p-10">
      <div className=" w-3/5 box flex flex-col justify-center items-start p-10">
        <div className="flex flex-col justify-center items-start gap-8">
          {viewPromoList.map((item, index) => {
            return (
              <div key={index} className="flex flex-row ">
                <h2 className="w-[250px] text-gray-700">{item.name}</h2>
                <p className="text-black">{item.value}</p>
              </div>
            );
          })}
        </div>
        <div className="w-full mt-10 border-b-[1px] border-gray-300"></div>
        <div className="flex flex-row items-center w-full pb-3 mt-10 text-gray-700">
          <div className="flex w-[180px]">สร้างเมื่อ</div>
          <div className="pl-[120px] w-full">
            <div className="py-2 w-[250px] h-[44px] px-2">
              {/* {formatTime(itemObjects.created_at)} */}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-full mb-5 text-gray-700">
          <div className="flex w-[180px] ">แก้ไขล่าสุด</div>
          <div className="pl-[120px] w-full">
            <div className="py-2 w-[250px] h-[44px] px-2">
              {/* {formatTime(itemObjects.updated_at)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPromotionCode;

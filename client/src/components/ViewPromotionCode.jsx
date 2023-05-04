import React from "react";
import { formatTime } from "../utils/timeUtils";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewPromotionCode() {

  const { getPromotion,items,itemObjects,getPromotions} = useData();

  const param = useParams();
 
  useEffect(() => {
    getPromotions(param.id);
  }, []);
  

  console.log(items);
  console.log(itemObjects);

  // const viewPromoList = [
  //   {
  //     name: "Promotion Code",
  //     value: "h"
  //   },
  //   {
  //     name: "ประเภท",
  //     value: items.type,
  //   },
  //   {
  //     name: "ราคาที่ลด",
  //     value: items.discount,
  //   },
  //   {
  //     name: "โควต้าการใช้",
  //     value: items.useable_quantity,
  //   },
  //   {
  //     name: "วันหมดอายุ",
  //     value: items.exp_date,
  //   },
  // ];


  return (
    <div className=" bg-BG h-full w-full p-[5%] flex flex-col justify-center items-center ">
      <div className=" box w-full flex flex-col justify-center items-start p-10">
        <div className="flex flex-col justify-center items-start gap-9">
          {items.map((item, index) => {
            return (
              <div key={index} className="flex flex-row ">
                <h2 className="w-[250px] text-gray-700">{item.id}</h2>
                <p className="text-black">{item.promotion_code}</p>
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

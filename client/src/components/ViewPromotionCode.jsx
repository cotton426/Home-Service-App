import React from "react";
import { formatTime } from "../utils/timeUtils";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewPromotionCode() {
  const { promotion_id } = useParams();
  console.log("promotion_id:", promotion_id);

  const [promotion, setPromotion] = useState(null);
  const { getPromotion } = useData();

  useEffect(() => {
    (async () => {
      const promotionData = await getPromotion(promotion_id);
      setPromotion(promotionData);
    })();
  }, [promotion_id]);
  console.log(promotion);

  return (
    <div className=" bg-BG h-full w-full px-[5%] flex flex-col justify-start items-center mt-10">
      <div className=" box w-full flex flex-col justify-center items-start p-10">
        <div className="flex flex-col justify-center items-start gap-9">
          <div className="flex flex-row ">
            <h2 className="w-[250px] text-gray-700">Promotion Code</h2>
            <p className="text-black">{promotion?.promotion_code}</p>
          </div>
          <div className="flex flex-row ">
            <h2 className="w-[250px] text-gray-700">ประเภท</h2>
            <p className="text-black">{promotion?.type}</p>
          </div>
          <div className="flex flex-row ">
            <h2 className="w-[250px] text-gray-700">ราคาที่ลด</h2>
            <p className="text-red">-{promotion?.discount}฿</p>
          </div>
          <div className="flex flex-row ">
            <h2 className="w-[250px] text-gray-700">โควต้าการใช้</h2>
            <p className="text-black">{promotion?.quantity_used}/{promotion?.useable_quantity}</p>
          </div>
          <div className="flex flex-row ">
            <h2 className="w-[250px] text-gray-700">วันหมดอายุ</h2>
            <p className="text-black">{promotion?.exp_date}</p>
          </div>

        </div>
        <div className="w-full mt-10 border-b-[1px] border-gray-300"></div>
        <div className="flex flex-row items-center w-full pb-3 mt-10 text-gray-700">
          <div className="flex w-[180px]">สร้างเมื่อ</div>
          <div className="pl-[100px] w-full">
            <div className="py-2 w-[250px] h-[44px] ">
              {formatTime(promotion?.created_at)}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-full mb-5 text-gray-700">
          <div className="flex w-[180px] ">แก้ไขล่าสุด</div>
          <div className="pl-[100px] w-full">
            <div className="py-2 w-[250px] h-[44px] ">
              {formatTime(promotion?.updated_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPromotionCode;

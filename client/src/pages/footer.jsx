import React from "react";

const Footer = () => {
  return (
    <footer className="h-[613px] w-screen">
      <div className="bg-blue-600 h-[378px] relative">
        <div className="flex flex-row gap-28 ">
          <img
            src="/image/part-male-construction-worker_329181-3734 1.png"
            alt="engineer"
          />
          <div className="flex-col mt-12">
            <h1 className="text-white text-[40px] font-bold">
              มาร่วมเป็นพนักงานซ่อม
              <br />
              กับ HomeServices
            </h1>
            <br />
            <h6 className="text-white text-[20px]">
              เข้ารับการฝึกอบรบได้มาตรฐาน ฟรี! <br />
              และยังได้รับค่าตอบแทนที่มากขึ้นกว่าเดิม
            </h6>
            <br />
            <h2 className="text-white text-[32px] font-bold">
              ติดต่อมาที่อีเมล: job@homeservices.co
            </h2>
          </div>
          <img
            src="\image\house 1.png"
            alt="home"
            className="absolute right-0 bottom-0 "
          />
        </div>
      </div>

      <div className="h-[193px] flex items-center">
        <div className="flex flex-row gap-56 ml-10">
          <div className="flex flex-row gap-3">
            <img
              src="\image\houseicon.png"
              alt="home-icon"
              className="w-[39.11px] h-[39.11px]"
            />
            <span className="text-blue-600 text-[29.33px] font-bold ">
              HomeServices
            </span>
          </div>
          <div>
            <h1 className="font-bold text-gray-950 text-[18px]">
              บริษัท โฮมเซอร์วิสจำกัด
            </h1>
            <h1 className=" text-gray-800 text-[14px] mt-2">
              452 ซอยสุขุมวิท 79 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพมหานคร 10260
            </h1>
          </div>
          <div>
            <div className="flex flex-row gap-4">
              <img
                src="\image\phone.png"
                alt="phone-icon"
                className="w-[20px] h-[20px]"
              />
              <h1 className="text-gray-800 text-[16px]">080-540-6357</h1>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <img
                src="\image\email.png"
                alt="email-icon"
                className="w-[20px] h-[20px]"
              />
              <h1 className="text-gray-800 text-[16px]">
                contact@homeservices.co
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[42px] bg-gray-100 ">
        <div className="flex flex-row justify-between pt-3">
          <span className=" ml-28 text-[12px] text-gray-500">
            copyright © 2021 HomeServices.com All rights reserved
          </span>
          <div className="flex gap-14 mr-32 text-[14px] text-gray-700">
            <span>เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์</span>
            <span>นโยบายความเป็นส่วนตัว</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

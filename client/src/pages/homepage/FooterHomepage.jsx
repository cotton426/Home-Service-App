import React from "react";
import Footer from "../../components/Footer";

const FooterHomepage = () => {
  return (
    <footer className="h-[613px] w-screen">
      <div className="flex flex-col">
        <div className="bg-blue-600 h-[378px] relative">
          <div className="flex flex-row gap-28 ">
            <img
              src="\images\part-male-construction-worker_329181-3734 1.png"
              alt="engineer"
              className="h-full"
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
              src="\images\house.png"
              alt="home"
              className="absolute right-0 bottom-0 "
            />
          </div>
        </div>
        <Footer />
      </div>
    </footer>
  );
};

export default FooterHomepage;

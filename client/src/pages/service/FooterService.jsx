import React from "react";
import Footer from "../../components/Footer";

const Footerservice = () => {
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

export default Footerservice;

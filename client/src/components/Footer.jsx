const Footer = () => {
  return (
    <footer className="w-screen ">
      <div className="flex flex-col">
        <div className="h-[193px]  flex  flex-row items-center justify-between gap-[10%] px-[10%]">
          <div className="flex flex-row gap-3">
            <img
              src="\icons\houseicon.png"
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
                src="\icons\phone.png"
                alt="phone-icon"
                className="w-[20px] h-[20px]"
              />
              <h1 className="text-gray-800 text-[16px]">080-540-6357</h1>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <img
                src="\icons\email.png"
                alt="email-icon"
                className="w-[20px] h-[20px]"
              />
              <span className="text-gray-800 text-[16px]">
                contact@homeservices.co
              </span>
            </div>
          </div>
        </div>
        <div className="h-[42px] bg-gray-100 ">
          <div className="flex flex-row justify-between pt-3 ">
            <span className=" ml-28 text-[12px] text-gray-500 ">
              copyright © 2021 HomeServices.com All rights reserved
            </span>
            <div className="flex gap-14 mr-32 text-[14px] text-gray-700 ">
              <span>เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์</span>
              <span>นโยบายความเป็นส่วนตัว</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

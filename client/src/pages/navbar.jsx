import { useState } from "react";
import logoHomeService from "./iconNavbar/logoHomeService.png";
import notification from "./iconNavbar/notification.png";
import userProfile from "./iconNavbar/userProfile.png";

// NavbarLeftContainer component
const NavbarLeftContainer = () => {
    return (
      <div className="w-[60%] flex space-x-4 items-center">
        <div className="flex">
          <img
            className="w-[32px] h-[32px]"
            src={logoHomeService}
            alt="HomeServices Logo"
          />
          <a href="/" className=" text-blue-600  text-[24px] mx-[5%]">
            HomeServices
          </a>
        </div>
  
        <a href="/" className=" text-black  text-[16px] pt-1 pl-[5%]">
          บริการของเรา
        </a>
      </div>
    );
  };
  
  //navbar for login at Homepage
  export const NavbarLogin = () => {
    return (
      <nav className="bg-BG p-4 w-screen h-[80px]">
        <div className="w-[78%] mx-auto flex justify-between items-center">
          {/* Left container */}
          <NavbarLeftContainer />
  
          {/* Right container */}
          <div className="flex w-[40%] justify-end">
            <button className="btn-secondary">เข้าสู่ระบบ</button>
          </div>
        </div>
      </nav>
    );
  };
  

// dropdown component for user-afmin profile
const DropdownItem = ({ href, text, icon }) => {
  return (
    <li>
      <a
        href={href}
        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
      >
        {icon && <img src={icon} className="inline-block mr-2" />}
        {text}
      </a>
    </li>
  );
};

export const NavbarUser = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const menuItems = [
    {
      label: "ข้อมูลผู้ใช้งาน",
      icon: "icon-placeholder.svg",
      href: "#",
    },
    {
      label: "รายการคำสั่งซ่อม",
      icon: "icon-placeholder.svg",
      href: "#",
    },
    {
      label: "ประวัติการซ่อม",
      icon: "icon-placeholder.svg",
      href: "#",
    },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <nav className="bg-BG p-4 w-screen h-[80px]">
      <div className="w-[78%] mx-auto flex justify-between items-center">
        {/* Left container */}
        <NavbarLeftContainer />

        {/* Right container */}
        <div className="flex w-[40%]  flex-row justify-end ">
          <div className="flex  justify-between  ">
            <div className="pt-[6px] flex">
              <span
                id="user-name"
                className="text-black pt-1 text-[16px] mx-2 flex text-right"
              >
                ปอยฝ้ายมาลัยพร นามสกุลคนไทยมันยาว
              </span>
            </div>

            <div className="relative">
              <img
                src={userProfile}
                alt="userProfile"
                className="w-10 h-10 p-2 bg-gray-200 rounded-full mx-2 cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownVisible && (
                <div
                  id="dropdown"
                  className="absolute z-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-800 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {menuItems.map((item, index) => (
                      <DropdownItem
                        key={index}
                        icon={item.icon}
                        text={item.label}
                        href={item.href}
                      />
                    ))}
                    <li className="my-1 bg-gray-300 h-[1px] "></li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <img
                          src="icon-placeholder.svg"
                          className="inline-block mr-2"
                        />
                        ออกจากระบบ
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <img
              src={notification}
              alt="Notifications"
              className="w-10 h-10 bg-gray-200 rounded-full mx-2 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { TiClipboard } from "react-icons/ti";
import Footer from "./Footer";
import { BiCalendarEvent, BiUserCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useAuth } from "../contexts/auth";
import { formatTimeBooking, formatDateBooking } from "../utils/timeUtils";

export function UserOrderList() {
  const { items, getOrders } = useUser();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const profile_id = user.profiles.length > 0 ? user.profiles[0].id : null;

  useEffect(() => {
    if (profile_id) {
      getOrders(profile_id).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [profile_id, getOrders]);

  return (
    <div
      id="viewport"
      className="flex flex-col w-screen h-screen items-center justify-between bg-BG"
    >
      <div
        id="header"
        className="flex flex-col items-center w-screen bg-BG pb-20 relative "
      >
        <div
          id="box-topic"
          className="flex w-full bg-blue-600 h-[98px] justify-center items-center sticky top-0 z-[1]"
        >
          <p className="flex text-3xl text-white font-medium">
            รายการคำสั่งซ่อม
          </p>
        </div>
        <div id="box" className="flex w-[80%] pt-7 ">
          <div id="side-bar">
            <CustomerOrderSidebar />
          </div>
          <div id="box-orders" className="pl-[5%] w-full">
            <CustomerOrderBox orders={items} loading={loading} />
          </div>
        </div>
      </div>

      <div id="footer" className="flex bg-white ">
        <Footer />
      </div>
    </div>
  );
}
const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const CustomerOrderBox = ({ orders, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center pt-2">No orders found.</div>;
  }
  return (
    <>
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </>
  );
};
const OrderCard = ({ order }) => {
  const {
    order_code,
    booking_date,
    booking_time,
    total_price,
    order_items,
  } = order;
  const formattedTotalPrice = formatter.format(total_price);
  return (
    <div className="flex justify-center items-center w-[100%] h-auto border py-6 px-7 box mb-4">
      <div id="box-1" className="flex flex-col w-[100%] h-auto">
        <div id="order-code" className="flex text-xl pb-3">
          <p>คำสั่งการซ่อมรหัส : {order_code}</p>
        </div>
        <div id="box-2" className="flex flex-row">
          <div
            id="detail"
            className="flex flex-col text-gray-700 text-sm bg-white w-[70%]"
          >
            <div id="booking">
              <span className="flex flex-row items-center pb-1">
                <BiCalendarEvent className="mr-2 scale-150 text-gray-300" />
                วันเวลาดำเนินการ: {formatDateBooking(booking_date)} เวลา{" "}
                {formatTimeBooking(booking_time)} น.
              </span>
            </div>
            <div id="staff">
              <span className="flex flex-row items-center">
                <BiUserCircle className="mr-2 scale-150 text-gray-300" />
                พนักงาน: สมาน เยี่ยมยอด
              </span>
            </div>
          </div>
          <div
            id="total-price"
            className="w-[30%] flex justify-end items-center"
          >
            <span className="text-gray-700 text-sm pr-5">ราคารวม : </span>
            <span className="text-gray-950 text-lg">
              {formattedTotalPrice} ฿
            </span>
          </div>
        </div>
        <div id="box-3" className="flex flex-row">
          <div
            id="detail"
            className="flex flex-col text-gray-700 text-sm bg-white w-full"
          >
            <div id="booking">
              <span className="flex flex-row items-center pt-6">รายการ</span>
            </div>
            <div id="staff">
              {order_items.map((item, index) => (
                <span key={index} className="flex flex-row items-center">
                  • {item.sub_service_name ?? item.sub_services.name}{" "}
                  {item.quantity} {item.sub_services.unit??"รายการ"}
                </span>
              ))}
            </div>
          </div>
          {/* <div id="total-price" className="w-[30%] flex justify-end items-end">
            <button className="btn-primary">ดูรายละเอียด</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const CustomerOrderSidebar = () => {
  return (
    <div id="sidebar" className="flex w-[253px] h-auto box sticky top-[124px]">
      <div
        id="sidebar-orders"
        className="w-full flex justify-center items-start"
      >
        <ul className="text-sm text-gray-800 w-[80%] py-6">
          <div className="text-xl pb-5 text-gray-700">บัญชีผู้ใช้</div>
          <li className="my-1 bg-gray-300 h-[1px] "></li>
          <div className="pt-4">
            {menuList.map((menu, index) => {
              const { label, IconComponent, to } = menu;
              return (
                <li key={index}>
                  <Link
                    to={to}
                    className="block py-2 text-gray-950 hover:text-blue-700 text-base"
                  >
                    <IconComponent className="inline-block mr-2 scale-125 icon-dropdown" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

const menuList = [
  // {
  //   label: "ข้อมูลผู้ใช้งาน",
  //   IconComponent: BiUser,
  //   to: "/user-orders-list",
  // },
  {
    label: "รายการคำสั่งซ่อม",
    IconComponent: TiClipboard,
    to: "/user-orders-list",
  },
];

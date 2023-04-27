import { FiTag } from "react-icons/fi";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

function ServiceMore() {
  const { items, userGetServices } = useUser();

  useEffect(() => {
    userGetServices();
  }, []);

  console.log(items);

  return (
    <div className="flex justify-center w-full pb-20 pt-20 bg-gray-50 ">
      <div className="grid grid-cols-3 gap-10 ">
        {items.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex justify-center">
                <div className="bg-white rounded-lg relative overflow-hidden shadow-md mt-3 mb-5 w-[90%] g ">
                  <div className="service-preview">
                    <img
                      src={item.image}
                      alt="service"
                      className="w-full h-[200px] object-cover"
                    />
                  </div>
                  <div className="service-detail flex flex-col justify-start items-start py-2.5 px-6">
                    <h1 className="bg-blue-100 text-blue-800 rounded-lg py-1.5 px-2 my-2 text-sm">
                      {item.categories.name}
                    </h1>
                    <h2 className="text-gray-950 text-xl font-bold">
                      {item.name}
                    </h2>
                    <div className="flex flex-row justify-center items-center">
                      <FiTag className="w-3.5 mr-2 text-gray-700" />
                      <span className=" text-gray-700 text-sm">
                        ค่าบริการประมาณ {item.sub_services[0]?.price} ฿
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn-ghost mb-3 ml-4"
                    onClick={() => console.log(item)}
                  >
                    เลือกบริการ
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceMore;

// const serviceData = [
//   {
//     Image: "/images/air.png",
//     topic: "ล้างแอร์",
//     service: "บริการทั่วไป",
//     detail: "ค่าบริการประมาณ 500.00 - 1,000.00 ฿",
//   },
//   {
//     Image: "/images/ติดตั้งแอร์.png",
//     topic: "ติดตั้งแอร์",
//     service: "บริการทั่วไป",
//     detail: "ค่าบริการประมาณ 2800.00 ฿",
//   },
//   {
//     Image: "/images/ซ่อมแอร์.png",
//     topic: "ซ่อมแอร์",
//     service: "บริการทั่วไป",
//     detail: "ค่าบริการประมาณ 400.00 ฿",
//   },
//   {
//     Image: "/images/cleaner.png",
//     topic: "ทำความสะอาดทั่วไป",
//     service: "บริการทั่วไป",
//     detail: "ค่าบริการประมาณ 500.00 ฿",
//   },
//   {
//     Image: "/images/fix.png",
//     topic: "ซ่อมเครื่องซักผ้า",
//     service: "บริการทั่วไป",
//     detail: "ค่าบริการประมาณ 500.00 ฿",
//   },
//   {
//     Image: "/images/ติดตั้งเตาแก๊ส.png",
//     topic: "ติดตั้งเตาแก๊ส",
//     service: "บริการทั่วไป",
//     detail: "ค่าบริการประมาณ 1,000.00 ฿",
//   },
//   {
//     Image: "/images/ติดตั้งเครื่องดูดควัน.png",
//     topic: "ติดตั้งเครื่องดูดควัน",
//     service: "บริการห้องครัว",
//     detail: "ค่าบริการประมาณ 1,000.00 ฿",
//   },
//   {
//     Image: "/images/ติดตั้งชักโครก.png",
//     topic: "ติดตั้งชักโครก",
//     service: "บริการห้องน้ำ",
//     detail: "ค่าบริการประมาณ 1,000.00 ฿",
//   },
//   {
//     Image: "/images/ติดตั้งเครื่องทำน้ำอุ่น.png",
//     topic: "ติดตั้งเครื่องทำน้ำอุ่น",
//     service: "บริการห้องน้ำ",
//     detail: "ค่าบริการประมาณ 500.00 ฿",
//   },
// ];

// Fetch service data from API
// useEffect(() => {
//   fetch('https://example.com/api/services')
//     .then(response => response.json())
//     .then(data => setServiceData(data))
//     .catch(error => console.log(error));
// }, []);

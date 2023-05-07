import React, { useEffect } from "react";
import { useState } from "react";
import { FiTag } from "react-icons/fi";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function ServiceList() {
  const { items, homepageGetServices } = useUser();

const navigate = useNavigate()

  useEffect(() => {
    homepageGetServices();
  }, []);

  return (
    <div className="flex justify-center w-full ">
      <div className="grid grid-cols-3 gap-10 w-full">
        {items.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex justify-center w-full">
                <div className="bg-white rounded-lg relative overflow-hidden shadow-md mt-3 mb-5 w-full ">
                  <div className="service-preview">
                    <img
                      src={item.image}
                      alt="service"
                      className="w-full h-[200px] object-cover"
                    />
                  </div>
                  <div className="service-detail flex flex-col justify-start items-start py-2.5 px-6">
                    <h1
                      className={`${
                        item.categories.name === "บริการห้องครัว"
                          ? "kitchen"
                          : item.categories.name === "บริการทั่วไป"
                          ? "general"
                          : item.categories.name === "บริการห้องน้ำ"
                          ? "toilet"
                          : "garden"
                      }`}
                    >
                      {item.categories.name}
                    </h1>
                    <h2 className="text-gray-950 text-xl font-bold">
                      {item.name}
                    </h2>
                    <div className="flex flex-row justify-center items-center">
                      <FiTag className="w-3.5 mr-2 text-gray-700" />
                      <span className="text-gray-700 text-sm">
                        ค่าบริการประมาณ{" "}
                        {item.sub_services.length > 1
                          ? `${Math.min(
                              ...item.sub_services.map((s) => s.price)
                            )} ฿ - ${Math.max(
                              ...item.sub_services.map((s) => s.price)
                            )} ฿`
                          : item.sub_services[0]?.price + " ฿"}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn-ghost mb-3 ml-4"
                    onClick={() => {
                      navigate(`/select-service/${item.service_id}`);
                    }}
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

export default ServiceList;

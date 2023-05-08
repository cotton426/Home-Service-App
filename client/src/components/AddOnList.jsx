import React, { useState } from "react";
import useData from "../hooks/useData";
import { useEffect } from "react";
import { FiTag } from "react-icons/fi";

function AddOnList({ itemObjects, counters, setCounters, cart, setCart }) {
  const { subServiceList } = itemObjects;

  const handleAddCounter = (index) => {
    const newCounters = [...counters];
    newCounters[index] === undefined
      ? (newCounters[index] = 1)
      : (newCounters[index] += 1);
    setCounters(newCounters);
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index] = {
        sub_service_name: subServiceList[index].name,
        quantity: newCounters[index],
        price: subServiceList[index].price,
        sub_service_id: subServiceList[index].sub_service_id,
      };
      return newCart;
    });
  };

  const handleSubtractCounter = (index) => {
    if (counters[index] > 0) {
      const newCounters = [...counters];
      newCounters[index] -= 1;
      setCounters(newCounters);
      setCart((prevCart) => {
        const newCart = [...prevCart];
        newCart[index] = {
          sub_service_name: subServiceList[index].name,
          quantity: newCounters[index],
          price: subServiceList[index].price,
          sub_service_id: subServiceList[index].sub_service_id,
        };
        return newCart;
      });
    }
  };

  return (
    <div className="box w-3/5 flex flex-col p-8 gap-4">
      <h1 className="text-gray-500 font-normal text-xl">
        เลือกรายการบริการ{itemObjects.name}
      </h1>
      {subServiceList?.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-3">
                <h2 className="text-black font-medium text-lg mt-5">
                  {item.name}
                </h2>
                <div className="flex flex-row items-center">
                  <FiTag className="w-3.5 mr-2 text-gray-700" />
                  <p className="text-gray-700">
                    {item.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    ฿ / {item.unit}
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center">
                <button
                  className="count"
                  onClick={() => handleSubtractCounter(index)}
                >
                  -
                </button>
                <h2 className="text-gray-800 font-medium text-base w-[54px] text-center">
                  {counters[index] ?? 0}
                </h2>
                <button
                  className="count"
                  onClick={() => handleAddCounter(index)}
                >
                  +
                </button>
              </div>
            </div>
            {index + 1 !== subServiceList.length ? (
              <div className="w-full  border-b-[1px] border-gray-300"></div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default AddOnList;

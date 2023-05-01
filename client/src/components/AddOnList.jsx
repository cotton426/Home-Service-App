import React, { useState } from "react";
import useData from "../hooks/useData";
import { useEffect } from "react";
import useUser from "../hooks/useUser";
import { FiTag } from "react-icons/fi";
import { useParams } from "react-router-dom";

function AddOnList() {
  const param = useParams();
  const { getService, itemObjects, items } = useData();


  useEffect(() => {
    getService();
  }, []);

  console.log(items);
  console.log(itemObjects);


  const data = [
    {
      subSer: "9,000 - 18,000 BTU, แบบติดผนัง",
      price: "800.00 ฿ / เครื่อง",
    },
    {
      subSer: "9,000 - 18,000 BTU, แบบติดผนัง",
      price: "800.00 ฿ / เครื่อง",
    },
    {
      subSer: "9,000 - 18,000 BTU, แบบติดผนัง",
      price: "800.00 ฿ / เครื่อง",
    },
  ];

  const [counters, setCounters] = useState(Array(data.length).fill(0));


  const handleAddCounter = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
  }

  const handleSubtractCounter = (index) => {
    if (counters[index] > 0) {
      const newCounters = [...counters];
      newCounters[index] -= 1;
      setCounters(newCounters);
    }
  }

  return (
    <div className="flex flex-row w-full h-full p-[10%] bg-BG">
      <div className="box w-[750px] h-[500px] flex flex-col p-8 gap-4">
        <h1 className="text-gray-500 font-normal text-xl">
          เลือกรายการบริการล้างแอร์
        </h1>
        {data.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-6">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-3">
                  <h2 className="text-black font-medium text-lg mt-5">
                    {item.subSer}
                  </h2>
                  <div className="flex flex-row">
                    <FiTag className="w-3.5 mr-2 text-gray-700" />
                    <p className="text-gray-700">{item.price}</p>
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
                    {counters[index]}
                  </h2>
                  <button
                    className="count"
                    onClick={() => handleAddCounter(index)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full  border-b-[1px] border-gray-300"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




export default AddOnList;

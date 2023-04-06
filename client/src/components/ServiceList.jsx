import React from 'react'
import { useState } from "react";
import Img1 from "../img/cleaner.png"
import Img2 from '../img/air.png'
import Img3 from '../img/fix.png'
import Icon from '../img/tag.png'

function ServiceList() {

    const [servicePost, setServicePost] = useState("")
    const serviceData = [
      {
        Image: Img1,
        topic: "ทำความสะอาดทั่วไป",
        detail: "ค่าบริการประมาณ 500.00 - 1,000.00 ฿",
      },
      {
        Image: Img2,
        topic: "ล้างแอร์",
        detail: "ค่าบริการประมาณ 500.00 - 1,000.00 ฿",
      },
      {
        Image: Img3,
        topic: "ซ่อมเครื่องซักผ้า",
        detail: "ค่าบริการประมาณ 500.00 ฿",
      },
    ]


  return (
    <div className="flex flex-row space-x-11">
      {serviceData.map((item,index)=>{
        return (
          <div key={index} className=" bg-white rounded-lg relative overflow-hidden shadow-md ">
            <div className="service-preview">
              <img 
                src={item.Image}
                alt="service"
              />
            </div>
          <div className="service-detail flex flex-col justify-start items-start py-2.5 px-6 ">
            <button className="bg-blue-100 text-blue-800 rounded-lg py-1.5 px-2 my-2 text-sm">บริการทั่วไป</button>
            <h2 className="text-gray-950 text-xl font-bold">{item.topic}</h2>
            <div className="flex flex-row justify-center items-center">
                <img className="h-4 pr-2 " src={Icon} alt="tag" />
                <span className=" text-gray-700 text-sm">{item.detail}</span>
            </div>
          </div>
          <button className="btn-ghost mb-3">เลือกบริการ</button>
          </div>
        )
      })}
    
    </div>
  )
}

export default ServiceList
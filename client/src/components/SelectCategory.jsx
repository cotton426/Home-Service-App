import React from 'react'
import { IoMdArrowDropdown } from "react-icons/io";

function SelectCategory() {
  return (
    <div>
        <div className="relative flex flex-row justify-center space-x-40 text-gray-950 mt-10">
        <label htmlFor="category" className="w-[100px] text-gray-700">
                  หมวดหมู่
                  <label className="text-red">*</label>
                </label>
            <select
              id="category"
              defaultValue=""
              className="block appearance-none input-default w-[450px] bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled hidden>
                บริการทั้งหมด
              </option>
              <option>บริการทั่วไป</option>
              <option>บริการห้องครัว</option>
              <option>บริการห้องน้ำ</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoMdArrowDropdown />
            </div>
          </div>
    </div>
  )
}

export default SelectCategory


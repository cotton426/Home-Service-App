import { IoMdArrowDropdown } from "react-icons/io";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";

function SelectCategory({ field, form, view }) {
  // const [select, setSelect] = useState();

  const { getCategories, items } = useData();

  useEffect(() => {
    getCategories();
  }, []);

  const handleSelection = (item) => {
    // setSelect(item)
    const { category_id } = items.filter((x) => x.name === item)[0];
    form.setFieldValue(field.name, category_id);
  };
  const getCategoryName = (categoryId) => {
    const category = items.find((item) => item.category_id === categoryId);
    return category ? category.name : "";
  };
  
  return (
    <div>
      <div className="relative flex flex-row justify-center space-x-40 text-gray-950 mt-10">
        <label htmlFor="category" className="w-[100px] text-gray-700">
          หมวดหมู่
          {!view && <label className="text-red">*</label>}
        </label>
        {view ? (
          <div>{getCategoryName(field.value)}</div>
        ) : (
          <>
            <select
              value={getCategoryName(field.value)}
              id="category"
              className="block appearance-none input-default w-[450px] bg-white border border-gray-400 hover:border-gray-500 rounded leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event) => handleSelection(event.target.value)}
            >
              <option value="" disabled hidden>
                บริการทั้งหมด
              </option>
              {items.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoMdArrowDropdown />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SelectCategory;

import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TbGripVertical } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const formatTime = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day}/${month}/${year} ${formattedHours}:${minutes}${ampm}`;
};

const TableRow = ({
  item,
  index,
  handleDragStart,
  handleDrop,
  handleDragOver,
  handleEdit,
  handleDelete,
}) => {
  return (
    <tr
      key={item.id}
      className="bg-white w-full h-20 text-black border-t border-gray-200 hover:bg-gray-100 transition-all duration-200 ease-in"
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <td className="py-3 px-4 text-gray-300">
        <TbGripVertical className="w-full" />
      </td>
      <td className="py-3 px-4 text-center">{index + 1}</td>
      <td className="py-3 px-4">{item.title}</td>
      <td className="py-3 px-4">{formatTime(item.created_at)}</td>
      <td className="py-3 px-4">{formatTime(item.updated_at)}</td>
      <td className="py-3 px-4">
        <button
          className="text-gray-500 hover:text-red-700  mr-2"
          onClick={() => handleDelete(item)}
        >
          <HiOutlineTrash className="scale-110" />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEdit(item)}
        >
          <FiEdit />
        </button>
      </td>
    </tr>
  );
};

const TableOfContents = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Introduction",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      title: "Methodology",
      created_at: new Date(),
      updated_at: new Date(),
    },
    { id: 3, title: "Results", created_at: new Date(), updated_at: new Date() },
    {
      id: 4,
      title: "Discussion",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      title: "Conclusion",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("index");
    const updatedItems = [...items];
    const [removed] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(index, 0, removed);
    setItems(updatedItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleEdit = (item) => {
    // Handle edit logic here
    console.log("Edit item", item);
  };

  const handleDelete = (item) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(item);
  };
  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Delete item", itemToDelete);
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  return (
    <div className="w-full p-[5%]">
      <div className="overflow-hidden w-full rounded-lg border border-gray-200">
        <table className="w-full text-left text-gray-700 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 w-1/12"></th>
              <th className="py-3 px-4 text-center w-1/12">ลำดับ</th>
              <th className="py-3 px-4 w-1/4">ชื่อหมวดหมู่</th>
              <th className="py-3 px-4 w-1/6">สร้างเมื่อ</th>
              <th className="py-3 px-4 ">แก้ไขล่าสุด</th>
              <th className="py-3 px-4 w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <TableRow
                key={item.id}
                item={item}
                index={index}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center bg-white text-black text-center px-10 py-9 rounded-2xl shadow-md">
              <BsFillExclamationCircleFill className="text-red scale-150 mb-4" />
              <h1 className="text-xl font-medium">ยืนยันการลบรายการ?</h1>
              <p className="text-gray-700 font-light py-4">
                คุณต้องการลบรายการ "{itemToDelete.title}" <br />
                ใช่หรือไม่
              </p>
              <div className="flex justify-center gap-4">
                <button className="btn-primary" onClick={confirmDelete}>
                  ลบรายการ
                </button>
                <button className="btn-secondary" onClick={cancelDelete}>
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOfContents;

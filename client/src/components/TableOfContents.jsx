import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TbGripVertical } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import AlertConfirmation from "./AlertConfirmation";
// import { useQuery, useMutation, useQueryClient } from "react-query";
// import { useData } from "../contexts/data";
import useData from "../hooks/useData";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/timeUtils";

const TableRow = ({
  service,
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
      key={item.category_id}
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
      {service ? (
        <>
          <td className="py-3 px-4">{item.name}</td>
          <td className="py-3 px-4">{item.categories.name}</td>
        </>
      ) : (
        <td className="py-3 px-4">{item.name}</td>
      )}

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

const TableOfContents = ({ service }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { items, getCategories, getServices, deleteCategory } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    service ? getServices() : getCategories();
  }, [items]);

  // const queryClient = useQueryClient();

  // const fetchItems = async () => {
  //   const response = await fetch("http://localhost:4000/data/categories"); // Replace with your actual API endpoint
  //   const data = await response.json();
  //   return data;
  // };

  // const {
  //   data: items,
  //   isLoading,
  //   isError,
  // } = useQuery("categories", getCategories);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("index");
    const updatedItems = [...items];
    console.log(updatedItems);
    const [removed] = updatedItems.splice(sourceIndex, 1);
    console.log(removed);
    updatedItems.splice(index, 0, removed);
    console.log(updatedItems);
    // Update the server/database with the updatedItems array using React Query
    // try {
    //   const mutation = useMutation("/api/items", {
    //     method: "PUT",
    //     body: JSON.stringify({ items: updatedItems }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   await mutation.mutateAsync(); // Trigger the mutation and wait for it to complete
    //   console.log("Items updated successfully");
    // } catch (error) {
    //   console.error(error); // Handle any errors that may occur
    // }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleEdit = (item) => {
    // Handle edit logic here
    navigate("/edit-category/" + item.category_id);
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
    deleteCategory(itemToDelete.category_id);
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
              <th className="py-3 px-4 w-[5%]"></th>
              <th className="py-3 px-4 text-center w-1/12">ลำดับ</th>
              {service ? (
                <>
                  <th className="py-3 px-4 w-1/6">ชื่อบริการ</th>
                  <th className="py-3 px-4 w-1/6">หมวดหมู่</th>
                </>
              ) : (
                <th className="py-3 px-4 w-1/4">ชื่อหมวดหมู่</th>
              )}
              <th className="py-3 px-4 w-1/6">สร้างเมื่อ</th>
              <th className="py-3 px-4 ">แก้ไขล่าสุด</th>
              <th className="py-3 px-4 w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <TableRow
                service={service}
                key={index}
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
          <AlertConfirmation
            itemToDelete={itemToDelete}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TableOfContents;

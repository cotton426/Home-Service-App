import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TbGripVertical } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import AlertConfirmation from "./AlertConfirmation";
import useData from "../hooks/useData";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/timeUtils";

const TableRow = ({
  service,
  item,
  index,
  promotion,
  handleDragStart,
  handleDrop,
  handleDragOver,
  handleEdit,
  handleDelete,
}) => {
  const navigate = useNavigate();

  const navigateToItem = () => {
    navigate(
      promotion
        ? `/view-promotion/${item.id}`
        : service
        ? `/view-service/${item.service_id}`
        : `/view-category/${item.category_id}`
    );
  };

  return (
    <tr
      key={item.category_id}
      className="bg-white w-full h-20 text-black border-t border-gray-200 hover:bg-gray-100 transition-all duration-200 ease-in"
      onClick={navigateToItem}
    >
      {promotion ? (
        <td className="py-3 px-4 text-center">{item.promotion_code}</td>
      ) : (
        <td className="py-3 px-4 text-center">{index + 1}</td>
      )}
      {promotion ? (
        <>
          <td className="py-3 px-4">{item.type}</td>
          <td className="py-3 px-4 ">
            {item.quantity_used}/{item.useable_quantity}
          </td>
          <td className="py-3 px-4 text-red">
            -{item.discount.toFixed(2)}
            {item.type === "Fixed" ? "฿" : "%"}
          </td>
        </>
      ) : service ? (
        <>
          <td className="py-3 px-4">{item.name}</td>
          <td className="py-3 px-4">
            <div>
              <h1
                className={`inline-block text-center ${
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
            </div>
          </td>
        </>
      ) : (
        <td className="py-3 px-4">{item.name}</td>
      )}

      <td className="py-3 px-4">{formatTime(item.created_at)}</td>
      <td className="py-3 px-4">{formatTime(item.updated_at)}</td>
      <td className="py-7 px-4 flex">
        <button
          className="text-gray-500 hover:text-red-700 mr-2"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item);
          }}
        >
          <HiOutlineTrash className="scale-110" />
        </button>

        <FiEdit
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(item);
          }}
        />
      </td>
    </tr>
  );
};

const TableOfContents = ({ service, promotion }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const {
    items,
    getCategories,
    getServices,
    getPromotions,
    deleteCategory,
    deleteService,
    deletePromotion,
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    promotion ? getPromotions() : service ? getServices() : getCategories();
  }, [itemToDelete]);

  const handleEdit = (item) => {
    promotion
      ? navigate("/edit-promotion/" + item.id)
      : service
      ? navigate("/edit-service/" + item.service_id)
      : navigate("/edit-category/" + item.category_id);
  };

  const handleDelete = (item) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(item);
  };
  const confirmDelete = async () => {
    promotion
      ? await deletePromotion(itemToDelete.id)
      : service
      ? await deleteService(itemToDelete.service_id)
      : await deleteCategory(itemToDelete.category_id);
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
              {/* <th className="py-3 px-4 w-[5%]"></th> */}
              {promotion ? (
                <th className="py-3 px-4 text-center w-1/6">Promotion Code</th>
              ) : (
                <th className="py-3 px-4 text-center w-1/12">ลำดับ</th>
              )}

              {promotion ? (
                <>
                  <th className="py-3 px-4 w-[8%]">ประเภท</th>
                  <th className="py-3 px-4 w-[15%]">โควต้าการใช้(ครั้ง)</th>
                  <th className="py-3 px-4 w-[10%]">ราคาที่ลด</th>
                </>
              ) : service ? (
                <>
                  <th className="py-3 px-4 w-1/6">ชื่อบริการ</th>
                  <th className="py-3 px-4 w-1/6">หมวดหมู่</th>
                </>
              ) : (
                <th className="py-3 px-4 w-1/4">ชื่อหมวดหมู่</th>
              )}
              <th className="py-3 px-4 w-1/5">สร้างเมื่อ</th>
              <th className="py-3 px-4 ">แก้ไขล่าสุด</th>
              <th className="py-3 px-4 w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <TableRow
                service={service}
                promotion={promotion}
                key={index}
                item={item}
                index={index}
                // handleDragStart={handleDragStart}
                // handleDrop={handleDrop}
                // handleDragOver={handleDragOver}
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

import { BsFillExclamationCircleFill } from "react-icons/bs";

const AlertConfirmation = ({ itemToDelete, confirmDelete, cancelDelete }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white text-black text-center px-10 py-9 rounded-2xl shadow-md">
        <BsFillExclamationCircleFill className="text-red scale-150 mb-4" />
        <h1 className="text-xl font-medium">ยืนยันการลบรายการ?</h1>
        <p className="text-gray-700 font-light py-4">
          คุณต้องการลบรายการ "{itemToDelete.name}" <br />
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
  );
};

export default AlertConfirmation;

import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { Field, ErrorMessage } from "formik";

function UploadImage({ field, form }) {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0];
    const encodedFileName = encodeURIComponent(file.name);
    form.setFieldValue(field.name, file);
    setFileName(encodedFileName);
    setImage(URL.createObjectURL(file));
  };
  useEffect(() => {
    setImage(field.value);
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-center space-x-40 mt-10 text-gray-700">
        <label htmlFor={field?.name} className="w-[100px] text-gray-700">
          รูปภาพ
          <label className="text-red">*</label>
        </label>
        <label
          htmlFor={field?.name}
          className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded h-[200px] w-[450px] cursor-pointer p-0"
        >
          <input
            type="file"
            id={field?.name}
            accept="image/*"
            className="input-field"
            hidden
            onChange={handleChange}
          />
          {image ? (
            <div>
              <img src={image} alt={fileName} className="flex w-auto h-48" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="\icons\uploadImg.png"
                alt="upload"
                className="w-16 h-16 mb-5"
              />
              <div>
                <span className="pr-2 btn-ghost">อัพโหลดรูปภาพ</span>
                <span className="text-gray-700">หรือ ลากและวางที่นี่</span>
              </div>
              <p className="text-gray-700">PNG, JPG ขนาดไม่เกิน 5MB</p>
            </div>
          )}
        </label>
      </div>
      <span className=" text-gray-700 font-normal text-xs pl-[260px] mt-5 ">
        ขนาดภาพที่แนะนำ: 1440 x 225 PX
      </span>
      <ErrorMessage
        name={field?.name}
        component="div"
        className="text-red-500"
      />
    </div>
  );
}

export default UploadImage;

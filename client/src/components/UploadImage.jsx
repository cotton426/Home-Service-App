import { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";

function UploadImage({ field, form, view }) {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");

  function removeImage() {
    setImage("");
  }

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
          {!view && <label className="text-red">*</label>}
        </label>
        {image ? (
          <label
            htmlFor={field?.name}
            className="flex flex-col justify-center items-center border-gray-300 rounded h-[225px] w-[450px] p-0 "
          >
            {!view && (
              <input
                type="file"
                id={field?.name}
                accept="image/*"
                className="input-field cursor-pointer"
                hidden
                onChange={handleChange}
              />
            )}
            {!image ? (
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
            ) : view ? (
              <div className="flex flex-col justify-center items-start rounded-lg h-[225px] w-[450px] p-0">
                <img
                  src={image}
                  alt={fileName}
                  className="flex w-auto h-[225px] rounded-lg "
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center border-2 border-gray-300 rounded h-[225px] w-[450px] cursor-pointer p-0">
                {!view && (
                  <img
                    src={image}
                    alt={fileName}
                    className="flex w-auto h-full "
                  />
                )}
              </div>
            )}
          </label>
        ) : (
          <label
            htmlFor={field?.name}
            className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded h-[225px] w-[450px]  p-0"
          >
            <input
              type="file"
              id={field?.name}
              accept="image/*"
              className="input-field cursor-pointer"
              hidden
              onChange={handleChange}
            />
            {!image ? (
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
            ) : view ? (
              <div className="flex flex-col justify-center items-center rounded h-[225px] w-[450px]  p-0">
                <img
                  src={image}
                  alt={fileName}
                  className="flex w-auto h-[225px] "
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center border-2 border-gray-300 rounded h-[225px] w-[450px] cursor-pointer p-0">
                <img
                  src={image}
                  alt={fileName}
                  className="flex w-auto h-[225px]"
                />
              </div>
            )}
          </label>
        )}
      </div>
      <div className="flex flex-row justify-between items-start  ">
        <span className=" text-gray-700 font-normal text-xs pl-[260px] py-1.5">
          ขนาดภาพที่แนะนำ: 1440 x 225 PX
        </span>
        <div className="flex flex-col items-end">
          {image ? (
            <>
              {!view && (
                <p className="btn-ghost" onClick={removeImage}>
                  ลบรูปภาพ
                </p>
              )}
              <ErrorMessage
                name={field?.name}
                component="div"
                className="text-red"
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UploadImage;

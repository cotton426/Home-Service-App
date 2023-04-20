import React from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useState } from "react";

function AddService() {
  // const formik = useFormik()

  // const [option, setOption] = useState("")
  // const categoryList = ["บริการทั่วไป","บริการห้องครัว","บริการห้องน้ำ"]

  const initialValues = {
    serviceName: "",
    category: "เลือกหมวดหมู่",
    image: null,
    subServiceList: [
      {
        subServiceName: "",
        serviceCharge: "",
        serviceUnit: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("Please select an image")
      .test(
        "fileSize",
        "The file is too large",
        (value) => value && value.size <= 2000000
      )
      .test(
        "fileType",
        "Unsupported file type",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    category: Yup.string().oneOf([
      "generalService",
      "kitchenService",
      "bathroomService",
    ]),
  });

  // const validate = values => {
  //   const errors = {}
  //   if(!values.serviceName){
  //     errors.serviceName = "serviceName is required"
  //   }
  //   if(!values.category){
  //     errors.category ="Required"
  //   }
  //   return errors
  // }

  return (
    <div className=" bg-white h-full w-[1200px] p-5 m-10 flex flex-col justify-start border border-gray-300 rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((res) => setTimeout(res, 500));
          alert(JSON.stringify(values, null, 2));
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="ml-5 flex flex-col justify-center">
            <div className="h-[450px] flex flex-col justify-start items-start mt-6 border-b-2 border-gray-300">
              <div className=" flex flex-row justify-center space-x-40">
                <label htmlFor="serviceName" className="w-[100px]">
                  ชื่อบริการ
                  <label className="text-red">*</label>
                </label>
                <Field
                  className="input-default w-[450px] text-gray-950"
                  id="serviceName"
                  name="serviceName"
                />
              </div>

              <div className="flex flex-row justify-center space-x-40 text-gray-950 mt-10">
                <label htmlFor="category" className="w-[100px]">
                  หมวดหมู่
                  <label className="text-red">*</label>
                </label>

                <Field
                  as="select"
                  name="category"
                  className="input-default w-[450px]"
                  placeholder="เลือกหมวดหมู่"
                >
                  <option disabled value="">
                    -- เลือกหมวดหมู่ --
                  </option>
                  <option value="generalService">บริการทั่วไป</option>
                  <option value="kitchenService">บริการห้องครัว</option>
                  <option value="bathroomService">บริการห้องน้ำ</option>

                  {/* {categoryList.map((op)=><option>{op}</option>)} */}
                </Field>
              </div>

              <div className=" flex flex-row justify-center space-x-40 mt-10">
                <label htmlFor="image" className="w-[100px]">
                  รูปภาพ
                  <label className="text-red">*</label>
                </label>
                <div className="flex flex-col justify-center items-center text-center text-gray-500 border-2 border-dashed border-gray-300 rounded h-[150px] w-[450px] cursor-pointer">
                  <input
                    className="w-full h-full"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFieldValue("image", e.target.files[0]);
                    }}
                  />
                  <button className="btn-ghost font-normal">
                    อัพโหลดรูปภาพ
                  </button>
                  <div className="">
                    <span>หรือ ลากและวางที่นี่</span>
                    <span>PNG, JPG ขนาดไม่เกิน 5MB</span>
                  </div>
                </div>
              </div>

              <span className=" text-gray-700 font-normal text-xs pl-[260px] mt-5 ">
                ขนาดภาพที่แนะนำ: 1440 x 225 PX
              </span>
            </div>

            <div className="mt-5">
              <h1 className="text-gray-700 text-base font-medium">
                รายการบริการย่อย
              </h1>
              <FieldArray name="subServiceList">
                {({ remove, push }) => (
                  <div className="flex flex-col justify-start items-start mt-6 gap-5">
                    {values.subServiceList.map((item, index) => (
                      <div
                        className="flex flex-row justify-center items-center gap-5 "
                        key={index}
                      >
                        <RxDragHandleDots2 className="text-gray-500 mt-4" />
                        <div className="flex flex-col ">
                          <label
                            htmlFor={`subServiceList.${index}.subServiceName`}
                          >
                            ชื่อรายการ
                          </label>
                          <Field
                            className="input-default w-72"
                            name={`subServiceList.${index}.name`}
                            type="text"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor={`subServiceList.${index}.serviceCharge`}
                          >
                            ค่าบริการ / 1 หน่วย
                          </label>
                          <Field
                            className="input-default w-72"
                            name={`subServiceList.${index}.serviceCharge`}
                            type="text"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor={`subServiceList.${index}.serviceUnit`}
                          >
                            หน่วยการบริการ
                          </label>
                          <Field
                            className="input-default w-72"
                            name={`friends.${index}.serviceUnit`}
                            type="number"
                          />
                        </div>

                        <div className="">
                          <button
                            type="button"
                            className="text-gray-400 text-base font-medium underline ml-5 mt-5"
                            onClick={() => remove(index)}
                          >
                            ลบรายการ
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-secondary w-48 "
                      onClick={() => push({ name: "", email: "" })}
                    >
                      เพิ่มรายการ +
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddService;

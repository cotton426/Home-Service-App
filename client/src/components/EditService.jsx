import React, { useState } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { RxDragHandleDots2 } from "react-icons/rx";
import SelectCategory from "./SelectCategory";
import UploadImage from "./UploadImage";
import useData from "../hooks/useData";
import { AddServiceNavbar } from "./AdminNavbar";
function EditService() {
  const initialValues = {
    serviceName: "",
    subServiceList: [
      {
        subServiceName: "",
        serviceCharge: "",
        serviceUnit: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
 
  });



  const [serviceName, setServiceName] = useState("")

  const {addService} = useData()

  const handleSubmit = (event) => {
    event.preventDefault();
    addService({
      serviceName,

    });
    console.log(serviceName);
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const result = await login(values);
      if (result?.message) {
        setErrors({ password: "Incorrect email or password" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <AddServiceNavbar/>
    <div className=" bg-BG h-full w-full p-[5%]">
      <div className="flex flex-col justify-start border border-gray-300 rounded-lg bg-white w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <div className="ml-5 mr-5 flex flex-col justify-center">
            <div className="h-[450px] flex flex-col justify-start items-start mt-6 border-b-2 border-gray-300 ">
              <div className=" flex flex-row justify-center space-x-40 ">
                <label htmlFor="serviceName" className="w-[100px] text-gray-700">
                  ชื่อบริการ
                  <label className="text-red">*</label>
                </label>
                <Field
                  className="input-default w-[450px] text-gray-950"
                  id="serviceName"
                  name="serviceName"
                  value={serviceName}
                  onChange={(event) => 
                    {setServiceName(event.target.value)}
                  }
                />
              </div>
              
              <div>
                <SelectCategory/>
              </div>

              <div>
                <UploadImage/>
                <div className="text-blue-700">
                  ลบรูปภาพ
                </div>
              </div>


            </div>

            <div className="mt-5">
              <h1 className="text-gray-700 text-base font-medium">
                รายการบริการย่อย
              </h1>
              <FieldArray name="subServiceList">
                {({ remove, push }) => (
                  <div className="flex flex-col justify-start items-start mt-6 gap-5 text-gray-950 w-full ">
                    {values.subServiceList.map((item, index) => (
                      <div
                        className="flex flex-row justify-center items-center gap-5 w-full "
                        key={index}
                      >
                        <RxDragHandleDots2 className="text-gray-500 mt-4 scale-150" />
                      <div className="flex flex-col ">
                        <label
                          htmlFor={`subServiceList.${index}.subServiceName`}
                          className="text-gray-700"
                        >
                          ชื่อรายการ
                        </label>
                        <Field
                          className="input-default w-72"
                          name={`subServiceList.${index}.subServiceName`}
                          type="text"
                          />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor={`subServiceList.${index}.serviceUnit`}
                          className="text-gray-700"
                        >
                          หน่วยการบริการ
                        </label>
                        <Field
                          className="input-default w-72"
                          name={`friends.${index}.serviceUnit`}
                          type="number"
                          />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor={`subServiceList.${index}.serviceCharge`}
                          className="text-gray-700"
                        >
                          ค่าบริการ / 1 หน่วย
                        </label>
                        <div className="relative">
                          <Field
                            className="relative input-default w-72"
                            name={`subServiceList.${index}.serviceCharge`}
                            type="text"
                          />
                          <span className="absolute right-0 pr-3 pt-2.5 after:bg-transparent text-gray-500">฿</span>
                        </div>
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
                      className="btn-secondary w-48 mb-5"
                      onClick={() => push({ subServiceName: "", serviceCharge: "", serviceUnit: "" })}
                    >
                      เพิ่มรายการ +
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="w-full mt-10 border-b-2 border-gray-300"></div>
                <div className="flex flex-row items-center w-full pb-3 mt-10">
                  <div className="flex w-[180px]  text-gray-700">
                    สร้างเมื่อ
                  </div>
                  <div className="pl-[120px] w-full">
                    <div className="py-2 w-[433px] h-[44px] px-2">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center w-full mb-5">
                  <div className="flex w-[180px]  text-gray-700">
                    แก้ไขล่าสุด
                  </div>
                  <div className="pl-[120px] w-full">
                    <div className="py-2 w-[433px] h-[44px] px-2">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
          </div>
        )}
      </Formik>
      
      </div>
    </div>
    </>
  );
}

export default EditService
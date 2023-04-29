import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { RxDragHandleDots2 } from "react-icons/rx";
import SelectCategory from "./SelectCategory";
import UploadImage from "./UploadImage";
import useData from "../hooks/useData";
import { AddServiceNavbar } from "./AdminNavbar";

function AddService() {
  const initialValues = {
    serviceName: "",
    category: "",
    image: "",
    subServiceList: [
      {
        name: "",
        unit: "",
        price: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("กรุณาใส่ชื่อบริการ"),
    category: Yup.string().required("กรุณาเลือกหมวดหมู่"),
    image: Yup.mixed()
      .required("กรุณาใส่รูปภาพ")
      .test(
        "fileSize",
        "The file is too large",
        (value) => value && value.size <= 2000000
      )
      .test(
        "fileType",
        "Unsupported file type",
        (value) => value && ["image/jpeg", "image/png" ,"image/jpg"].includes(value.type)
      ),
      subServiceList: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("กรุณาใส่ชื่อบริการย่อย"),
          unit: Yup.string().required("กรุณาใส่หน่วยบริการ"),
          price: Yup.string().required("กรุณาใส่ราคาบริการ"),
        })
      )
      .min(1, "กรุณาเพิ่มรายการบริการย่อยอย่างน้อย 1 รายการ")
      .required("กรุณาใส่รายการบริการย่อย")
      .test(
        "len",
        "กรุณาเพิ่มรายการบริการย่อยอย่างน้อย 1 รายการ",
        (val) => val && val.length > 0
      ),
  });

  const { addService } = useData();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("serviceName", values.serviceName);
    formData.append("category_id", values.category);
    formData.append("image", values.image);
    values.subServiceList.forEach((subService, index) => {
      formData.append(`subServiceList[${index}][name]`, subService.name);
      formData.append(`subServiceList[${index}][unit]`, subService.unit);
      formData.append(`subServiceList[${index}][price]`, subService.price);
    });

    try {
      const result = await addService(formData);
      if(result === "This Service is already exist"){
        setErrors({
          category: "หมวดหมู่ที่ท่านเลือกมีบริการนี้แล้ว",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Error submitting form" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, submitForm, handleSubmit, formikProps }) => (
          <Form onSubmit={handleSubmit}>
            <AddServiceNavbar onConfirm={submitForm} />
            <div className=" bg-BG h-full w-full p-[5%]">
              <div className="flex flex-col justify-start border border-gray-300 rounded-lg bg-white w-full">
                <div className="ml-5 mr-5 flex flex-col justify-center">
                  <div className="h-[450px] flex flex-col justify-start items-start mt-6 ">
                    <div className="flex flex-row justify-center space-x-40 ">
                      <label
                        htmlFor="serviceName"
                        className="w-[100px] text-gray-700"
                      >
                        ชื่อบริการ
                        <label className="text-red">*</label>
                      </label>
                      <div className="flex flex-col items-end">
                        <Field
                          className="input-default w-[450px] text-gray-950"
                          id="serviceName"
                          name="serviceName"
                          type="text"
                        />
                        <ErrorMessage
                          name="serviceName"
                          component="div"
                          className="text-red"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <Field
                        name="category"
                        type="option"
                        component={SelectCategory}
                        formikProps={formikProps}
                      />
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red "
                      />
                    </div>

                    <Field
                      name="image"
                      type="file"
                      component={UploadImage}
                      formikProps={formikProps}
                    />
                  </div>
                  <div className="w-full mt-10 border-b-2 border-gray-300"></div>
                  <div className="mt-5">
                    <h1 className="text-gray-700 text-base font-medium">
                      รายการบริการย่อย
                    </h1>
                    <FieldArray name="subServiceList">
                      {({ remove, push }) => (
                        <div className="flex flex-col justify-start items-start mt-6 gap-5 text-gray-950 w-full ">
                          {values.subServiceList.map((item, index) => (
                            <div
                              className="flex flex-row justify-start items-start gap-5 w-full "
                              key={index}
                            >
                              <div className="flex flex-col ">
                                <label
                                  htmlFor={`subServiceList.${index}.name`}
                                  className="text-gray-700"
                                >
                                  ชื่อรายการ
                                </label>
                                <Field
                                  className="input-default w-72"
                                  name={`subServiceList.${index}.name`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`subServiceList.${index}.name`}
                                  component="div"
                                  className="text-red"
                                />
                              </div>

                              <div className="flex flex-col">
                                <label
                                  htmlFor={`subServiceList.${index}.unit`}
                                  className="text-gray-700"
                                >
                                  หน่วยการบริการ
                                </label>
                                <Field
                                  className="input-default w-72"
                                  name={`subServiceList.${index}.unit`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`subServiceList.${index}.unit`}
                                  component="div"
                                  className="text-red"
                                />
                              </div>

                              <div className="flex flex-col">
                                <label
                                  htmlFor={`subServiceList.${index}.price`}
                                  className="text-gray-700"
                                >
                                  ค่าบริการ / 1 หน่วย
                                </label>
                                <div className="relative">
                                  <Field
                                    className="relative input-default w-72"
                                    name={`subServiceList.${index}.price`}
                                    type="text"
                                  />
                                  <span className="absolute right-0 pr-3 pt-2.5 after:bg-transparent text-gray-500">
                                    ฿
                                  </span>
                                </div>
                                <ErrorMessage
                                  name={`subServiceList.${index}.price`}
                                  component="div"
                                  className="text-red"
                                />
                              </div>

                              <div className="">
                              {values.subServiceList.length > 1 ? (<button
                                  type="button"
                                  className="text-gray-400 text-base font-medium underline ml-5 mt-10"
                                  onClick={() => 
                                    {if(values.subServiceList.length > 1) {
                                      remove(index)
                                    }}
                                    }
                                >
                                  ลบรายการ
                                </button>) :
                                null
                                }
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn-secondary w-48 mb-5"
                            onClick={() =>
                              push({
                                name: "",
                                unit: "",
                                price: "",
                              })
                            }
                          >
                            เพิ่มรายการ +
                          </button>
                          {/* <ErrorMessage
                                    name="subServiceList"
                                    component="div"
                                    className="text-red"
                                  /> */}
                      </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddService;

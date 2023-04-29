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
import { DetailServiceNavbar } from "./AdminNavbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditService() {
  const param = useParams();
  // const formattedDate = now.toLocaleString();
  const now = new Date();

  const [initialValues, setInitialValues] = useState({
    name: "",
    category_id: "",
    image: "",
    category_name: "",
    subServiceList: [
      {
        name: "",
        unit: "",
        price: "",
      },
    ],
  });

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
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ),
    subServiceList: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("กรุณาใส่ชื่อบริการย่อย"),
          unit: Yup.string().required("กรุณาใส่หน่วยบริการ"),
          price: Yup.string().required("กรุณาใส่ราคาบริการ"),
        })
      )
      .required("กรุณาใส่รายการบริการย่อย"),
  });

  const { getService, itemObjects, editService, items } = useData();

  useEffect(() => {
    getService(param.service_id);
  }, []);

  useEffect(() => {
    setInitialValues(itemObjects);
  }, [itemObjects]);

  console.log(itemObjects);
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("image", values?.image);
    values.subServiceList.forEach((subService, index) => {
      formData.append(
        `subServiceList[${index}][service_id]`,
        initialValues.service_id
      );
      if (initialValues.subServiceList[index]?.sub_service_id) {
        formData.append(
          `subServiceList[${index}][sub_service_id]`,
          initialValues.subServiceList[index]?.sub_service_id
        );
      }
      formData.append(`subServiceList[${index}][name]`, subService.name);
      formData.append(`subServiceList[${index}][unit]`, subService.unit);
      formData.append(`subServiceList[${index}][price]`, subService.price);
    });

    try {
      editService(param.service_id, formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Error submitting form" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {initialValues.name && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            setFieldValue,
            submitForm,
            handleSubmit,
            formikProps,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DetailServiceNavbar onConfirm={submitForm} />
              <div className=" bg-BG h-full w-full p-[5%]">
                <div className="flex flex-col justify-start border border-gray-300 rounded-lg bg-white w-full">
                  <div className="ml-5 mr-5 flex flex-col justify-center">
                    <div className="h-[450px] flex flex-col justify-start items-start mt-6 border-b-2 border-gray-300 ">
                      <div className=" flex flex-row justify-center space-x-40 ">
                        <label
                          htmlFor="name"
                          className="w-[100px] text-gray-700"
                        >
                          ชื่อบริการ
                          <label className="text-red">*</label>
                        </label>
                        <Field
                          className="input-default border-none w-[450px] text-gray-950"
                          id="name"
                          name="name"
                          type="text"
                          disabled
                        />
                      </div>

                      <Field
                        name="category_id"
                        component={SelectCategory}
                        formikProps={formikProps}
                        disabled
                      />

                      <Field
                        name="image"
                        type="file"
                        component={UploadImage}
                        formikProps={formikProps}
                        readOnly
                      />
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
                                    className="input-default w-72 border-none"
                                    name={`subServiceList.${index}.name`}
                                    type="text"
                                    disabled
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
                                    className="input-default w-72 border-none"
                                    name={`subServiceList.${index}.unit`}
                                    type="text"
                                    disabled
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
                                      className="relative input-default w-72 border-none"
                                      name={`subServiceList.${index}.price`}
                                      type="text"
                                      disabled
                                    />
                                  </div>
                                  <ErrorMessage
                                    name={`subServiceList.${index}.price`}
                                    component="div"
                                    className="text-red"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    <div className="w-full mt-10 border-b-2 border-gray-300"></div>
                    <div className="flex flex-row items-center w-full pb-3 mt-10 text-gray-700">
                      <div className="flex w-[180px]">สร้างเมื่อ</div>
                      <div className="pl-[120px] w-full">
                        <div className="py-2 w-[433px] h-[44px] px-2">
                          12/02/2022 10:30PM
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center w-full mb-5 text-gray-700">
                      <div className="flex w-[180px] ">แก้ไขล่าสุด</div>
                      <div className="pl-[120px] w-full">
                        <div className="py-2 w-[433px] h-[44px] px-2">
                          <p>{now.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default EditService;

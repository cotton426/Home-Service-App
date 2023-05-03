import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { HiOutlineTrash } from "react-icons/hi";
import SelectCategory from "./SelectCategory";
import UploadImage from "./UploadImage";
import useData from "../hooks/useData";
import { EditServiceNavbar } from "./AdminNavbar";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DetailServiceNavbar } from "./AdminNavbar";
import { formatTime } from "../utils/timeUtils";
import AlertConfirmation from "./AlertConfirmation";

function EditService({ view }) {
  const param = useParams();
  const navigate = useNavigate()

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
    name: Yup.string().required("กรุณาใส่ชื่อบริการ"),
    category_id: Yup.string().required("กรุณาเลือกหมวดหมู่"),
    image: Yup.mixed()
      .nullable()
      .notRequired()
      .test("fileSize", "The file is too large", (value) => {
        return value.size <= 5 * 1024 * 1024 || typeof value === "string";
      })
      .test("fileType", "Unsupported file type", (value) => {
        return (
          ["image/jpeg", "image/png", "image/jpg"].includes(value.type) ||
          typeof value === "string"
        );
      }),
    subServiceList: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("กรุณาใส่ชื่อบริการย่อย"),
          unit: Yup.string().required("กรุณาใส่หน่วยบริการ"),
          price: Yup.string()
            .matches(/^[0-9]+$/, {
              message: "กรุณากรอกตัวเลขเท่านั้น",
              excludeEmptyString: true,
            })
            .required("กรุณาใส่ราคาบริการ"),
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

  const { getService, itemObjects, editService, deleteService } = useData();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    getService(param.service_id);
  }, []);

  useEffect(() => {
    setInitialValues(itemObjects);
  }, [itemObjects]);

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
    setItemToDelete(itemObjects);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Delete item", itemToDelete);
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
    deleteService(itemToDelete.service_id);
    navigate("/services")
  };


  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

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
      // if (initialValues.subServiceList[index]?.sub_service_id) {
      //   formData.append(
      //     `subServiceList[${index}][sub_service_id]`,
      //     initialValues.subServiceList[index]?.sub_service_id
      //   );
      // }
      formData.append(`subServiceList[${index}][name]`, subService.name);
      formData.append(`subServiceList[${index}][unit]`, subService.unit);
      formData.append(`subServiceList[${index}][price]`, subService.price);
    });

    try {
      editService(param.service_id, formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: "Error submitting form",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {initialValues.name && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, submitForm, handleSubmit, formikProps }) => (
            <Form onSubmit={handleSubmit}>
              {view ? (
                <DetailServiceNavbar />
              ) : (
                <EditServiceNavbar onConfirm={submitForm} />
              )}
              <div className=" bg-BG h-full w-full p-[5%]">
                <div className="flex flex-col justify-start border border-gray-300 rounded-lg bg-white w-full">
                  <div className="ml-5 mr-5 flex flex-col justify-center">
                    <div className="h-[450px] flex flex-col justify-start items-start mt-6 border-b-[1px] border-gray-300 ">
                      <div className=" flex flex-row justify-center space-x-40 ">
                        <label
                          htmlFor="name"
                          className="w-[100px] text-gray-700"
                        >
                          ชื่อบริการ
                          <label className="text-red">*</label>
                        </label>
                        <div className="flex flex-col items-end justify-end">
                          {view ? (
                            <div className="w-[450px] text-gray-950 ">
                              {itemObjects.name}
                            </div>
                          ) : (
                            <>
                              <Field
                                className="input-default w-[450px] text-gray-950"
                                id="name"
                                name="name"
                                type="text"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red"
                              />
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <Field
                          name="category_id"
                          type="option"
                          component={SelectCategory}
                          formikProps={formikProps}
                          view={view}
                        />
                        <ErrorMessage
                          name="category_id"
                          component="div"
                          className="text-red "
                        />
                      </div>

                      <div className="flex flex-col justify-center items-end cursor-pointer">
                        <Field
                          name="image"
                          type="file"
                          component={UploadImage}
                          formikProps={formikProps}
                          view={view}
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <h1 className="text-gray-700 text-base font-medium">
                        รายการบริการย่อย
                      </h1>

                      {view ? (
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
                                <div className="px-4 py-2.5 w-80">
                                  {values.subServiceList[index].name}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`subServiceList.${index}.unit`}
                                  className="text-gray-700"
                                >
                                  หน่วยการบริการ
                                </label>
                                <div className="px-4 py-2.5 w-72">
                                  {values.subServiceList[index].unit}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`subServiceList.${index}.price`}
                                  className="text-gray-700"
                                >
                                  ค่าบริการ / 1 หน่วย
                                </label>{" "}
                                <div className="px-4 py-2.5 w-72">
                                  {values.subServiceList[index].price} ฿
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <FieldArray name="subServiceList">
                          {({ remove, push }) => (
                            <div className="flex flex-col justify-start items-start mt-6 gap-5 text-gray-950 w-full ">
                              {values.subServiceList?.map((item, index) => (
                                <div
                                  className="flex flex-row justify-start items-start gap-5 w-full "
                                  key={index}
                                >
                                  {console.log(item)}
                                  <div className="flex flex-col ">
                                    <label
                                      htmlFor={`subServiceList.${index}.name`}
                                      className="text-gray-700"
                                    >
                                      ชื่อรายการ
                                    </label>

                                    <>
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
                                    </>
                                  </div>

                                  <div className="flex flex-col">
                                    <label
                                      htmlFor={`subServiceList.${index}.unit`}
                                      className="text-gray-700"
                                    >
                                      หน่วยการบริการ
                                    </label>

                                    <>
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
                                    </>
                                  </div>

                                  <div className="flex flex-col">
                                    <label
                                      htmlFor={`subServiceList.${index}.price`}
                                      className="text-gray-700"
                                    >
                                      ค่าบริการ / 1 หน่วย
                                    </label>

                                    <>
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
                                    </>
                                  </div>

                                  <div className="">
                                    {!view &&
                                      values.subServiceList.length > 1 && (
                                        <button
                                          type="button"
                                          className="text-blue-600 text-base font-medium underline ml-5 mt-10"
                                          onClick={() => {
                                            if (
                                              values.subServiceList.length > 1
                                            ) {
                                              remove(index);
                                            }
                                          }}
                                        >
                                          ลบรายการ
                                        </button>
                                      )}
                                  </div>
                                </div>
                              ))}
                              {!view && (
                                <button
                                  type="button"
                                  className="btn-secondary w-48  mt-5 mb-5"
                                  onClick={() => {
                                    push({
                                      name: "",
                                      unit: "",
                                      price: "",
                                    });
                                  }}
                                >
                                  เพิ่มรายการ +
                                </button>
                              )}
                            </div>
                          )}
                        </FieldArray>
                      )}
                    </div>
                    <div className="w-full mt-10 border-b-[1px] border-gray-300"></div>
                    <div className="flex flex-row items-center w-full pb-3 mt-10 text-gray-700">
                      <div className="flex w-[180px]">สร้างเมื่อ</div>
                      <div className="pl-[120px] w-full">
                        <div className="py-2 w-[433px] h-[44px] px-2">
                          {formatTime(itemObjects.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center w-full mb-5 text-gray-700">
                      <div className="flex w-[180px] ">แก้ไขล่าสุด</div>
                      <div className="pl-[120px] w-full">
                        <div className="py-2 w-[433px] h-[44px] px-2">
                          {formatTime(itemObjects.updated_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    {view ? null : (
                  <div className="flex text-gray-600 py-5 justify-end ">
                    <div
                      className="flex items-center hover:cursor-pointer"
                      onClick={handleDelete}
                    >
                      <HiOutlineTrash className="scale-110 mr-3" />

                      <span className="underline font-medium">ลบบริการ</span>
                    </div>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
      {showDeleteConfirmation && (
        <AlertConfirmation
          itemToDelete={itemToDelete}
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </>
  );
}

export default EditService;

export const ViewService = () => {
  return <EditService view={true} />;
};

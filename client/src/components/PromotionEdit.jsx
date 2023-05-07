import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditPromotionNavbar } from "./AdminNavbar";
import useData from "../hooks/useData";
import { useParams } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { formatTime } from "../utils/timeUtils";
import AlertConfirmation from "./AlertConfirmation";

const ClearDisabledInput = ({ type, setFieldValue }) => {
  useEffect(() => {
    if (type === "Fixed") {
      setFieldValue("percentage", "");
    } else if (type === "Percent") {
      setFieldValue("fixedAmount", "");
    }
  }, [type, setFieldValue]);
  return null;
};

export const EditPromotion = () => {
  const today = new Date();
  const tomorrow = new Date();
  const { promotion_id } = useParams(); 

  const [promotion, setPromotion] = useState(null);
  const { getPromotion, updatePromotion, deletePromotion } = useData();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  tomorrow.setDate(today.getDate() + 1);


  useEffect(() => {
    (async () => {
      const promotionData = await getPromotion(promotion_id);
      setPromotion(promotionData);
    })();
  }, [promotion_id]);

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
    setItemToDelete(promotion);
  };
  const confirmDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
    deletePromotion(itemToDelete.id);
    navigate("/promotions");
  };
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const EditPromotionSchema = Yup.object().shape({
    promotionCode: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    type: Yup.string().required("Required"),
    fixedAmount: Yup.lazy((value, schema) =>
      schema.parent.type === "Fixed"
        ? Yup.number()
            .min(0, "Amount should be greater than or equal to 0")
            .required("Fixed amount is required")
        : Yup.number().min(0, "Amount should be greater than or equal to 0")
    ),
    percentage: Yup.lazy((value, schema) =>
      schema.parent.type === "Percent"
        ? Yup.number()
            .min(0, "Percentage should be greater than or equal to 0")
            .max(100, "Percentage should be less than or equal to 100")
            .required("Percentage is required")
        : Yup.number()
            .min(0, "Percentage should be greater than or equal to 0")
            .max(100, "Percentage should be less than or equal to 100")
    ),
    usageLimit: Yup.number()
      .min(1, "Usage limit should be greater than or equal to 1")
      .required("Required"),
    expirationDate: Yup.date()
      .min(today, "กรุณาเลือกวันถัดไป")
      .required("Required"),
    expirationTime: Yup.string().required("Required"),
  });

  if (!promotion) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Formik
        initialValues={{
          promotionCode: promotion?.promotion_code || "",
          type: promotion?.type || "",
          fixedAmount: promotion?.type === "Fixed" ? promotion?.discount : "",
          percentage: promotion?.type === "Percent" ? promotion?.discount : "",
          usageLimit: promotion?.useable_quantity || "",
          expirationDate: promotion?.exp_date || "",
          expirationTime: promotion?.exp_time || "",
        }}
        validationSchema={EditPromotionSchema}
        onSubmit={async (values) => {
          const editedPromotionData = {
            promotionCode: values.promotionCode,
            type: values.type,
            fixedAmount: values.fixedAmount,
            percentage: values.percentage,
            usageLimit: values.usageLimit,
            expirationDate: values.expirationDate,
            expirationTime: values.expirationTime,
          };

          const result = await updatePromotion(
            promotion_id,
            editedPromotionData
          );
        }}
      >
        {({ handleSubmit, submitForm, setFieldValue, values }) => (
          <>
            <ClearDisabledInput
              type={values.type}
              setFieldValue={setFieldValue}
            />
            <div className="">
              <EditPromotionNavbar onConfirm={submitForm} />

              <div className="flex mx-auto text-gray-900 pl-[5%] pt-[5%] flex-col">
                <div className="px-6 py-10 bg-white w-[95%]">
                  <Form onSubmit={handleSubmit}>
                    <div className="flex pb-10">
                      <label className="mb-2 w-[253px]">
                        Promotion Code<span className="text-red">*</span>
                      </label>
                      <div>
                        <Field
                          // as="textarea"
                          type="text"
                          name="promotionCode"
                          className="input-default w-[400px]"
                        />

                        <ErrorMessage
                          name="promotionCode"
                          component="div"
                          className="text-red"
                        />
                      </div>
                    </div>

                    <div className="mb-2 flex items-start pb-10">
                      <label className="pt-[15px] w-[253px]">
                        ประเภท<span className="text-red">*</span>
                      </label>
                      <div>
                        <div className="flex pb-3">
                          <label
                            className={`ml-2 w-[100px] ${
                              values.type === "Percent" ? "text-gray-300" : ""
                            }`}
                          >
                            <Field
                              type="radio"
                              name="type"
                              className="mr-3"
                              value="Fixed"
                              checked={values.type === "Fixed"}
                              onChange={() => setFieldValue("type", "Fixed")}
                            />
                            Fixed
                          </label>
                          <div className="relative ">
                            <Field
                              type="number"
                              name="fixedAmount"
                              className="input-default"
                              disabled={values.type === "Percent"}
                            />
                            {values.type === "Percent" ? (
                              <span className="absolute z-1000 right-3 top-2 w-5 pl-2 pt-0.5 h-7  bg-gray-200 text-gray-500 ">
                                ฿
                              </span>
                            ) : (
                              <span className="absolute z-1000 right-3 top-2 w-5 pl-2 pt-0.5 h-7  bg-white text-gray-500 ">
                                ฿
                              </span>
                            )}
                          </div>
                          <ErrorMessage
                            name="fixedAmount"
                            component="div"
                            className="text-red"
                          />
                        </div>
                        <div className="flex">
                          <label
                            className={`ml-2 w-[100px] ${
                              values.type === "Fixed" ? "text-gray-300" : ""
                            }`}
                          >
                            <Field
                              type="radio"
                              name="type"
                              className="mr-3"
                              value="Percent"
                              checked={values.type === "Percent"}
                              onChange={() => setFieldValue("type", "Percent")}
                            />
                            Percent
                          </label>
                          <div className="relative ">
                            <Field
                              type="number"
                              name="percentage"
                              className="input-default"
                              disabled={values.type === "Fixed"}
                            />
                            {values.type === "Fixed" ? (
                              <span className="absolute z-1000 right-3 top-2 w-5 pl-2 pt-0.5 h-7  bg-gray-200 text-gray-500 ">
                                %
                              </span>
                            ) : (
                              <span className="absolute z-1000 right-3 top-2 w-5 pl-2 pt-0.5 h-7  bg-white text-gray-500 ">
                                %
                              </span>
                            )}
                            {/* <Field
                              type="text"
                              name="expirationDate"
                              className="input-default"
                              min={tomorrow.toISOString().slice(0, 10)}
                            /> */}
                          </div>
                          <ErrorMessage
                            name="percentage"
                            component="div"
                            className="text-red"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <label className="mb-2 w-[253px] pb-10">
                        โควค้าการใช้<span className="text-red">*</span>
                      </label>
                      <div>
                        <div className="relative">
                          <Field
                            type="text"
                            name="usageLimit"
                            className="input-default w-[400px]"
                          />
                          <span className="absolute right-0 pr-3 pt-2.5 after:bg-transparent text-gray-500">
                            ครั้ง
                          </span>
                        </div>
                        <ErrorMessage
                          name="usageLimit"
                          component="div"
                          className="text-red"
                        />
                      </div>
                    </div>

                    <div className="flex pb-10">
                      <label className="mb-2 w-[253px]">
                        วันหมดอายุ<span className="text-red">*</span>
                      </label>
                      <div className="flex">
                        <div className="mr-6">
                          <Field
                            type="date"
                            name="expirationDate"
                            className="input-default"
                          />
                          <ErrorMessage
                            name="expirationDate"
                            component="div"
                            className="text-red "
                          />
                        </div>
                        <div>
                          <Field
                            type="time"
                            name="expirationTime"
                            className="input-default"
                          />
                          <ErrorMessage
                            name="expirationTime"
                            component="div"
                            className="text-red"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-t-[1px] border-b-0 border-gray-200"></div>

                    <div className="flex pt-10 pb-8">
                      <div className="w-[253px]">สร้างเมื่อ</div>
                      <div>{formatTime(promotion.created_at)}</div>
                    </div>

                    <div className="flex">
                      <div className="w-[253px]">แก้ไขล่าสุด</div>
                      <div>{formatTime(promotion.updated_at)}</div>
                    </div>
                  </Form>
                </div>
                <div className="flex text-gray-600 py-5 justify-end pr-[5%]">
                  <div
                    id="delete"
                    className="cursor-pointer flex items-center"
                    onClick={handleDelete}
                  >
                    <HiOutlineTrash className="scale-110 mr-3" />
                    <div className="underline font-medium">
                      ลบ Promotion Code
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
      {showDeleteConfirmation && (
        <AlertConfirmation
          itemToDelete={itemToDelete}
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </>
  );
};

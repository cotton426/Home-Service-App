import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddPromotionNavbar } from "./AdminNavbar";
import useData from "../hooks/useData";

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

export const AddPromotion = () => {
  const { addPromotion } = useData();

  const AddPromotionSchema = Yup.object().shape({
    promotionCode: Yup.string()
      .min(2, "สั้นเกินไป")
      .max(50, "ยาวเกินไป")
      .required("กรุณากรอก Promotion Code"),
    type: Yup.string().required("กรุณากรอกประเภท"),
    fixedAmount: Yup.lazy((value, schema) =>
      schema.parent.type === "Fixed"
        ? Yup.number()
            .min(0, "กรุณากรอกตัวเลขที่ีมากกว่าหรือเท่ากับ 0")
            .required("กรุณากรอกตัวเลข")
        : Yup.number().min(0, "กรุณากรอกตัวเลขที่ีมากกว่าหรือเท่ากับ 0")
    ),
    percentage: Yup.lazy((value, schema) =>
      schema.parent.type === "Percent"
        ? Yup.number()
            .min(0, "กรุณากรอกตัวเลขที่ีมากกว่าหรือเท่ากับ 0")
            .max(99, "กรุณากรอกตัวเลขที่ีน้อยกว่า 100")
            .required("กรุณากรอกตัวเลข")
        : Yup.number()
            .min(0, "กรุณากรอกตัวเลขที่ีมากกว่าหรือเท่ากับ 0")
            .max(100, "กรุณากรอกตัวเลขที่ีน้อยกว่า 100")
    ),
    usageLimit: Yup.number()
      .min(1, "จำนวนโควต้าการใช้งานควรมากกว่า 1")
      .required("กรุณากรอกจำนวนครั้ง"),
    expirationDate: Yup.date().required("กรุณากรอกวันหมดอายุ"),
    expirationTime: Yup.string().required("กรุณากรอกเวลาหมดอายุ"),
  });

  return (
    <>
      <Formik
        initialValues={{
          promotionCode: "",
          type: "Fixed",
          fixedAmount: "",
          percentage: "",
          usageLimit: "",
          expirationDate: "",
          expirationTime: "",
        }}
        validationSchema={AddPromotionSchema}
        onSubmit={async (values, { setErrors }) => {
          const promotionData = {
            promotionCode: values.promotionCode.trim(),
            type: values.type,
            fixedAmount: values.fixedAmount,
            percentage: values.percentage,
            usageLimit: values.usageLimit,
            expirationDate: values.expirationDate,
            expirationTime: values.expirationTime,
          };

          const result = await addPromotion(promotionData);
          if (result === "Promotion code already exists.") {
            setErrors({
              promotionCode: "Promotion code ถูกใช้งานแล้ว",
            });
          }
        }}
      >
        {({ handleSubmit, submitForm, setFieldValue, values, setErrors }) => (
          <>
            <ClearDisabledInput
              type={values.type}
              setFieldValue={setFieldValue}
            />
            <div className="">
              <AddPromotionNavbar onConfirm={submitForm} />

              <div className="flex mx-auto text-gray-900 ">
                <div className="m-[5%] px-6 py-10 bg-white w-[100%]">
                  <Form onSubmit={handleSubmit}>
                    <div className="flex pb-10">
                      <label className="mb-2 w-[253px]">
                        Promotion Code<span className="text-red">*</span>
                      </label>
                      <div>
                        <Field
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
                        {" "}
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
                          <div className="flex items-center pl-3">
                            <ErrorMessage
                              name="fixedAmount"
                              component="div"
                              className="text-red"
                            />
                          </div>
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
                          </div>
                          <div className="flex items-center pl-3">
                            <ErrorMessage
                              name="percentage"
                              component="div"
                              className="text-red"
                            />
                          </div>
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

                    <div className="flex mb-2">
                      <label className="mb-2 w-[253px]">
                        วันหมดอายุ<span className="text-red">*</span>
                      </label>
                      <div className="flex ">
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
                  </Form>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

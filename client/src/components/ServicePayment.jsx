import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { MdOutlineQrCode2 } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";
import { useState, useEffect } from "react";

const AutoSubmit = ({ setInitialValues }) => {
  const { values, submitForm } = useFormikContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialValues(values);
      if (
        values.creditNumber !== "" &&
        values.creditName !== "" &&
        values.dateOfExpiry !== "" &&
        values.code !== ""
      ) {
        submitForm();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [values, submitForm]);
  return null;
};

function ServicePayment({ initialValues, setInitialValues }) {
  console.log(initialValues);

  function formatCreditCardNumber(event) {
    // Get the input value and remove all non-numeric characters
    let input = event.target.value.replace(/\D/g, "");

    // Add a space after every 4 characters
    input = input.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Set the formatted value back to the input field
    event.target.value = input;
  }

  const validationSchema = Yup.object().shape({
    creditNumber: Yup.string()
      .matches(
        /^[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}$/,
        "หมายเลขบัตรเครดิตต้องเป็นตัวเลข 16 หลัก"
      )
      .required("กรุณากรอกหมายเลขบัตรเครดิต"),
    creditName: Yup.string().required("กรุณากรอกชื่อบนบัตร"),
    dateOfExpiry: Yup.string()
      .matches(
        /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        "กรุณากรอกวันหมดอายุในรูปแบบ MM/YY"
      )
      .required("กรุณากรอกวันหมดอายุ"),
    code: Yup.string().required("กรุณากรอกรหัส CVC / CVV*"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setInitialValues(values);
        }}
      >
        {({values, setValues}) => (
          <Form className="w-3/5 ">
            <div className="box flex flex-col p-8 gap-4">
              <h1 className="text-gray-700 font-normal text-xl">ชำระเงิน</h1>

              <div className="flex flex-row justify-between">
                <button
                  className="select-box flex flex-col justify-center items-center text-center gap-2"
                  type="checkbox"
                >
                  <MdOutlineQrCode2
                    id="MdOutlineQrCode2"
                    className="text-3xl"
                  />
                  <div className="font-semibold text-sm">พร้อมเพย์</div>
                </button>
                <button
                  className="select-box flex flex-col justify-center items-center text-center gap-2"
                  type="checkbox"
                >
                  <MdCreditCard className="text-3xl" />
                  <div className="font-semibold text-sm">บัตรเครดิต</div>
                </button>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <div className="flex text-gray-900 font-medium">
                  หมายเลขบัตรเครดิต<span className="text-red">*</span>
                </div>
                <div className="w-full">
                  <Field
                    type="text"
                    name="creditNumber"
                    maxLength="19"
                    placeholder="กรุณากรอกหมายเลขบัตรเครดิต"
                    className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
                    onKeyUp={formatCreditCardNumber}
                  />

                  <ErrorMessage
                    name="creditNumber"
                    component="p"
                    className="text-red"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <div className="flex text-gray-900 font-medium">
                  ชื่อบนบัตร<span className="text-red">*</span>
                </div>
                <div className="w-full">
                  <Field
                    type="text"
                    name="creditName"
                    placeholder="กรุณากรอกชื่อบนบัตร"
                    className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
                  />
                  <ErrorMessage
                    name="creditName"
                    component="p"
                    className="text-red"
                  />
                </div>
              </div>
              <div className="w-full flex flex-row justify-between items-start gap-1">
                <div className="w-[48%] flex flex-col justify-center items-start">
                  <div className="flex text-gray-900 font-medium">
                    วันหมดอายุ<span className="text-red">*</span>
                  </div>
                  <div className="w-full">
                    <Field
                      type="text"
                      name="dateOfExpiry"
                      placeholder="MM/YY"
                      maxLength="5"
                      className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
                      onChange={(event) => {
                        const { name, value } = event.target;
                        let formattedValue = value;

                        // Remove all non-numeric characters from the input value
                        formattedValue = formattedValue.replace(/[^\d]/g, "");

                        // Add the slash between month and year if the user has entered two characters
                        if (formattedValue.length > 2) {
                          formattedValue = `${formattedValue.slice(
                            0,
                            2
                          )}/${formattedValue.slice(2)}`;
                        }

                        setValues({ ...values, [name]: formattedValue });
                      }}
                    />

                    <ErrorMessage
                      name="dateOfExpiry"
                      component="p"
                      className="text-red"
                    />
                  </div>
                </div>
                <div className="w-[48%] flex flex-col justify-center items-startgap-1">
                  <div className="flex text-gray-900 font-medium">
                    รหัส CVC / CVV<span className="text-red">*</span>
                  </div>
                  <div className="w-full">
                    <Field
                      // value={initialValues.code}
                      type="text"
                      name="code"
                      placeholder="xxx"
                      maxLength="3"
                      className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
                      // onChange={handleChange}
                    />
                    <ErrorMessage
                      name="code"
                      component="p"
                      className="text-red"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start items-end">
                <div className="w-[48%] flex flex-col justify-center items-startgap-1">
                  <div className="flex text-gray-900 font-medium">
                    Promotion Code
                  </div>
                  <div className="w-full">
                    <Field
                      // value={initialValues.PromotionCode}
                      type="text"
                      name="PromotionCode"
                      placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
                      maxLength="3"
                      className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <button className="btn-primary h-[44px] w-[90px] ml-7">
                  ใช้โค้ด
                </button>
              </div>
            </div>
            <AutoSubmit setInitialValues={setInitialValues} />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ServicePayment;

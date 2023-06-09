import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { MdOutlineQrCode2 } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";
import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";

const AutoSubmit = ({ setInitialValues, promotionApplied }) => {
  const { values, submitForm } = useFormikContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialValues(values);
      if (
        values.creditNumber !== "" &&
        values.creditName !== "" &&
        values.dateOfExpiry !== "" &&
        values.code !== "" &&
        values.promotionCode !== "" &&
        promotionApplied 
      ) {
        submitForm();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [values, submitForm, promotionApplied]); 
};

function ServicePayment({
  initialValues,
  setInitialValues,
  setDiscount,
  setDiscountType,
  paymentError,
  setPromotion,
}) {
  const { checkPromotion } = useUser();
  const [promotionState, setPromotionState] = useState({
    code: "",
    applied: false,
    error: "",
  });
  const [promotionCode, setPromotionCode] = useState("");
  const [promotionApplied, setPromotionApplied] = useState(false);

  function formatCreditCardNumber(event) {
    let input = event.target.value.replace(/\D/g, "");
    input = input.replace(/(\d{4})(?=\d)/g, "$1 ");
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
    code: Yup.string()
      .required("กรุณากรอกรหัส CVC / CVV*")
      .matches(/^[0-9]{3}$/, "กรุณากรอกรหัส CVC / CVV ที่มีความยาว 3 ตัวเลข"),
  });

  const [promotionCodeError, setPromotionCodeError] = useState("");

  const handlePromotionCodeSubmit = async () => {
    const promotionResult = await checkPromotion(promotionCode);
    const { valid, discount, message, type } = promotionResult;
    if (valid) {

      setDiscount(discount);
      setPromotionCodeError("");
      setPromotionApplied(true);
      setDiscountType(type);
      setPromotion(promotionResult);

      
    } else {
      setPromotionCodeError(message);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setInitialValues(values);
        }}
      >
        {({ values, setValues }) => (
          <div className="w-3/5 box flex flex-col p-8 gap-4 ">
            <Form className="">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-700 font-normal text-xl">ชำระเงิน</h1>
                <div className="select-box h-[86px] w-full flex flex-col justify-center items-center text-center gap-2">
                  <MdCreditCard className="text-3xl" />
                  <div className="font-semibold text-sm">บัตรเครดิต</div>
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
                    {paymentError.includes("number") && (
                      <p className="text-red">หมายเลขบัตรเครดิตไม่ถูกต้อง</p>
                    )}
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
                          formattedValue = formattedValue.replace(/[^\d]/g, "");
                          if (formattedValue.length > 2) {
                            formattedValue = `${formattedValue.slice(
                              0,
                              2
                            )}/${formattedValue.slice(2)}`;
                          }
                          setValues({ ...values, [name]: formattedValue });
                        }}
                      />
                      {paymentError.includes("exp") && (
                        <p className="text-red">กรุณาตรวจสอบวันหมดอายุ</p>
                      )}
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
                        type="text"
                        name="code"
                        placeholder="xxx"
                        maxLength="3"
                        className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
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
                        id="promotion-code-input"
                        value={promotionCode}
                        type="text"
                        name="promotionCode"
                        placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
                        className={`border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none ${
                          promotionApplied ? "text-gray-600" : ""
                        }`}
                        onChange={(e) => {
                          setPromotionCode(e.target.value);
                          if (promotionApplied) {
                            setPromotionApplied(false);
                          }
                          setPromotionCodeError("");
                        }}
                      />
                      <div className="absolute text-red mt-1">
                        {promotionCodeError}
                      </div>
                    </div>
                  </div>
                  {!promotionApplied && (
                    <button
                      type="button"
                      className="btn-primary h-[44px] w-[90px] ml-7"
                      onClick={handlePromotionCodeSubmit}
                    >
                      ใช้โค้ด
                    </button>
                  )}
                </div>
              </div>
              <AutoSubmit
                setInitialValues={setInitialValues}
                promotionApplied={promotionApplied}
              />
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default ServicePayment;

import React from "react";
import useData from "../hooks/useData";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdOutlineQrCode2 } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";

function ServicePayment() {
  const initialValues = {
    creditNumber: "",
    creditName: "",
    dateOfExpiry: "",
    code: "",
  };

  const validationSchema = Yup.object().shape({
    creditNumber: Yup.string().required("กรุณากรอกหมายเลขบัตรเครดิต"),
    creditName: Yup.string().required("กรุณากรอกชื่อบนบัตร"),
    dateOfExpiry: Yup.string().required("กรุณากรอกวันหมดอายุ"),
    code: Yup.string()
    .required("กรุณากรอกรหัส CVC / CVV*")
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const result = await addCategory({
      name: values.name,
    });
    const errorMessage = result.response.data.error;
    if (errorMessage.includes("unique")) {
      setErrors({ name: "" });
    }
    setSubmitting(false);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-row w-full h-full p-[10%] bg-BG">
              <div className="box w-[750px] h-[500px] flex flex-col p-8 gap-4">
                <h1 className="text-gray-500 font-normal text-xl">ชำระเงิน</h1>
                <div className="flex flex-row justify-between">
                  <button className="select-box flex flex-col justify-center items-center text-center gap-2 ">
                    <MdOutlineQrCode2 id="MdOutlineQrCode2" className="text-3xl" />
                    <div className="font-semibold text-sm">
                      พร้อมเพ
                    </div>
                  </button>
                  <button className="select-box flex flex-col justify-center items-center text-center gap-2">
                    <MdCreditCard className="text-3xl" />
                    <div className="font-semibold text-sm">
                      บัตรเครดิต
                    </div>
                  </button>
                </div>
                <div className="w-full flex flex-col justify-center items-start">
                  <div className="flex text-gray-900">
                  หมายเลขบัตรเครดิต<span className="text-red">*</span>
                  </div>
                  <div className="w-full">
                    <Field
                      type="text"
                      name="creditNumber"
                      placeholder="กรุณากรอกหมายเลขบัตรเครดิต"
                      className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
                    />
                    <ErrorMessage
                      name="creditNumber"
                      component="div"
                      className="text-red"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center items-start">
                  <div className="flex text-gray-900">
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
                      component="div"
                      className="text-red"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between items-start ">
                  <div className="w-[48%] flex flex-col justify-center items-start">
                    <div className="flex text-gray-900">
                      วันหมดอายุ<span className="text-red">*</span>
                    </div>
                    <div className="w-full">
                      <Field
                        type="text"
                        name="dateOfExpiry"
                        placeholder="MM/YY"
                        className="border border-gray-300 py-2 w-full h-[44px] px-2 rounded-lg focus:outline-none"
                      />
                      <ErrorMessage
                        name="dateOfExpiry"
                        component="div"
                        className="text-red"
                      />
                    </div>
                  </div>
                  <div className="w-[48%] flex flex-col justify-center items-start">
                    <div className="flex text-gray-900">
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
                        component="div"
                        className="text-red"
                      />
                    </div>
                  </div>
                </div>
            <button
              type="submit"
              className="btn-primary mt-6"
              disabled={isSubmitting}
            >
              ลงทะเบียน
            </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ServicePayment;

import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddPromotionNavbar } from "./AdminNavbar";
import useData from "../hooks/useData";

const ClearDisabledInput = ({ type, setFieldValue }) => {
  useEffect(() => {
    if (type === "fixed") {
      setFieldValue("percentage", "");
    } else if (type === "percent") {
      setFieldValue("fixedAmount", "");
    }
  }, [type, setFieldValue]);

  return null;
};

export const AddPromotion = () => {
  const { addPromotion } = useData();

  const AddPromotionSchema = Yup.object().shape({
    promotionCode: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    type: Yup.string().required("Required"),
    fixedAmount: Yup.lazy((value, schema) =>
      schema.parent.type === "fixed"
        ? Yup.number()
            .min(0, "Amount should be greater than or equal to 0")
            .required("Fixed amount is required")
        : Yup.number().min(0, "Amount should be greater than or equal to 0")
    ),
    percentage: Yup.lazy((value, schema) =>
      schema.parent.type === "percent"
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
    expirationDate: Yup.date().required("Required"),
    expirationTime: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          promotionCode: "",
          type: "fixed",
          fixedAmount: "",
          percentage: "",
          usageLimit: "",
          expirationDate: "",
          expirationTime: "",
        }}
        validationSchema={AddPromotionSchema}
        onSubmit={async (values) => {
          console.log("Promotion data:", values);
          const promotionData = {
            promotionCode: values.promotionCode,
            type: values.type,
            fixedAmount: values.fixedAmount,
            percentage: values.percentage,
            usageLimit: values.usageLimit,
            expirationDate: values.expirationDate,
            expirationTime: values.expirationTime,
          };

          const result = await addPromotion(promotionData);

          if (result.success) {
            alert(result.message);
          } else {
            alert(result.message);
          }
        }}
      >
        {({ handleSubmit, submitForm, setFieldValue, values }) => (
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
                      <label className="mb-2 w-[253px]">Promotion Code:</label>
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
                      <label className="pt-[15px] w-[253px]">Type:</label>
                      <div>
                        <div className="flex pb-3">
                          <label
                            className={`ml-2 w-[100px] ${
                              values.type === "percent" ? "text-gray-300" : ""
                            }`}
                          >
                            <Field
                              type="radio"
                              name="type"
                              className="mr-3"
                              value="fixed"
                              checked={values.type === "fixed"}
                              onChange={() => setFieldValue("type", "fixed")}
                            />
                            Fixed
                          </label>
                          <Field
                            type="number"
                            name="fixedAmount"
                            className="input-default"
                            disabled={values.type === "percent"} // Disable when type is 'percent'
                          />
                          <ErrorMessage
                            name="fixedAmount"
                            component="div"
                            className="text-red"
                          />
                        </div>
                        <div className="flex">
                          <label
                            className={`ml-2 w-[100px] ${
                              values.type === "fixed" ? "text-gray-300" : ""
                            }`}
                          >
                            <Field
                              type="radio"
                              name="type"
                              className="mr-3"
                              value="percent"
                              checked={values.type === "percent"}
                              onChange={() => setFieldValue("type", "percent")}
                            />
                            Percent
                          </label>
                          <Field
                            type="number"
                            name="percentage"
                            className="input-default"
                            disabled={values.type === "fixed"} // Disable when type is 'fixed'
                          />
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
                        Usage Limit (times):
                      </label>
                      <div>
                        <Field
                          type="text"
                          name="usageLimit"
                          className="input-default w-[400px]"
                        />
                        <ErrorMessage
                          name="usageLimit"
                          component="div"
                          className="text-red"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex mb-2">
                        <label className="mb-2 w-[253px]">
                          Expiration Date:
                        </label>
                        <div className="flex">
                          <div>
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

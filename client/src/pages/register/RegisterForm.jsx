import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";

const FormField = ({ label, id, name, type, placeholder, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {label}
        <label className="text-red">*</label>
      </label>
      <Field
        type={type}
        id={id}
        name={name}
        className="input-default"
        placeholder={placeholder}
        onChange={onChange}
      />
      <ErrorMessage name={name} component="p" className="error-massage" />
    </div>
  );
};

function RegisterForm() {
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    agree: false,
  };
  const { register } = useAuth();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .transform((value) => value.replace(/\D/g, ""))
      .matches(
        /^0\d{9}$/,
        "phone number must start with 0 and be 10 digits long"
      )
      .required("phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must have at least one lowercase letter")
      .matches(/[A-Z]/, "Password must have at least one uppercase letter")
      .matches(/\d/, "Password must have at least one number")
      .matches(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        "Password must have at least one special character"
      )
      .required("Password is required"),
    agree: Yup.boolean().oneOf([true], "You must accept the Privacy Policy"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    register(values);
    setSubmitting(false);
  };
  const formFields = [
    {
      label: "ชื่อ นามสกุล",
      name: "fullName",
      type: "text",
      placeholder: "กรุณากรอกชื่อ นามสกุล",
    },
    {
      label: "เบอร์โทรศัพท์",
      name: "phoneNumber",
      type: "tel",
      placeholder: "กรุณากรอกเบอร์โทรศัพท์",
    },
    {
      label: "อีเมล",
      name: "email",
      type: "email",
      placeholder: "กรุณากรอกอีเมล",
    },
    {
      label: "รหัสผ่าน",
      name: "password",
      type: "password",
      placeholder: "กรุณากรอกรหัสผ่าน",
    },
  ];

  return (
    <div className="flex w-screen justify-center pt-[5%] ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, handleChange }) => (
          <Form className="flex flex-col bg-white w-[45%] px-[5%] py-[2%] border border-gray-300 rounded-lg">
            <h1 className="text-center font-medium text-blue-950 text-4xl">
              ลงทะเบียน
            </h1>
            {formFields.map((field) => (
              <FormField
                key={field.name}
                {...field}
                onChange={
                  field.name === "phoneNumber"
                    ? (event) => {
                        const formattedValue = event.target.value.replace(
                          /\D/g,
                          ""
                        );
                        if (formattedValue.length <= 10) {
                          setFieldValue("phoneNumber", formattedValue);
                        }
                      }
                    : handleChange
                }
              />
            ))}
            <div className="flex items-center mt-4">
              <Field
                type="checkbox"
                id="agree"
                name="agree"
                className=" mr-2 scale-150 "
              />
              <label
                htmlFor="agree"
                className=" text-gray-900 text-base font-normal pt-0"
              >
                ยอมรับ
                <Link to="/register" className="btn-ghost">
                  ข้อตกลงและเงื่อนไข
                </Link>
                และ
                <Link to="/register" className="btn-ghost">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </label>
            </div>
            <ErrorMessage
              name="agree"
              component="p"
              className="error-massage"
            />
            <button
              type="submit"
              className="btn-primary mt-6"
              disabled={isSubmitting}
            >
              ลงทะเบียน
            </button>
            <Link to="/login" className="btn-ghost text-center mt-5">
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";

const FormField = ({ label, id, name, type, placeholder, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}<label className="text-red">*</label></label>
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

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
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
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const result = await login(values);
      if (!result?.success) {
        setErrors({ password: "Incorrect email or password" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-screen justify-center pt-[5%]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleChange }) => (
          <Form className="flex flex-col bg-white w-[45%] px-[5%] py-[2%] border border-gray-300 rounded-lg">
            <h1 className="text-center font-medium text-blue-950 text-4xl">
              Login
            </h1>
            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <FormField
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn-primary mt-6"
              disabled={isSubmitting}
            >
              Login
            </button>
            <span className="text-gray-700 mt-5 font-normal text-base text-center">
              ยังไม่มีบัญชีผู้ใช้ HomeService?
              <Link to="/register" className="btn-ghost">
                ลงทะเบียน
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;

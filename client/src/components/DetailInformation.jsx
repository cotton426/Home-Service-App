import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DetailInformation = () => {
  const [inputValues, setInputValues] = useState({
    date: "",
    time: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    note: "",
  });

  const handleInputChange = (e) => {
    setInputValues({
      [e.target.name]: e.target.value,
    });
    console.log(setInputValues);
  };

  const DetailForm = ({ label, id, name, type, placeholder, onChange }) => {
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

  const formFields = [
    {
      label: "วันที่สะดวกใช้บริการ",
      name: "date",
      type: "date",
      placeholder: "กรุณาเลือกวันที่",
    },
    {
      label: "เวลาที่สะดวกใช้บริการ",
      name: "time",
      type: "time",
      component: TimePicker,
      placeholder: "กรุณากรอกเวลา",
    },
    {
      label: "ที่อยู่",
      name: "address",
      type: "text",
      placeholder: "กรุณากรอกที่อยู่",
    },
    {
      label: "แขวง / ตำบล",
      name: "subdistrict",
      type: "text",
      placeholder: "เลือกแขวง / ตำบล",
    },
    {
      label: "เขต / อำเภอ",
      name: "district",
      type: "text",
      placeholder: "เลือกเขต / อำเภอ",
    },
    {
      label: "จังหวัด",
      name: "province",
      type: "text",
      placeholder: "เลือกจังหวัด",
    },
    {
      label: "ระบุข้อมูลเพิ่มเติม",
      name: "note",
      type: "text",
      placeholder: "กรุณาระบุข้อมูลเพิ่มเติม",
    },
  ];

  return (
    <div className="w-3/5 flex box">
      <h1 className="w-[735px] h-[568px]  pt-6 pl-6">
        <p className="pb-9">กรอกข้อมูล</p>
        <Formik
          initialValues={inputValues}
          validationSchema={Yup.object().shape({
            date: Yup.date().min(new Date()).required("กรุณากรอกวันที่"),
            time: Yup.string().required("กรุณากรอกเวลา"),
            address: Yup.string().required("กรุณากรอกที่อยู่"),
            subdistrict: Yup.string().required("กรุณากรอกแขวง/ตำบล"),
            district: Yup.string().required("กรุณากรอกเขต/อำเภอ"),
            province: Yup.string().required("กรุณากรอกจังหวัด"),
          })}
        >
          <Form className="grid grid-cols-2 gap-4 mt-8">
            {formFields.map((field, errors, touched) => (
              <div key={field.name} className="flex flex-col">
                <label htmlFor={field.name}>
                  {field.label}
                  {field.name !== "note" && (
                    <label className="text-red">*</label>
                  )}
                </label>
                <Field
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  className="input-default"
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  {...(field.type === "date" && {
                    min: new Date().toISOString().slice(0, 10),
                    onFocus: (e) => (e.target.type = "date"),
                    onBlur: (e) => (e.target.type = "text"),
                  })}
                  {...(field.type === "time" && {
                    onFocus: (e) => (e.target.type = "time"),
                    onBlur: (e) => (e.target.type = "text"),
                    min: "00:00",
                    max: "23:59",
                    step: 60,
                  })}
                />
                <ErrorMessage
                  name={field.name}
                  component="p"
                  className="error-massage"
                />
              </div>
            ))}
            <AutoSubmit
              inputValues={inputValues}
              setInputValues={setInputValues}
            />
          </Form>
        </Formik>
      </h1>
      <h2 className="w-[349px] h-[349px] mr-40 pt-4 pl-6">สรุปรายการ</h2>
    </div>
  );
};

export default DetailInformation;

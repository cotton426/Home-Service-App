import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TimePicker } from "antd";

const DetailInformation = () => {
  const [inputValues, setInputValues] = useState({
    date: "",
    time: new Date().toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    note: "",
  });

  console.log(setInputValues);

  const DetailForm = ({ label, id, name, type, placeholder }) => {
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
        />
        <ErrorMessage name={name} component="p" className="error-massage" />
      </div>
    );
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const validationSchema = Yup.object().shape({
    date: Yup.date().min(tomorrow).required("กรุณากรอกวันที่"),
    time: Yup.string().required("กรุณากรอกเวลา"),
    address: Yup.string().required("กรุณากรอกที่อยู่"),
    subdistrict: Yup.string().required("กรุณากรอกแขวง/ตำบล"),
    district: Yup.string().required("กรุณากรอกเขต/อำเภอ"),
    province: Yup.string().required("กรุณากรอกจังหวัด"),
  });

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
        <Formik initialValues={inputValues} validationSchema={validationSchema}>
          <Form className="grid grid-cols-2 gap-4 mt-8">
            {formFields.map((field, errors, touched) => (
              <div key={field.name} className="flex flex-col">
                <label htmlFor={field.name}>
                  {field.label}
                  <label className="text-red">*</label>
                </label>
                {field.component === TimePicker ? (
                  <Field
                    format="HH:mm"
                    type="text"
                    required
                    component={TimePicker}
                    name={field.name}
                    className="box h-11"
                    onChange={(time) => {
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        [field.name]: time ? time.format("HH:mm") : "",
                      }));
                    }}
                    placeholder={field.placeholder}
                    hideDisabledOptions={true}
                    disabledHours={() => {
                      const disabledHours = [];
                      for (let i = 0; i < 9; i++) {
                        disabledHours.push(i);
                      }
                      for (let i = 19; i < 24; i++) {
                        disabledHours.push(i);
                      }
                      return disabledHours;
                    }}
                    disabledMinutes={(selectedHour) => {
                      if (selectedHour === 18) {
                        return Array.from({ length: 60 }).map((_, i) =>
                          i < 0 || i > 0 ? i : null
                        );
                      }
                    }}
                  />
                ) : (
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="input-default"
                    placeholder={field.placeholder}
                    {...(field.type === "date" && {
                      type: "text",
                      min: tomorrow.toISOString().slice(0, 10),
                      onFocus: (e) => (e.target.type = "date"),
                    })}
                    // onChange={(e) => {
                    //   setInputValues({
                    //     ...values,
                    //     [field.name]: e.target.value,
                    //   });
                    // }}
                  />
                )}
                <ErrorMessage
                  name={field.name}
                  component="p"
                  className="error-massage"
                />
              </div>
            ))}
          </Form>
        </Formik>
      </h1>
      <h2 className="w-[349px] h-[349px] mr-40 pt-4 pl-6">สรุปรายการ</h2>
      <p></p>
    </div>
  );
};

export default DetailInformation;

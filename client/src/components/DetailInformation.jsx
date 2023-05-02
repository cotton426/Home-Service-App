import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { TimePicker } from "antd";

const AutoSubmit = () => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    // console.log(Object.values(values).includes(""));
    // console.log(Object.values(values));
    if (
      values.date !== "" &&
      values.time !== "" &&
      values.address !== "" &&
      values.subdistrict !== "" &&
      values.district !== "" &&
      values.province !== ""
    ) {
      submitForm();
      console.log(values);
    }
    if (values.note !== "") submitForm();
  }, [values]);
  return null;
};

const DetailInformation = ({ inputValues, setInputValues, handleChange }) => {
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
    <div className="w-3/5 flex box p-4">
      <p className="pb-9">กรอกข้อมูล</p>
      <Formik
        initialValues={inputValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("work");
          console.log(values);
          setInputValues(values);
        }}
      >
        {({ values, setFieldValue }) => (
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
                    value={inputValues.time}
                    name={field.name}
                    className="box h-11"
                    component={TimePicker}
                    placeholder={field.placeholder}
                    hideDisabledOptions={true}
                    allowClear={false}
                    clearIcon={false}
                    onChange={(time) => {
                      setInputValues({ ...inputValues, time: time });
                      setFieldValue("time", time);
                      setFieldValue("useTime", time.format("HH:mm"));
                    }}
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
                  />
                )}
                <ErrorMessage
                  name={field.name}
                  component="p"
                  className="error-massage"
                />
              </div>
            ))}
            <AutoSubmit />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DetailInformation;

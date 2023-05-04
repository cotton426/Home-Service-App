import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { TimePicker } from "antd";

const AutoSubmit = ({ inputValues, setInputValues }) => {
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputValues(values);
      if (
        values.date !== "" &&
        values.time !== "" &&
        values.address !== "" &&
        values.subdistrict !== "" &&
        values.district !== "" &&
        values.province !== ""
      ) {
        submitForm();
      }
      if (values.note !== "") submitForm();
    }, 500);
    return () => clearTimeout(timer);
  }, [values, submitForm]);
  return null;
};

const DetailInformation = ({ inputValues, setInputValues, handleChange }) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(today.getHours());
  tomorrow.setMinutes(today.getMinutes());

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .min(tomorrow, "กรุณาเลือกวันถัดไป")
      .required("กรุณากรอกวันที่"),
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
  ];

  return (
    <div className="w-3/5 flex flex-col box p-4">
      <p className="pb-9">กรอกข้อมูล</p>
      <Formik
        initialValues={inputValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          setInputValues(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-2 gap-4 ">
            {formFields.map((field, errors, touched) => (
              <div
                key={field.name}
                className="flex flex-col w-[95%] ml-5 mr-5 "
              >
                <label htmlFor={field.name}>
                  {field.label}
                  {field.name !== "note" && (
                    <label className="text-red">*</label>
                  )}
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
                    placeholderTextColor="text-gray-700"
                    hideDisabledOptions={true}
                    // allowClear={false}
                    // clearIcon={false}
                    onChange={(time) => {
                      setInputValues({ ...inputValues, time: time });
                      setFieldValue("time", time);
                      setFieldValue(
                        "useTime",
                        time ? time.format("HH:mm") : ""
                      );
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
                    className="input-default "
                    placeholder={field.placeholder}
                    {...(field.type === "date" && {
                      type: "date",
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
            <AutoSubmit
              inputValues={inputValues}
              setInputValues={setInputValues}
            />
          </Form>
        )}
      </Formik>
      <label htmlFor="note" className="ml-5">
        ระบุข้อมูลเพิ่มเติม
      </label>
      <div className="box h-24 ml-5 ">
        <input
          className="ml-2 w-[98%] px-3 focus:outline-none focus:border-transparent placeholder:text-gray-700 "
          type="text"
          as="textarea"
          placeholder="กรุณาระบุข้อมูลเพิ่มเติม"
        />
      </div>
    </div>
  );
};

export default DetailInformation;

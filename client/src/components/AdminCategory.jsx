import { useState } from "react";
import useData from "../hooks/useData";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { EditCategoryNavbar } from "./AdminNavbar";
import { useEffect } from "react";
import { formatTime } from "../utils/timeUtils";

export const AddCategory = () => {
  const { addCategory } = useData();

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("กรุณาตั้งชื่อหมวดหมู่"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const result = await addCategory({
      name: values.name,
    });
    const errorMessage = result.response.data.error;
    if (errorMessage.includes("unique")) {
      setErrors({ name: "ชื่อหมวดหมู่ซ้ำ กรุณาใส่ชื่อหมวดหมู่ใหม่" });
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
            <header className="bg-white h-[80px] px-10 py-3 border border-gray-300">
              <nav className="flex items-center justify-between h-full">
                <div
                  id="left-container"
                  className="font-medium text-xl text-black"
                >
                  เพิ่มหมวดหมู่
                </div>

                <div className="flex items-center ">
                  <div>
                    <Link to="/categories">
                      <button className="btn-primary">ยกเลิก</button>
                    </Link>
                  </div>

                  <div className="pl-6">
                    <button className="btn-primary" type="submit">
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </nav>
            </header>
            <div className="flex w-full h-full p-[5%]">
              <div className="text-black w-full h-[20%] border border-gray-200 bg-white flex justify-start items-center">
                <div className="flex pl-[4%] w-[180px] text-gray-700">
                  ชื่อหมวดหมู่<span className="text-red">*</span>
                </div>
                <div className="pl-[120px] w-full">
                  <Field
                    type="text"
                    name="name"
                    className="border border-gray-300 py-2 w-[40%] h-[44px] px-2 rounded-lg focus:outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const EditCategory = () => {
  const { getCategory, itemObjects, editCategory } = useData();
  const param = useParams();

  const [initialValues, setInitialValues] = useState({
    name: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    getCategory(param.category_id);
  }, []);

  useEffect(() => {
    setInitialValues(itemObjects);
  }, [itemObjects]);

  return (
    <>
      {initialValues.name && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            editCategory(param.category_id, values);
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, submitForm }) => (
            <Form onSubmit={handleSubmit}>
              <EditCategoryNavbar onConfirm={submitForm} />
              <div className="flex w-full h-full p-[5%]">
                <div className="text-black w-full h-[340px] border border-gray-200 bg-white flex flex-col justify-start items-center px-[5%]">
                  <div className="flex flex-row items-center w-full py-[50px]">
                    <div className="flex w-[180px] text-gray-700">
                      ชื่อหมวดหมู่<span className="text-red">*</span>
                    </div>
                    <div className="pl-[120px] w-full">
                      <Field
                        type="text"
                        name="name"
                        className="border border-gray-300 py-2 w-[433px] h-[44px] px-2 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div id="line" className="w-full mb-[40px]">
                    <hr className="bg-gray-300 border-0 h-[1px] w-full"></hr>
                  </div>
                  <div className="flex flex-row items-center w-full pb-3">
                    <div className="flex w-[180px] text-gray-700">
                      สร้างเมื่อ
                    </div>
                    <div className="pl-[120px] w-full">
                      <div className="py-2 w-[433px] h-[44px] px-2">
                        {formatTime(itemObjects.created_at)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <div className="flex w-[180px] text-gray-700">
                      แก้ไขล่าสุด
                    </div>
                    <div className="pl-[120px] w-full">
                      <div className="py-2 w-[433px] h-[44px] px-2">
                        {formatTime(itemObjects.updated_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export const DetailCategory = () => {
  return (
    <div className="flex w-full h-full p-[5%]">
      <div className="text-black w-full h-[340px] border border-gray-200 bg-white flex flex-col justify-start items-center px-[5%]">
        <div className="flex flex-row items-center w-full py-[50px]">
          <div className="flex w-[180px]  text-gray-700">ชื่อหมวดหมู่</div>
          <div className="pl-[120px] w-full">
            <div className="py-2 w-[433px] h-[44px] px-2 ">หมวดหมู่ย่อย</div>
          </div>
        </div>
        <div id="line" className="w-full mb-[40px]">
          <hr className="bg-gray-300 border-0 h-[1px] w-full"></hr>
        </div>
        <div className="flex flex-row items-center w-full pb-3">
          <div className="flex w-[180px]  text-gray-700">สร้างเมื่อ</div>
          <div className="pl-[120px] w-full">
            <div className="py-2 w-[433px] h-[44px] px-2">
              12/02/2022 10:30PM
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-full">
          <div className="flex w-[180px]  text-gray-700">แก้ไขล่าสุด</div>
          <div className="pl-[120px] w-full">
            <div className="py-2 w-[433px] h-[44px] px-2">
              12/02/2022 10:30PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

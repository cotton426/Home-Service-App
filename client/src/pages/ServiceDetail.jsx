import { useEffect, useState } from "react";
import useData from "../hooks/useData";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import AddOnList from "../components/AddOnList";
import DetailInformation from "../components/DetailInformation";
import ServicePayment from "../components/ServicePayment";
// import from leng component

export const ServiceSummary = ({ counters, subServiceList, inputValues }) => {
  let totalPrice = 0;
  return (
    <>
      <div className="box flex flex-col justify-between w-1/3 h-1/3 px-4">
        <div className="flex flex-col border-b border-gray-300 py-4">
          <h1 className="text-gray-700 text-xl pb-4">สรุปรายการ</h1>
          {counters.map((item, index) => {
            if (item > 0) {
              totalPrice += subServiceList[index].price * counters[index];
              return (
                <div className="flex justify-between text-sm" key={index}>
                  <p className="font-light">{subServiceList[index].name}</p>
                  <p className="font-medium">{counters[index]} รายการ</p>
                </div>
              );
            }
          })}
        </div>
        {(inputValues.date ||
          inputValues.useTime ||
          inputValues.address ||
          inputValues.subdistrict ||
          inputValues.district ||
          inputValues.province) && (
          <div className="h-auto flex flex-col border-b border-gray-300 py-4 text-sm">
            {inputValues.date && (
              <div className="flex justify-between">
                <p className="text-gray-700 font-light">วันที่</p>
                <p className="">{inputValues.date}</p>
              </div>
            )}
            {inputValues.useTime && (
              <div className="flex justify-between">
                <p className="text-gray-700 font-light">เวลา</p>
                <p className="">{inputValues.useTime}</p>
              </div>
            )}
            {(inputValues.address ||
              inputValues.subdistrict ||
              inputValues.district ||
              inputValues.province) && (
              <div className="flex justify-between">
                <p className="text-gray-700 font-light">สถานที่</p>
                <div className="flex flex-col items-end">
                  <p className="">
                    {inputValues.address} {inputValues.subdistrict}
                  </p>
                  <p className="">
                    {inputValues.district} {inputValues.province}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between py-4">
          <p className="text-gray-700">รวม</p>
          <p className="font-semibold">{totalPrice} ฿</p>
        </div>
      </div>
    </>
  );
};

const ServiceDetail = () => {
  const params = useParams();
  const { itemObjects, getService } = useData();
  const [page, setPage] = useState("select-page");
  const [cart, setCart] = useState([]);
  const [counters, setCounters] = useState([]);
  const [inputValues, setInputValues] = useState({
    date: "",
    time: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    note: "",
    useTime: "",
  });

  // const handleChange = (event) => {
  //   const fieldName = event.target.name;
  //   const fieldValue = event.target.value;
  //   setInputValues({ ...inputValues, [fieldName]: fieldValue });
  //   // handleSubmit();
  //   console.log(inputValues);
  // };
  const navigate = useNavigate();
  useEffect(() => {
    getService(params.service_id);
  }, []);
  const handleClickNext = () => {
    if (page === "select-page") {
      setPage("address-page");
    } else if (page === "address-page") {
      setPage("payment-page");
    }
    // else if (page === "payment-page") {
    //   setPage("summary-page");
    // }
  };
  const handleClickBack = () => {
    if (page === "payment-page") {
      setPage("address-page");
    } else if (page === "address-page") {
      setPage("select-page");
    } else if (page === "select-page") {
      navigate("/service");
    }
  };

  return (
    <>
      <div className="bg-BG relative w-full -z-20">
        <img
          src={itemObjects.image}
          alt={itemObjects.name}
          className="absolute w-full object-cover aspect-[6/1] -z-10 "
        />
        {/* real div for show data */}
        <div className="bg-none w-full px-[10%] pt-[5%] pb-[1%] z-10">
          <header className="shadow bg-white inline-block px-8 py-2.5 mb-8">
            <div className="flex items-center">
              <span className="text-gray-700">บริการของเรา</span>
              <span className="text-gray-400 px-2">{"  >  "}</span>
              <span className="text-[2rem] text-blue-600">
                {itemObjects.name}
              </span>
            </div>
          </header>
          <ProgressBar page={page} />
        </div>
        {/* real div for show data */}
      </div>

      <div className="w-full px-[10%] pt-[1%] pb-[5%] bg-BG flex justify-between">
        {page === "select-page" ? (
          <AddOnList
            itemObjects={itemObjects}
            counters={counters}
            setCounters={setCounters}
          />
        ) : null}
        {page === "address-page" ? (
          <DetailInformation
            inputValues={inputValues}
            setInputValues={setInputValues}
            // handleChange={handleChange}
          />
        ) : null}
        {page === "payment-page" ? <ServicePayment /> : null}
        <ServiceSummary
          subServiceList={itemObjects.subServiceList}
          counters={counters}
          inputValues={inputValues}
        />
      </div>
      <div className="w-full bg-white px-[10%] py-4 flex justify-between">
        <button
          type="submit"
          form="formik-form"
          className={`btn-secondary`}
          onClick={() => {
            handleClickBack();
          }}
        >
          {"< "} <span className="ml-2"> ย้อนกลับ</span>
        </button>
        <button
          className="btn-primary"
          disabled={counters.filter((item) => item > 0).length === 0}
          onClick={handleClickNext}
        >
          <span className="mr-2">ดำเนินการต่อ </span> {" >"}
        </button>
      </div>
    </>
  );
};

export default ServiceDetail;

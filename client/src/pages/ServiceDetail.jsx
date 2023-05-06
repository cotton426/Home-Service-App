import { useEffect, useState } from "react";
import useData from "../hooks/useData";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import AddOnList from "../components/AddOnList";
import DetailInformation from "../components/DetailInformation";
import ServicePayment from "../components/ServicePayment";
import axios from "axios";
import useUser from "../hooks/useUser";
import { BsCheckCircleFill } from "react-icons/bs";
// import from leng component

export const ServiceSummary = ({
  counters,
  subServiceList,
  inputValues,
  cart,
  setCart,
  page,
  initialValues,
  discountType,
  discount,
}) => {
  let totalPrice = 0;

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };

  const formatter = new Intl.DateTimeFormat("th-TH", options);
  console.log(initialValues);
  const formattedDate = (date) => formatter.format(new Date(date));
  return (
    <>
      <div
        className={`box flex flex-col justify-between w-1/3 h-1/3 ${
          page === "summary-page" ? "px-[3%] py-[3%]" : "px-4"
        }`}
      >
        <div className="flex flex-col border-b border-gray-300 py-4">
          {page !== "summary-page" ? (
            <h1 className="text-gray-700 text-xl pb-4">สรุปรายการ</h1>
          ) : (
            <div className="flex flex-col items-center py-12 gap-8">
              <BsCheckCircleFill className="scale-[4] text-green-900" />
              <div className="text-[32px]">ชำระเงินเรียบร้อย !</div>
            </div>
          )}
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
                <p className="">{formattedDate(inputValues.date)}</p>
              </div>
            )}
            {inputValues.useTime && (
              <div className="flex justify-between">
                <p className="text-gray-700 font-light">เวลา</p>
                <p className="">{inputValues.useTime.replace(":", ".")} น.</p>
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
        <div className="py-4">
          {discount !== 0 && (
            <div className="flex justify-between pb-2">
              <p className="text-gray-700 font-light text-sm">Promotion Code</p>
              <div className="flex flex-col items-end">
                <p className="text-red text-sm font-medium">
                  -
                  {discountType === "Fixed"
                    ? discount
                    : totalPrice * (discount / 100)}{" "}
                  ฿{" "}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <p className="text-gray-700">รวม</p>
            <p className="font-semibold">
              {!discount
                ? totalPrice
                : discountType === "Fixed"
                ? totalPrice - discount
                : totalPrice * ((100 - discount) / 100)}{" "}
              ฿
            </p>
          </div>
        </div>

        {console.log(discount)}
        {console.log(discountType)}

        {page === "summary-page" && (
          <Link to="/user-orders-list">
            <button className="btn-primary w-full">เช็ครายการซ่อม</button>
          </Link>
        )}
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
  const [paid, setPaid] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const { addOrder } = useUser();

  // const [showPromptpay, setShowPromptpay] = useState(false);
  // const [showCreditCard, setShowCreditCard] = useState(false);
  // const handlePayment = async () => {
  //   try {

  //     const response = await axios.post(
  //       "https://vault.omise.co/tokens",
  //       {
  //         card: {
  //           name: initialValues.creditName,
  //           number: initialValues.creditNumber.split(" ").join(""),
  //           expiration_month: initialValues.dateOfExpiry.split(`/`)[0],
  //           expiration_year: `20${initialValues.dateOfExpiry.split(`/`)[1]}`,
  //           security_code: initialValues.code,
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Basic " + btoa("pkey_test_5vnsm9t1c9u17nytvhp"),
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     return response.data;
  //     // Use the token returned by Omise to create a charge or save the card to a customer
  //   } catch {
  //     (error) => {
  //       console.error(error);
  //     };
  //   }
  // };
  const handlePayment = async () => {
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("pkey_test_5vnsm9t1c9u17nytvhp"),
      });

      const body = JSON.stringify({
        card: {
          name: initialValues.creditName,
          number: initialValues.creditNumber.split(" ").join(""),
          expiration_month: initialValues.dateOfExpiry.split(`/`)[0],
          expiration_year: `20${initialValues.dateOfExpiry.split(`/`)[1]}`,
          security_code: initialValues.code,
        },
      });

      const response = await fetch("https://vault.omise.co/tokens", {
        method: "POST",
        headers,
        body,
      });

      const data = await response.json();

      console.log(data);
      return data;
      // Use the token returned by Omise to create a charge or save the card to a customer
    } catch (error) {
      console.error(error);
    }
  };

  const [initialValues, setInitialValues] = useState({
    creditNumber: "",
    creditName: "",
    dateOfExpiry: "",
    code: "",
    promotionCode: "",
  });

  // console.log(initialValues);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setInitialValues({ ...initialValues, [fieldName]: fieldValue });
  };

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

  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("");

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
      {page !== "summary-page" ? (
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
            {page === "select-page" && (
              <AddOnList
                itemObjects={itemObjects}
                counters={counters}
                setCounters={setCounters}
                cart={cart}
                setCart={setCart}
              />
            )}
            {page === "address-page" && (
              <DetailInformation
                inputValues={inputValues}
                setInputValues={setInputValues}
                // handleChange={handleChange}
              />
            )}
            {page === "payment-page" && (
              <ServicePayment
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                handleChange={handleChange}
                paymentError={paymentError}
                setDiscountType={setDiscountType}
                setDiscount={setDiscount}
              />
            )}
            {page !== "summary-page" && (
              <ServiceSummary
                subServiceList={itemObjects.subServiceList}
                counters={counters}
                inputValues={inputValues}
                initialValues={initialValues}
                cart={cart}
                setCart={setCart}
                page={page}
                discountType={discountType}
                discount={discount}
              />
            )}
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
              disabled={
                (page === "select-page" &&
                  counters.filter((item) => item > 0).length === 0) ||
                (page === "address-page" &&
                  Object.values(inputValues).filter((item) => item === "")
                    .length > (inputValues.note === "" ? 1 : 0))
              }
              onClick={async () => {
                if (page === "payment-page") {
                  let totalPrice = cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  );

                  if (discount) {
                    if (discountType === "Fixed") {
                      totalPrice = totalPrice - discount;
                    } else {
                      totalPrice = totalPrice * ((100 - discount) / 100);
                    }
                  }

                  const selectCart = cart.filter((item) => item.quantity > 0);
                  const profiles = localStorage.getItem("userData");
                  const profile = JSON.parse(profiles);
                  const profile_id = profile.profiles[0].id;
                  console.log(profile);
                  console.log(profile_id);
                  console.log("work1");

                  const creditData = await handlePayment();
                  if (creditData.object === "error") {
                    setPaymentError(creditData.message);
                    return;
                  }

                  console.log("work2");
                  const orderItems = {
                    creditData,
                    cart: selectCart,
                    price: totalPrice,
                    ...inputValues,
                    profile_id,
                    status: "On Process",
                  };
                  console.log(orderItems);
                  // console.log(selectCart, inputValues, initialValues);
                  try {
                    await addOrder(orderItems);
                    setPage("summary-page");
                  } catch (e) {
                    console.log(e);
                  }
                }
                handleClickNext();
              }}
            >
              <span className="mr-2">ดำเนินการต่อ </span> {" >"}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-BG h-[90vh] w-full flex justify-center items-center">
          <div className="w-4/5 flex justify-center items-center">
            <ServiceSummary
              subServiceList={itemObjects.subServiceList}
              counters={counters}
              inputValues={inputValues}
              cart={cart}
              setCart={setCart}
              page={page}
              discountType={discountType}
              discount={discount}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetail;

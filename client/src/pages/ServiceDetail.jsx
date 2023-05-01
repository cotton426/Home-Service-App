import { useEffect, useState } from "react";
import useData from "../hooks/useData";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const ServiceDetail = () => {
  const params = useParams();
  const { itemObjects, getService } = useData();
  const [page, setPage] = useState("select-page");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getService(params.service_id);
  }, []);
  console.log(itemObjects);

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
      <div className="bg-BG relative w-full h-screen -z-20">
        <img
          src={itemObjects.image}
          alt={itemObjects.name}
          className="absolute w-full object-cover aspect-[6/1] -z-10 "
        />
        {/* real div for show data */}
        <div className="bg-none w-full h-full px-[10%] py-[5%]">
          <header className="shadow bg-white inline-block px-8 py-2.5">
            <div className="flex items-center">
              <span className="text-gray-700">บริการของเรา</span>
              <span className="text-gray-400 px-2">{"  >  "}</span>
              <span className="text-[2rem] text-blue-600">
                {itemObjects.name}
              </span>
            </div>
          </header>
          <ProgressBar page={page} />
          <div className="w-full">For Teammate Component</div>
        </div>
        {/* real div for show data */}
      </div>
      <footer className="w-full bg-white px-[10%] py-4 flex justify-between">
        <button className="btn-secondary" onClick={handleClickBack}>
          {"< "} <span className="ml-2"> ย้อนกลับ</span>
        </button>
        <button className="btn-primary" onClick={handleClickNext}>
          <span className="mr-2">ดำเนินการต่อ </span> {" >"}
        </button>
      </footer>
    </>
  );
};

export default ServiceDetail;

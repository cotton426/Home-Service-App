import React from "react";
import ServiceList from "../../components/ServiceList";
import { Link } from "react-router-dom";

function Service() {
  return (
    <div className="bg-BG h-[790px] w-screen flex justify-center items-center flex-col space-y-12 ">
      <h1 className="text-3xl text-blue-950 font-sans font-bold">
        บริการยอดฮิตของเรา
      </h1>
      <div className="content flex flex-row justify-center space-x-11 mt-6 w-[65%]">
        <ServiceList />
      </div>
      <Link to="/services">
        <button className="btn-primary mt-6">ดูบริการท้ังหมด</button>
      </Link>
    </div>
  );
}

export default Service;

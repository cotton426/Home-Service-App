import {
  HeaderService,
  Footerservice,
  NavService,
} from "./service/ServicesMore";
import ServiceMore from "./service/ServiceCard";
import { useState } from "react";
import DetailInformation from "../components/DetailInformation";

const ServicesPage = () => {
  return (
    <>
      <HeaderService />
      <NavService />
      <Footerservice />
      <DetailInformation />
    </>
  );
};

export default ServicesPage;

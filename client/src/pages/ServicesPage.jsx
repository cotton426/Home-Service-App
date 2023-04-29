import {
  HeaderService,
  Footerservice,
  NavService,
} from "./service/ServicesMore";
import ServiceMore from "./service/ServiceCard";
import { useState } from "react";

const ServicesPage = () => {
  return (
    <>
      <HeaderService />
      <NavService />
      <Footerservice />
    </>
  );
};

export default ServicesPage;

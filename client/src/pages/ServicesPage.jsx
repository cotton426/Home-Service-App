import {
  HeaderService,
  Footerservice,
  NavService,
} from "./service/ServicesMore";
import ServiceMore from "./service/ServiceCard";

const ServicesPage = () => {
  return (
    <>
      <HeaderService />
      <NavService />
      <ServiceMore />
      <Footerservice />
    </>
  );
};

export default ServicesPage;

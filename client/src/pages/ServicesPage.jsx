import {
  HeaderService,
  Footerservice,
  NavService,
} from "./service/ServicesMore";

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

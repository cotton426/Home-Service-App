import Header from "./homepage/Header";
import Service from "./homepage/Service";
import FooterHomepage from "./homepage/FooterHomepage";
import {
  NavService,
  HeaderService,
  Footerservice,
} from "./service/ServicesMore";

const Homepage = () => {
  return (
    <>
      <HeaderService />
      <NavService />
      <Footerservice />
      <Header />
      <Service />
      <FooterHomepage />
    </>
  );
};

export default Homepage;

import Header from "./homepage/Header";
import Service from "./homepage/Service";
import FooterHomepage from "./homepage/FooterHomepage";
import ViewPromotionCode from "../components/ViewPromotionCode"

const Homepage = () => {
  return (
    <>
      <Header />
      <Service />
      <ViewPromotionCode />
      <FooterHomepage />
    </>
  );
};

export default Homepage;

import Home1About from "../components/about/Home1About";
import Banner1 from "../components/banner/Banner1";
import ChooseUs from "../components/chooseUs/ChooseUs";
import FeatureCounter from "../components/feature/FeatureCounter";
import Home1feature from "../components/feature/Home1feature";
import Footer1 from "../components/footer/Footer1";
import Header2 from "../components/header/Header2";
import Home1Partner from "../components/partner/Home1Partner";
// import Home1PricePlan from "../components/pricePlan/Home1PricePlan";
import Home1Service from "../components/service/Home1Service";
import Home1Team from "../components/team/Home1Team";
import Home1Testimonial from "../components/testimonial/Home1Testimonial";

export default function Home() {
  return (
    <>
      <Header2 />
      <Banner1 />
      <Home1Service />
      <Home1About />
      <Home1feature />
      {/* <FeatureCounter /> */}
      <ChooseUs />
      <Home1Partner />
      {/* <Home1Testimonial /> */}
      <Home1Team />
      <Footer1 />
    </>
  );
}

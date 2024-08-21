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
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header2 />
      <Banner1 />
      <div className="d-flex justify-content-center">
        <img
          style={{ width: "100%", height: "100%" }}
          src="/assets/images/imagine-cute.jpeg"
        ></img>
      </div>
      <div id="service-section">
        <Home1Service />
      </div>
      {/* <Home1About />/ */}
      {/* <FeatureCounter /> */}
      <ChooseUs />
      <Home1Partner />
      {/* <Home1Testimonial /> */}
      {/* <Home1Team /> */}
      <Home1feature />
      <Footer1 />
    </>
  );
}

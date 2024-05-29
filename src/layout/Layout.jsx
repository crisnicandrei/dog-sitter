import React from "react";
import Footer1 from "../components/footer/Footer1";
import Header2 from "../components/header/Header2";

function Layout({ children }) {
  return (
    <>
      <Header2 />
      {children}
      <Footer1 />
    </>
  );
}

export default Layout;

import Link from "next/link";
import React from "react";
import Morphext from "../morphext/Morphext";

function Banner1() {
  const phrases = ["Dog .", "Cat ."];
  return (
    <div className="hero-style-1">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-xxl-6 col-xl-5 d-flex align-items-center">
                <div className="banner-content ">
                  <div className="tag">
                    <ul>
                      <li>Incredere</li>
                      <li>Siguranta</li>
                      <li>Loialitate</li>
                    </ul>
                  </div>
                  <h1>
                    Cainele tau
                    <br /> e pe maini bune
                  </h1>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-7 d-flex align-items-center justify-content-md-start justify-content-center">
                <div className="banner-img">
                  <img
                    className="img-fluid"
                    src="assets/images/image2.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="reservation-btn m-2 p-2">
          <Link legacyBehavior href="/contact">
            <a className="primary-btn1 m-2 p-2">Gaseste sitter</a>
          </Link>
        </div>
        <div className="reservation-btn m-2 p-2">
          <Link legacyBehavior href="/contact">
            <a className="primary-btn1 ">Devino sitter</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner1;

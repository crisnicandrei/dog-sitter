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
                      <li>Trustworthy</li>
                      <li>Safely</li>
                      <li>Loyalty</li>
                    </ul>
                  </div>
                  <h1>
                    To Ensure Perfect
                    <br /> Service Of Your{" "}
                    <Morphext
                      animation="fadeInLeft"
                      speed="3000"
                      phrases={phrases}
                    />
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
                <div className="reservation-review">
                  <div className="reservation-btn">
                    <Link legacyBehavior href="/contact">
                      <a className="primary-btn1">Make A Reservation</a>
                    </Link>
                  </div>
                  <div className="review-area">
                    <ul>
                      <li>
                        <div className="single-review">
                          <div className="icon">
                            <img
                              src="assets/images/icon/trustpilot001.svg"
                              alt=""
                            />
                            <span>reviews</span>
                          </div>
                          <div className="reviews">
                            <ul>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                            </ul>
                            <span>(200)</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="single-review">
                          <div className="icon">
                            <img src="assets/images/icon/google2.svg" alt="" />
                            <span>reviews</span>
                          </div>
                          <div className="reviews">
                            <ul>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                              <li>
                                <i className="bi bi-star-fill" />
                              </li>
                            </ul>
                            <span>(300)</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="reservation-btn">
              <Link legacyBehavior href="/contact">
                <a className="primary-btn1">Gaseste sitter</a>
              </Link>
              <div className="reservation-btn">
                <Link legacyBehavior href="/contact">
                  <a className="primary-btn1">Devino sitter</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner1;

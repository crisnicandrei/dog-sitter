import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Footer1() {
  const currentRouter = useRouter().pathname;
  return (
    <footer>
      <div className="container">
        <div className="row pt-90 pb-90 justify-content-center">
          <div className="col-lg-3 col-sm-6 order-lg-1 order-2 d-flex justify-content-sm-start justify-content-start">
            <div className="footer-items contact ">
              <h3>Contacts</h3>
              <div className="hotline mb-30">
                <div className="hotline-icon">
                  <img src="/assets/images/icon/phone-icon.svg" alt="" />
                </div>
                <div className="hotline-info">
                  <h6 className="mb-10">
                    <a href="tel:+40786366923">+40786366923</a>
                  </h6>
                </div>
              </div>
              <div className="email mb-30">
                <div className="email-icon">
                  <img src="/assets/images/icon/envelope.svg" alt="" />
                </div>
                <div className="email-info">
                  <h6 className="mb-10">
                    <a href="mailto:azorelhotel2024@gmail.com">
                      azorelhotel2024@gmail.com
                    </a>
                  </h6>
                </div>
              </div>
              <div className="email">
                <div className="email-icon">
                  <img src="/assets/images/icon/location.svg" alt="" />
                </div>
                <div className="email-info">
                  <h6 className="mb-10">
                    <a>Bucovat, 368</a>
                  </h6>
                  <h6>
                    <a>Timis</a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center order-lg-2 order-1 justify-content-sm-center justify-content-start">
            <div className="footer-items">
              <h2>
                <span>Vrei ca al tău</span> #Blănos{" "}
                <span>de #Acasă să fie pe mâini bune? </span>
              </h2>
              <div
                className={
                  currentRouter === "/index2"
                    ? "book-btn2 d-flex justify-content-center text-center"
                    : "book-btn"
                }
              >
                <Link legacyBehavior href="/gaseste-sitter">
                  <a
                    className={
                      currentRouter === "/gaseste-sitter"
                        ? "primary-btn2"
                        : "primary-btn1"
                    }
                  >
                    REZERVĂ ACUM
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 d-flex justify-content-sm-end justify-content-start order-3"></div>
        </div>
        <div className="row border-top">
          <div className="col-lg-6"></div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <ul className="footer-btm-menu">
              <li>
                <Link legacyBehavior href="/gdpr">
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/termeni">
                  <a>Terms &amp; Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="#service-section" scroll={false}>
                  Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer1;

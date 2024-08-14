import Link from "next/link";
import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Banner1() {
  const { user } = useContext(AuthContext);
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
                </div>
              </div>
              <div className="col-xxl-6 col-xl-7 d-flex align-items-center justify-content-md-start justify-content-center">
                <div className="banner-img">
                  <img
                    className="img-fluid"
                    src="/assets/images/image2.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-column flex-sm-row">
        <div className="reservation-btn m-2 p-2 d-flex justify-content-center">
          <Link legacyBehavior href="/gaseste-sitter">
            <a style={{ padding: "20px 100px" }} className="primary-btn1 m-2">
              Gaseste sitter
            </a>
          </Link>
        </div>
        <div className="header-logo m-3 d-s-none d-flex justify-content-center">
          <img
            alt="image"
            className="img-fluid"
            src="/assets/images/icon/dog.svg"
            style={{ maxWidth: "150px" }}
          />
        </div>
        <div className="reservation-btn m-2 p-2 d-flex justify-content-center">
          <Link
            legacyBehavior
            href={user ? "/editare-profil" : "/autentificare"}
          >
            <a className="primary-btn1 m-2" style={{ padding: "20px 100px" }}>
              Devino sitter
            </a>
          </Link>
        </div>
      </div>
      <div
        className="d-flex justify-content-center banner-content row"
        style={{ maxWidth: "100%" }}
      >
        <h1 className="text-center">Cainele tau e pe maini bune</h1>
        <p className="text-center">
          Primii 100 inscrisi in comunitatea noastra vor beneficia GRATUIT de un
          mini-curs video (9 episoade) despre mersul in lesa, in valoare de 800
          RON.{" "}
        </p>
      </div>
    </div>
  );
}

export default Banner1;

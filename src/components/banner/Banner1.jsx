import Link from "next/link";
import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDog } from "@fortawesome/free-solid-svg-icons";

function Banner1() {
  const { user } = useContext(AuthContext);
  return (
    <div
      className="hero-style-1"
      style={{
        paddingBottom: "50px",
      }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-xxl-6 col-xl-5 d-flex align-items-center">
                <div className="banner-content ">
                  <div className="tag">
                    <ul>
                      <li>Încredere</li>
                      <li>Siguranță</li>
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
      <div className="d-none d-sm-block mt-50">
        <p className="text-center px-2" style={{ color: "black" }}>
          Prima platformă națională de house sharing pentru găzduirea legală și
          contra cost a animalelor de companie.
        </p>
      </div>
      <div className="d-flex justify-content-center flex-column flex-sm-row">
        <div className="reservation-btn m-2 p-lg-2 p-1 d-flex justify-content-center text-center">
          <Link legacyBehavior href="/gaseste-sitter">
            <a
              style={{ padding: "20px 80px" }}
              className="primary-btn1 m-2 d-flex justify-content-center align-items-center"
            >
              Găsește pet sitter
              <FontAwesomeIcon
                icon={faSearch}
                className="fas fa-check"
                style={{ color: "white", marginLeft: "10px" }}
              ></FontAwesomeIcon>
            </a>
          </Link>
        </div>
        <div className="header-logo m-3 d-none d-md-block d-flex justify-content-center">
          <img
            alt="image"
            className="img-fluid"
            src="/assets/images/icon/dog.svg"
            style={{ maxWidth: "150px" }}
          />
        </div>
        <div className="d-sm-none">
          <p className="text-center px-4" style={{ color: "black" }}>
            Prima platformă națională de house sharing pentru găzduirea legală
            și contra cost a animalelor de companie.
          </p>
        </div>
        <div className="reservation-btn m-2 p-lg-2 p-1 d-flex justify-content-center">
          <Link
            legacyBehavior
            href={user ? "/editare-profil" : "/autentificare"}
          >
            <a
              className="primary-btn1 m-2 d-flex justify-cotent-center align-items-center"
              style={{ padding: "20px 100px" }}
            >
              Devino sitter
              <FontAwesomeIcon
                icon={faDog}
                className="fas fa-check"
                style={{ color: "white", marginLeft: "10px" }}
              ></FontAwesomeIcon>
            </a>
          </Link>
        </div>
      </div>
      <div
        className="d-flex justify-content-center banner-content row"
        style={{ maxWidth: "100%", marginTop: "16px" }}
      >
        <h1 className="text-center">Câinele tău e pe mâini bune</h1>
        <p className="text-center px-5" style={{ color: "black" }}>
          Primii 100 înscriși în comunitatea noastră vor beneficia GRATUIT de un
          mini-curs video (9 episoade) despre mersul în lesă, în valoare de 800
          RON.{" "}
        </p>
      </div>
    </div>
  );
}

export default Banner1;

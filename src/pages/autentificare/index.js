import Link from "next/link";
import React from "react";
import Layout from "../../layout/Layout";

function loginPage() {
  return (
    <>
      <Layout>
        <div className="login-section pt-50 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Autentificare</h3>
                    <p>
                      Membru nou?
                      <Link legacyBehavior href="/inregistrare">
                        <a>Înscrie-te aici</a>
                      </Link>
                    </p>
                  </div>
                  <form className="w-100">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Introduceți adresa de email *</label>
                          <input
                            type="email"
                            placeholder="Introduceți adresa de email"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Parola *</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Parola"
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input type="checkbox" id="html" />
                            <label htmlFor="html">
                              Sunt de acord cu{" "}
                              <a href="#">Termenii &amp; Politica</a>
                            </label>
                          </div>
                          <a href="#" className="forgot-pass">
                            Parolă uitată
                          </a>
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Autentificare</button>
                  </form>
                  <div className="alternate-signup-box">
                    <h6>SAU ÎNSCRIE-TE CU</h6>
                    <div className="btn-group gap-4">
                      <a
                        href="#"
                        className="eg-btn google-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-google" />
                        <span>ÎNSCRIE-TE CU GOOGLE</span>
                      </a>
                      <a
                        href="#"
                        className="eg-btn facebook-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-facebook" />
                        ÎNSCRIE-TE CU FACEBOOK
                      </a>
                    </div>
                  </div>
                  <div className="form-poicy-area">
                    <p>
                      Făcând clic pe butonul "înscrie-te", creezi un cont și
                      ești de acord cu
                      <a href="#">Termenii &amp; Condițiile </a> &amp;{" "}
                      <a href="#">Politica de Confidențialitate</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default loginPage;

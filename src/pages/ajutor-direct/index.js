// ** Next Imports
import Link from "next/link";
// ** React Imports
import React from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";

function Profile() {
  return (
    <Layout>
      <div className="blog-details-pages pt-80 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5 justify-content-center mb-70">
            <div className="col-lg-8">
              <div className="blog-details-wrap mb-120">
                <h2 className="post-title">
                  Voluntarii nu au mai mult timp liber decât alți oameni, doar
                  mai mult suflet 🙂
                </h2>
                <div className="post-content">
                  <p>Donează timp 🙂 Vino și drăgălește un #blănos salvat.</p>
                  <p>
                    Câinele, cel mai bun prieten al omului, așteaptă poate chiar
                    ani de zile un cămin, dar în fiecare zi așteaptă un masaj,
                    ceva atât de banal ca o plimbare, poate și biscuiți :) în
                    general așteaptă iubire - dar când ai mulți în grijă nu
                    ajung toți la rând atât de mult timp cât ar merita. Aici
                    intervine voluntarul :)
                  </p>
                  <p>
                    Dedicat și cu inima deschisă, oferind timpul său și chiar
                    mai mult! o parte din sine pentru o cauză nobilă.
                    #FapteBuneÎmpreună
                  </p>
                </div>
                <div className="blog-tag-social-area">
                  <div className="bolg-tag">
                    <ul>
                      <li>
                        <Link legacyBehavior href="/blog-grid">
                          <a>#Pet Care</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/blog-grid">
                          <a>#Dog Walking</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/blog-grid">
                          <a>#Medical Care</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/blog-grid">
                          <a>#Pet Bording</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="social-area">
                    <span>Share:</span>
                    <ul className="social-link d-flex align-items-center">
                      <li>
                        <a href="https://www.facebook.com/">
                          <i className="bx bxl-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/">
                          <i className="bx bxl-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.pinterest.com/">
                          <i className="bx bxl-pinterest-alt" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/">
                          <i className="bx bxl-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

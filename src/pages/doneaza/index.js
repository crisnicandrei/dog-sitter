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
                <h2 className="post-title">Împreună putem face mai mult.</h2>
                <div className="post-content">
                  <p>
                    Ai vrut mereu să te implici să ajuți animalele dar nu ai
                    timpul sau spațiul necesar? Poți sprijini pe cineva care
                    deja face asta iar acum este foarte ușor să ajuți !
                  </p>
                  <p>
                    Redirectioneaza gratuit, simplu și online 3,5% din impozitul
                    pe care îl plătești oricum statului.{" "}
                  </p>
                  <p>
                    Dacă vrei să ajungă la #blănoși completează datele tale si
                    semneaza aici :{" "}
                    <a href="https://redirectioneaza.ro/furrytales">
                      {" "}
                      https://redirectioneaza.ro/furrytales
                    </a>
                    . Formularul ne vine pe email și îl depunem noi pentru ca tu
                    să nu faci un drum în plus 🙂
                  </p>
                  <p>
                    Fiecare zi e un moment bun pentru a face o faptă frumoasă,
                    de ce nu? Noi și cățeii îți mulțumim 🐾 #rescuedogs
                    #furrytales Redirecționează gratuit 3,5% din impozitul tău
                    pentru cauza în care crezi! Sprijinul tău ne dă un strop în
                    plus de putere.
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

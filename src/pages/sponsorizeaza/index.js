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
                    Ne poți ajuta să ajutăm! Redirecționează gratuit 20% din
                    impozitul firmei tale!* *poți opta pentru orice procent până
                    în 20%, astfel poți împărți, dacă dorești, la mai multe
                    asociații
                  </p>
                  <p>
                    POȚI redirecționa 20% din impozitul pe profit sau pe venit
                    în funcție de felul de plătitor de impozit. Chiar și dacă ai
                    PFA poți redirecționa.
                    <a href="https://drive.google.com/file/d/1s8rXrB7EhVDsM4rzxqRHHrkhO0aoGM_h/view?usp=sharing">
                      Contractul
                    </a>{" "}
                    il trimiteti la noi pe adresa asociatia.furrytales@gmail.com
                  </p>
                  <p>
                    În plus, conform Ordinului 1679/2022, dacă în anul trecut nu
                    ați făcut deloc sponsorizări deductibile sau prin
                    sponsorizările efectuate nu ați atins plafonul maxim
                    stabilit prin lege (20% din impozitul pe profit dar nu mai
                    mult de 0,75% din cifra de afaceri, respectiv maxim 20% din
                    impozitul pe venit, pentru microîntreprinderi) aveți
                    posibilitatea de a depune, până la data de 25 decembrie
                    2024, la ANAF, Declarația 177, prin care solicitați ca
                    diferența de sponsorizare până la plafonul maxim, rămasă
                    nealocată, să fie redirecționată către proiectele asociaţiei
                    FURRYTALES{" "}
                    <a href="https://static.anaf.ro/static/10/Anaf/formulare/177_OPANAF_1679_2022.pdf">
                      Declarația 177
                    </a>
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

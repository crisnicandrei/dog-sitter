import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

function ChooseUs() {
  return (
    <div className="h1-choose-area mb-120">
      <div className="container ">
        <div className="row g-lg-4 gy-5 justify-content-center">
          <div className="col-lg-5">
            <div className="section-title1">
              <span>
                <img src="/assets/images/icon/section-vec-l1.svg" alt="" />
                Why Choose Us
                <img src="/assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>Asiguram cele mai bune servicii.</h2>
            </div>
            <div className="choose-content">
              <p>
                Pellentesque maximus augue orci, quis congue purus iaculis id.
                Maecenas eudocl lorem quis massal molestie vulputate in sit amet
                diam. Cras eu odio sit amet ont tellus. Cras ut sollicitudin
                urna. Vivamus blandit,
              </p>
            </div>
          </div>
          <div className="col-lg-5 col-md-8">
            <div className="choose-img">
              <div className="choose-vector">
                <img src="/assets/images/icon/choose-vector.svg" alt="" />
              </div>
              <img
                className="img-fluid"
                src="/assets/images/pupi.jpeg"
                alt="choose-img"
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="choose-feature">
              <ul>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="/assets/images/icon/team.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>Trusted Team</h4>
                      <p>
                        Pellentesque maximus augue orci, quisl congue purus
                        iaculison
                      </p>
                      <Link
                        style={{ color: "#f46f30" }}
                        legacyBehavior
                        href="/trusted-team"
                      >
                        <a>See more</a>
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="/assets/images/icon/mind.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>Peace of mind</h4>
                      <p>
                        Pellentesque maximus augue orci, quisl congue purus
                        iaculison
                      </p>
                      <Link
                        style={{ color: "#f46f30" }}
                        legacyBehavior
                        href="/peace-of-mind"
                      >
                        <a>See more</a>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;

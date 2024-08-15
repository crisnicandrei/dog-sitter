import React from "react";

function Home1feature() {
  return (
    <div className="h1-feature-area">
      <div className="container-fluid p-0">
        <div className="row justify-content-center bg">
          <div className="col-lg-10 gap-4 d-flex align-items-center justify-content-lg-between justify-content-center flex-lg-nowrap flex-wrap flex-column flex-lg-row ">
            <div className="feature-left">
              <div className="single-card mb-45 flex-column flex-lg-row">
                <div className="icon mb-20">
                  <img src="/assets/images/icon/insured1.svg" alt="" />
                </div>
                <div className="content">
                  <h4>Verified Sitters</h4>
                </div>
              </div>
            </div>
            <div className="freture-title">
              <h2>
                <span>Cainele</span> tau e pe maini bune.
              </h2>
            </div>
            <div className="feature-right">
              <div className="single-card mb-45 flex-column flex-lg-row">
                <div className="icon mb-40">
                  <img src="/assets/images/icon/fast-aid1.svg" alt="" />
                </div>
                <div className="content text-center">
                  <h4>Pet First-Aid Trained</h4>
                  <p>
                    Pellentesque maximus augue orci, quis congue purus iaculison
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home1feature;

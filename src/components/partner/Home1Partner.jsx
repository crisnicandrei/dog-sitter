import React from "react";

function Home1Partner() {
  return (
    <div className="h1-partner-area mb-120">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-xl-5">
            <div className="partner-left">
              <div className="section-title1">
                <h2>Our Trusted Partners </h2>
              </div>
              <div className="author-name-expariance d-flex justify-content-center justify-content-lg-between">
                <div className="author-name d-flex flex-column flex-lg-row">
                  <div className="img">
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: 0,
                      }}
                      src="/assets/images/partener4.png"
                      alt="Dog Camp Logo"
                    />
                  </div>
                  <div className="img">
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src="/assets/images/partener1.png"
                      alt="Logo Partener"
                    />
                  </div>
                  <div className="img">
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: 0,
                      }}
                      src="/assets/images/partener2.png"
                      alt=""
                    />
                  </div>
                  <div className="img">
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: 0,
                      }}
                      src="/assets/images/partener3.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home1Partner;

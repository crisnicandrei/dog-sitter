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
              <div className="author-name-expariance">
                <div className="author-name">
                  <div className="img">
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: 0,
                      }}
                      src="assets/images/partener4.jpeg"
                      alt=""
                    />
                  </div>
                  <div className="img">
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src="assets/images/partener1.jpeg"
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
                      src="assets/images/partener2.jpeg"
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
                      src="assets/images/partener3.jpeg"
                      alt=""
                    />
                  </div>

                  {/* <div className="name-deg">
                    <span>Founder</span>
                    <h4>Kash Preston</h4>
                  </div> */}
                </div>
                <div className="expariance">
                  <img src="assets/images/icon/expriance.svg" alt="" />
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

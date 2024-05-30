// ** React Imports
import React from "react";

// ** Component Imports
import ShopCardSimple from "../../components/shop/ShopCardSimple";

// ** Layout imports
import Layout from "../../layout/Layout";

function Profiles() {
  const [value, setValue] = React.useState(50);
  return (
    <Layout>
      <div className="shop-page pt-50 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="mb-30">Profiluri:</h1>
            </div>
            <div className="col-lg-12">
              <div className="row g-4 justify-content-center">
                <ShopCardSimple />
              </div>
              <div className="row pt-70">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="paginations-area">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-left-short" />
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            01
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            02
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            03
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-right-short" />
                          </a>
                        </li>
                      </ul>
                    </nav>
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

export default Profiles;

// React imports
import React, { useEffect, useState } from "react";

// ** Component Imports
import ShopCardSimple from "../../components/shop/ShopCardSimple";

// ** Layout imports
import Layout from "../../layout/Layout";

// ** Firebase Imports
import { getAllPendingUsers } from "../../configs/firebase.config";

// HOCS
import withAdminRoute from "../../hocs/withAdminRoute";

function Cereri() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [refetchUsers, setRefetchUsers] = useState(false);

  useEffect(() => {
    const getPendingUsers = async () => {
      const pendingUsersData = await getAllPendingUsers();

      console.log(pendingUsersData);

      setPendingUsers(pendingUsersData);
    };

    getPendingUsers();
  }, [refetchUsers]);

  return (
    <Layout>
      <div className="shop-page pt-50 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="mb-30">Profilurile care au facut cerere:</h1>
            </div>
            <div className="col-lg-12">
              <div className="row g-4 justify-content-center">
                <ShopCardSimple
                  users={pendingUsers}
                  setRefetchUsers={setRefetchUsers}
                />
              </div>
              {/* <div className="row pt-70">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAdminRoute(Cereri);

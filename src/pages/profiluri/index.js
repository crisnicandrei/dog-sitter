// React imports
import React, { useEffect, useState } from "react";
// ** Component Imports
import ProfileCard from "../../components/shop/ProfileCard";

// ** Layout imports
import Layout from "../../layout/Layout";

// ** Firebase Imports
import { getAllAcceptedUsers } from "../../configs/firebase.config";

// HOCS
import withAdminRoute from "../../hocs/withAdminRoute";

function Profiles() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAcceptedUsers = async () => {
      const pendingUsersData = await getAllAcceptedUsers();
      setUsers(pendingUsersData);
    };

    getAcceptedUsers();
  }, []);
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
                <ProfileCard users={users} />
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

export default withAdminRoute(Profiles);

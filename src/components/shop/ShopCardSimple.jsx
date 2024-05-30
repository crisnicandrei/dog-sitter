import Link from "next/link";
import React from "react";
import petCollection from "../../data/petCollection.json";
function ShopCardSimple() {
  return (
    <>
      {petCollection.map((item) => {
        const { id, img, title } = item;
        return (
          <div key={id} className="col-lg-4 col-md-4 col-sm-6">
            <div className="collection-card">
              <div className="collection-img">
                <img className="img-gluid" src={img} alt="" />
                <div className="view-dt-btn ">
                  <div className="plus-icon" style={{ padding: "19px" }}>
                    <i className="bi bi-eye" />
                  </div>
                  <Link legacyBehavior href="/profiluri/2">
                    <a>Vezi Detalii</a>
                  </Link>
                </div>

                <ul className="cart-icon-list">
                  <li>
                    <a href="#">
                      <i className="bi bi-x-lg text-white" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-check-lg text-white" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="collection-content text-center">
                <h4>
                  <Link legacyBehavior href="/shop-details">
                    <a>{title}</a>
                  </Link>
                </h4>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ShopCardSimple;

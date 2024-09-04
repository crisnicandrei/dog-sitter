// ** Next Imports
import Link from "next/link";

// React imports
import React from "react";
import emailjs from "emailjs-com";

// ** FIrebase impports

import { acceptOrDeclineUserProfile } from "../../configs/firebase.config";

function ShopCardSimple({ users, setRefetchUsers }) {
  function handleAcceptOrDeclineUserProfile(
    uid,
    bolleanAcceptence,
    email,
    displayName
  ) {
    acceptOrDeclineUserProfile(uid, bolleanAcceptence);
    if (bolleanAcceptence) {
      const templateParams = {
        sitter_mail: email,
        name: displayName,
      };
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
          process.env.NEXT_PUBLIC_ACCEPT_SITTER_ID,
          templateParams,
          process.env.NEXT_PUBLIC_USER_ID
        )
        .then((result) => {
          console.log(result);
          alert("Cererea a fost trimisa cu succes");
        });
    }
    setRefetchUsers((prev) => !prev);
  }

  return (
    <>
      {users.map((item) => {
        const { uid, displayName, description, profileImage, email } = item;
        return (
          <div key={uid} className="col-lg-4 col-md-4 col-sm-6">
            <div className="collection-card">
              <div className="collection-img">
                <img
                  className="img-gluid "
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={
                    profileImage ||
                    "https://static.vecteezy.com/system/resources/thumbnails/008/951/892/small_2x/cute-puppy-pomeranian-mixed-breed-pekingese-dog-run-on-the-grass-with-happiness-photo.jpg"
                  }
                  alt="User Profile Picture"
                />
                <div className="view-dt-btn ">
                  <div className="plus-icon" style={{ padding: "19px" }}>
                    <i className="bi bi-eye" />
                  </div>
                  <Link legacyBehavior href={`/profil/${uid}`}>
                    <a>Vezi Detalii</a>
                  </Link>
                </div>

                <ul className="cart-icon-list">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleAcceptOrDeclineUserProfile(
                          uid,
                          false,
                          email,
                          displayName
                        )
                      }
                    >
                      <i className="bi bi-x-lg text-white" />
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleAcceptOrDeclineUserProfile(
                          uid,
                          true,
                          email,
                          displayName
                        )
                      }
                    >
                      <i className="bi bi-check-lg text-white" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="collection-content text-center">
                <h4>
                  <Link legacyBehavior href="/shop-details">
                    <a>{displayName}</a>
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
                  {description}
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

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// React imports
import React, { useEffect, useState, useContext } from "react";
import emailjs from "emailjs-com";
import { AuthContext } from "../../context/AuthContext";

// ** FIrebase impports

import { acceptOrDeclineUserProfile } from "../../configs/firebase.config";

function ShopCardSimple({ users, setRefetchUsers }) {
  const [isReviewed, setIsReviewed] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();
  const { user: viewingUser } = useContext(AuthContext);

  function handleAcceptOrDeclineUserProfile(
    e,
    uid,
    bolleanAcceptence,
    email,
    displayName
  ) {
    e.stopPropagation();
    acceptOrDeclineUserProfile(uid, bolleanAcceptence).then(() => {
      setRefetchUsers((prev) => !prev);
      setIsReviewed(bolleanAcceptence);
      setData({ email, displayName });
    });
  }

  useEffect(() => {
    if (isReviewed) {
      console.log(data);
      const templateParams = {
        sitter_mail: data.email,
        name: data.displayName,
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
  }, [isReviewed]);

  const handleProfileClick = (uid) => {
    router.push("/profil/" + uid);
  };

  return (
    <>
      {users.map((item) => {
        const { uid, displayName, description, profileImage, email, city } =
          item;
        return (
          <div
            onClick={() => handleProfileClick(uid)}
            key={uid}
            className="col-lg-4 col-md-4 col-sm-6 cursor-pointer"
            style={{ cursor: "pointer" }}
          >
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
                  <Link legacyBehavior href={`/profil/${uid}`}>
                    <a>Vezi Detalii</a>
                  </Link>
                </div>

                <ul className="cart-icon-list">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={(e) =>
                        handleAcceptOrDeclineUserProfile(
                          e,
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
                      onClick={(e) =>
                        handleAcceptOrDeclineUserProfile(
                          e,
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
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {viewingUser?.isSuperAdmin && city}
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

// ** Next Imports
import Link from "next/link";

// React imports
import React from "react";

// ** FIrebase impports

function ProfileCard({ users }) {
  return (
    <>
      {users.map((item) => {
        const { uid, displayName, description } = item;
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

export default ProfileCard;

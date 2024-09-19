// ** Next Imports
import { useRouter } from "next/router";
// ** React Imports
import React, { useEffect, useState, useContext } from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";
import Map from "../../components/map";

// ** Third party libraries imports
import Scheduler from "devextreme-react/scheduler";

import { AuthContext } from "../../context/AuthContext";

const currentDate = new Date();
const views = ["day", "week", "workWeek", "month"];

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      {user && (
        <div className="blog-details-pages pt-80 mb-120">
          <div className="container">
            <div className="row g-4 align-items-center mb-40 pt-10">
              <div className="col-lg-6">
                {!user.profileReady && (
                  <h1 style={{ color: "red", fontWeight: "bold" }}>
                    Pentru a apărea în lista de cereri a sitterilor, aveți
                    nevoie de un profil complet editat.
                  </h1>
                )}
                <h1 style={{ color: "black" }}>Nume: {user.displayName}</h1>
                <h4 style={{ color: "black" }}>Telefon: {user.phone}</h4>

                <p>Descriere: {user.description}</p>
                <p>Tarif: {user.tarif}</p>
                <p>Localitate: {user.city}</p>
              </div>
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  src={
                    user.profileImage ||
                    "https://static.vecteezy.com/system/resources/thumbnails/008/951/892/small_2x/cute-puppy-pomeranian-mixed-breed-pekingese-dog-run-on-the-grass-with-happiness-photo.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;

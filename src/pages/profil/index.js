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
                <h1 style={{ color: "black" }}>Nume: {user.displayName}</h1>
                <h4 style={{ color: "black" }}>Telefon: {user.phone}</h4>

                <p>Descriere: {user.description}</p>
                <p></p>
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
            <div className="row mb-120">
              <div className="col-lg-12">
                <div
                  className="nav nav2 nav  nav-pills mb-20"
                  id="v-pills-tab2"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active mr-10"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="false"
                  >
                    Calendar
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="true"
                  >
                    Hartă
                  </button>
                </div>
                <div
                  className="tab-content tab-content2"
                  id="v-pills-tabContent2"
                >
                  <div
                    className="tab-pane fade active show"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="description">
                      <div className="col-xl-10 col-lg-10 col-md-10 mt-100">
                        <h1>Orar</h1>

                        <Scheduler
                          timeZone="America/Los_Angeles"
                          dataSource={user.appointments || []}
                          views={views}
                          defaultCurrentView="day"
                          defaultCurrentDate={currentDate}
                          height={730}
                          startDayHour={9}
                          editing={{
                            allowAdding: false,
                            allowDeleting: false,
                            allowDragging: false,
                            allowResizing: false,
                            allowUpdating: false,
                          }}
                          // onAppointmentDeleted={onAppointmentsChanges}
                          // onAppointmentAdded={onAppointmentsChanges}
                          // onAppointmentUpdated={onAppointmentsChanges}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <Map latlong={user?.coords} profileEdit={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;

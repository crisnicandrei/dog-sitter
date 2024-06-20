// ** Next Imports
import { useRouter } from "next/router";
// ** React Imports
import React, { useEffect, useState } from "react";

// ** Layout Imports
import Layout from "../../../layout/Layout";

// HOCS
import withAdminRoute from "../../../hocs/withAdminRoute";

// ** Third party libraries imports
import Scheduler from "devextreme-react/scheduler";

// ** Firebase Imports
import { getUserData } from "../../../configs/firebase.config";

const currentDate = new Date();
const views = ["day", "week", "workWeek", "month"];

function Profile() {
  const router = useRouter();
  const { uid } = router.query;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInformation = async () => {
      const userData = await getUserData(uid);

      if (userData && userData.appointments) {
        userData.appointments = userData.appointments.map((appointment) => {
          return {
            ...appointment,
            startDate: new Date(appointment.startDate.seconds * 1000),
            endDate: new Date(appointment.endDate.seconds * 1000),
          };
        });
      }

      setUser(userData);
    };
    getUserInformation();
  }, [uid]);

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
                  src="../assets/images/blog/blog-dt-img2.png"
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
                    <div className="description">
                      <p className="para-2 mb-3">
                        Choosing a pet care service, it is important to do your
                        research and select a reputable provider that has
                        experience and a good track record. You should also
                        discuss your pet's needs and any special instructions
                        with the provider to ensure that your pet will receive
                        the best possible care.
                      </p>
                    </div>
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

export default withAdminRoute(Profile);
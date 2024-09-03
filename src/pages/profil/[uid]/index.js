// ** Next Imports
import { useRouter } from "next/router";
// ** React Imports
import React, { useEffect, useState, useContext, useRef } from "react";

// ** Layout Imports
import Layout from "../../../layout/Layout";

// HOCS
import withAdminRoute from "../../../hocs/withAdminRoute";

// ** Third party libraries imports
import Scheduler from "devextreme-react/scheduler";

// ** Firebase Imports
import { getUserData } from "../../../configs/firebase.config";

import { AuthContext } from "../../../context/AuthContext";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import emailjs from "emailjs-com";
import Map from "../../../components/map";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Prenumele este obligatoriu."),
  lastName: yup.string().required("Numele este obligatoriu."),
  email: yup
    .string()
    .email("Adresa de email nu este validă.")
    .required("Email-ul este obligatoriu."),
  phoneNumber: yup
    .string()
    .required("Telefonul este obligatoriu pentru contact."),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const currentDate = new Date();
const views = ["day", "week", "workWeek", "month"];

function Profile() {
  const form = useRef();
  const router = useRouter();
  const { uid } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [user, setUser] = useState(null);

  const [displayForm, setDisplayForm] = useState(false);

  const { user: viewingUser } = useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const getUserInformation = async () => {
      if (uid) {
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
      }
    };
    getUserInformation();
  }, [uid]);

  const onSubmit = (formData) => {
    const templateParams = {
      sitter_name: user.displayName,
      user_name: formData.firstName + " " + formData.lastName,
      phone_number: formData.phoneNumber,
      viewer_email: formData.email,
      start_date: startDate,
      end_date: endDate,
    };
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_BOOK_EMAIL_ID,
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID
      )
      .then((result) => {
        console.log(result);
        alert("Cererea a fost trimisa cu succes");
      });
  };

  const toggleDataForm = () => {
    setDisplayForm(true);
  };

  const handleAppointmentClick = (e) => {
    console.log(e);
    const appointmentStartDate = e.appointmentData.startDate;
    const appointmentEndDate = e.appointmentData.endDate;

    const options = {
      weekday: "long", // "sâmbătă"
      year: "numeric", // "2024"
      month: "long", // "august"
      day: "numeric", // "31"
      hour: "numeric", // "19"
      minute: "numeric", // "00"
      timeZoneName: "short", // "GMT+3"
    };

    const formattedStartDate = appointmentStartDate.toLocaleString(
      "ro-RO",
      options
    );
    const formattedEndDate = appointmentEndDate.toLocaleString(
      "ro-RO",
      options
    );

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  };

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
                          timeZone="Europe/Bucharest"
                          dataSource={user.appointments || []}
                          views={views}
                          defaultCurrentView="day"
                          defaultCurrentDate={currentDate}
                          height={730}
                          startDayHour={9}
                          editing={{
                            allowAdding: true,
                            allowDeleting: false,
                            allowDragging: false,
                            allowResizing: false,
                            allowUpdating: false,
                          }}
                          onAppointmentClick={handleAppointmentClick}
                          onAppointmentAdded={handleAppointmentClick}
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
            <div className="row">
              <div className="col-xl-10 col-lg-10 col-md-10 mt-100 d-flex justify-content-center">
                <button
                  disabled={!startDate && !endDate}
                  style={{
                    backgroundColor: "rgb(46, 103, 209)",
                    color: "white",
                    opacity: startDate && endDate ? 1 : 0.5,
                    cursor: startDate && endDate ? "pointer" : "not-allowed",
                  }}
                  className="nav-link"
                  onClick={toggleDataForm}
                >
                  Adauga Detalii
                </button>
              </div>
            </div>
            {displayForm && (
              <div
                className="form-wrapper wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
              >
                <form
                  ref={form}
                  className="w-100"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Prenume *</label>
                        <input
                          type="text"
                          placeholder="Prenume"
                          name="user_first_name"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <p className="text-danger">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Nume *</label>
                        <input
                          type="text"
                          placeholder="Nume"
                          name="user_last_name"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <p className="text-danger">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Introduceți adresa de email *</label>
                        <input
                          type="text"
                          placeholder="Introduceți adresa de email"
                          name="user_email"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Telefon *</label>
                        <input
                          type="number"
                          placeholder="Introduceți telefonul"
                          name="phone_number"
                          {...register("phoneNumber")}
                        />
                        {errors.email && (
                          <p className="text-danger">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button disabled={form.errors} className="account-btn">
                    Book Now
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;

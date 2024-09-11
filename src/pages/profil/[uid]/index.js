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
  description: yup.string().required("Descrierea este obligatorie"),
  email: yup
    .string()
    .email("Adresa de email nu este validă.")
    .required("Email-ul este obligatoriu."),
  phoneNumber: yup
    .string()
    .required("Telefonul este obligatoriu pentru contact."),
  data: yup.string().required("Data este obligatorie"),
  startHour: yup.string().required("Ora este obligatorie"),
  endHour: yup.string().required("Ora este obligatorie"),
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
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [user, setUser] = useState(null);

  const [displayForm, setDisplayForm] = useState(false);

  const { user: viewingUser } = useContext(AuthContext);

  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

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

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const onSubmit = (formData) => {
    const date = formData.data.split("-").reverse().join("-");

    const templateParams = {
      sitter_name: user.displayName,
      user_name: formData.firstName + " " + formData.lastName,
      phone_number: formData.phoneNumber,
      viewer_email: formData.email,
      date,
      start_hour: formData.startHour,
      end_hour: formData.endHour,
      description: formData.description,
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

  const handleStartHourChange = (e) => {
    setStartHour(e.target.value); // Update startHour state on user selection
  };

  return (
    <Layout>
      {user && (
        <div className="blog-details-pages pt-80 mb-120">
          <div className="container">
            <div className="row g-4 align-items-center mb-40 pt-10">
              <div className="col-lg-6">
                <h1 style={{ color: "black" }}>Nume: {user.displayName}</h1>
                {user.isSuperAdmin && (
                  <h4 style={{ color: "black" }}>Telefon: {user.phone}</h4>
                )}

                <p>Descriere: {user.description}</p>
                <p></p>
              </div>
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  src={
                    user.profileImage
                      ? user.profileImage
                      : "https://static.vecteezy.com/system/resources/thumbnails/008/951/892/small_2x/cute-puppy-pomeranian-mixed-breed-pekingese-dog-run-on-the-grass-with-happiness-photo.jpg"
                  }
                  alt=""
                />
              </div>
            </div>

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
                        <p className="text-danger">{errors.lastName.message}</p>
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
                      <label>Introduceți descrierea *</label>
                      <input
                        type="text"
                        placeholder="Introduceți descrierea"
                        name="description"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-danger">
                          {errors.description.message}
                        </p>
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
                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Data *</label>
                      <input
                        type="date"
                        placeholder="Introduceți data"
                        name="data"
                        {...register("data")}
                      />
                      {errors.data && (
                        <p className="text-danger">{errors.data.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-inner">
                      <label>Ora *</label>
                      <input
                        type="time"
                        placeholder="Introduceți ora"
                        name="start_hour"
                        onChange={handleStartHourChange}
                        {...register("startHour")}
                      />
                      {errors.start_hour && (
                        <p className="text-danger">
                          {errors.start_hour.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-inner">
                      <label>Ora *</label>
                      <input
                        type="time"
                        placeholder="Introduceți ora"
                        name="end_hour"
                        min={startHour}
                        {...register("endHour")}
                      />
                      {errors.endHour && (
                        <p className="text-danger">{errors.endHour.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <button disabled={form.errors} className="account-btn">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;

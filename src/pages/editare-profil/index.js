// ** Next Imports

// ** React Imports
import React, { useEffect, useState, useCallback, useContext } from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";
import Map from "../../components/map";

// ** Third party libraries imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import Scheduler from "devextreme-react/scheduler";
import { AuthContext } from "../../context/AuthContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";

// ** Components imports
import Spinner from "../../components/common/Spinner";

const currentDate = new Date();
const views = ["day", "week", "workWeek", "month"];

const defaultValues = {
  firstName: "",
  lastName: "",
  phone: "",
  description: "",
  boarding: false,
  walking: false,
  daycare: false,
  sitting: false,
};

const validationSchema = yup
  .object()
  .shape({
    firstName: yup.string().required("Prenumele este obligatoriu."),
    lastName: yup.string().required("Numele este obligatoriu."),
    phone: yup.string().required("Telefonul este obligatoriu."),
    description: yup.string().required("Descrierea este obligatorie."),
    boarding: yup.boolean(),
    walking: yup.boolean(),
    daycare: yup.boolean(),
    sitting: yup.boolean(),
  })
  .test({
    name: "at-least-one-service",
    test: function (value) {
      const { boarding, walking, daycare, sitting } = value;
      return boarding || walking || daycare || sitting;
    },
    message: "Cel putin un serviciu trebuie sa fie selectat.",
  });

function editProfilePage() {
  const { loading } = useProtectedRoute();
  const { updateUser, user, uploadImage } = useContext(AuthContext);
  const [url, setUrl] = useState("");

  const onDrop = useCallback(async (files) => {
    const imageUrl = await uploadImage(files[0]);
    setUrl(imageUrl);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const {
      firstName,
      lastName,
      description,
      phone,
      boarding,
      walking,
      daycare,
      sitting,
    } = data;

    const displayName = `${firstName} ${lastName}`;
    const updatedUserObject = {
      ...user,
      displayName,
      description,
      phone,
      boarding,
      walking,
      daycare,
      sitting,
    };

    updateUser(updatedUserObject);
  };

  const onAppointmentsChanges = () => {
    const structedUserClone = structuredClone(user);
    updateUser(structedUserClone);
  };

  useEffect(() => {
    if (user) {
      const {
        displayName,
        description,
        phone,
        boarding,
        walking,
        daycare,
        sitting,
      } = user;
      const [firstName, lastName] = displayName.split(" ");

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phone", phone);
      setValue("description", description);
      setValue("boarding", boarding);
      setValue("walking", walking);
      setValue("daycare", daycare);
      setValue("sitting", sitting);
    }
  }, [user, setValue]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const uploadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  useEffect(() => {
    if (url) {
      console.log(url);
      console.log(user);
      updateUser({ ...user, profileImage: url });
    }
  }, [url]);

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <>
      <Layout>
        <div className="login-section pt-50 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-10 col-lg-10 col-md-12">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Profil</h3>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Prenume *</label>
                          <input
                            type="text"
                            placeholder="Prenume"
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
                            {...register("lastName")}
                          />
                          {errors.lastName && (
                            <p className="text-danger">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Telefon *</label>
                          <input
                            type="text"
                            placeholder="Telefon"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="text-danger">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Scurtă descriere*</label>
                          <textarea
                            type="text"
                            rows={3}
                            placeholder="Scurtă descriere"
                            {...register("description")}
                          />
                          {errors.description && (
                            <p className="text-danger">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                            <div className="form-group">
                              <input
                                type="checkbox"
                                id="boarding"
                                {...register("boarding")}
                              />
                              <label htmlFor="boarding">Dog Boarding</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                            <div className="form-group">
                              <input
                                type="checkbox"
                                id="walking"
                                {...register("walking")}
                              />
                              <label htmlFor="walking">Dog Walking</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                            <div className="form-group">
                              <input
                                type="checkbox"
                                id="daycare"
                                {...register("daycare")}
                              />
                              <label htmlFor="daycare">Dog Daycare</label>
                              {errors[""] && (
                                <p className="text-danger">
                                  {errors[""].message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                            <div className="form-group">
                              <input
                                type="checkbox"
                                id="sitting"
                                {...register("sitting")}
                              />
                              <label htmlFor="sitting">Dog Sitting</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-inner">
                          <label>File Upload *</label>
                          <div
                            {...getRootProps({ className: "dropzone" })}
                            style={{
                              border: "2px dashed grey",
                              backgroundColor: "#f8f8f8",
                              marginBottom: "0px",
                              cursor: "pointer",
                            }}
                          >
                            <input onChange={uploadFile} {...getInputProps()} />
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          </div>
                          <aside>
                            <h4>Files</h4>
                            <ul>{files}</ul>
                          </aside>
                        </div>
                      </div>
                    </div>

                    <button className="account-btn">Salveaza</button>
                  </form>
                </div>
              </div>
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
                  onAppointmentDeleted={onAppointmentsChanges}
                  onAppointmentAdded={onAppointmentsChanges}
                  onAppointmentUpdated={onAppointmentsChanges}
                />
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 mt-5">
                <Map latlong={user?.coords} profileEdit={true} />
                <div />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default editProfilePage;

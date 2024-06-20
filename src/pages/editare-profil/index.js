// ** Next Imports

// ** React Imports
import React, { useEffect, useState, useCallback, useContext } from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";
import Map from "../../components/map";

// ** Third party libraries imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Prenumele este obligatoriu."),
  lastName: yup.string().required("Numele este obligatoriu."),
  phone: yup.string().required("Telefonul este obligatoriu."),
  description: yup.string().required("Descrierea este obligatorie."),
});

function editProfilePage() {
  const { loading } = useProtectedRoute();
  const { updateUser, user, uploadImage } = useContext(AuthContext);
  const [url, setUrl] = useState("");

  const onDrop = useCallback(async (files) => {
    console.log(files);
    // Do something with the files
    const imageUrl = await uploadImage(files[0]);
    console.log(imageUrl);
    console.log(user);
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
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const { firstName, lastName, description, phone } = data;

    const displayName = `${firstName} ${lastName}`;
    const updatedUserObject = {
      ...user,
      displayName,
      description,
      phone,
    };

    updateUser(updatedUserObject);
  };

  const onAppointmentsChanges = () => {
    const structedUserClone = structuredClone(user);
    updateUser(structedUserClone);
  };

  useEffect(() => {
    if (user) {
      const { displayName, description, phone } = user;
      const [firstName, lastName] = displayName.split(" ");

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phone", phone);
      setValue("description", description);
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

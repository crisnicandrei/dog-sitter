// ** Next Imports
import Link from "next/link";

// ** React Imports
import React, { useEffect } from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";
import Map from "../../components/map";

// ** Third party libraries imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import Scheduler from "devextreme-react/scheduler";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const data = [
  {
    text: "Website Re-Design Plan",
    startDate: new Date("2021-04-26T16:30:00.000Z"),
    endDate: new Date("2021-04-26T18:30:00.000Z"),
  },
  {
    text: "Book Flights to San Fran for Sales Trip",
    startDate: new Date("2021-04-26T19:00:00.000Z"),
    endDate: new Date("2021-04-26T20:00:00.000Z"),
    allDay: true,
  },
  {
    text: "Install New Router in Dev Room",
    startDate: new Date("2021-04-26T21:30:00.000Z"),
    endDate: new Date("2021-04-26T22:30:00.000Z"),
  },
  {
    text: "Approve Personal Computer Upgrade Plan",
    startDate: new Date("2021-04-27T17:00:00.000Z"),
    endDate: new Date("2021-04-27T18:00:00.000Z"),
  },
  {
    text: "Final Budget Review",
    startDate: new Date("2021-04-27T19:00:00.000Z"),
    endDate: new Date("2021-04-27T20:35:00.000Z"),
  },
];

const currentDate = new Date(2021, 3, 29);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { user, updateUser } = useContext(AuthContext);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const onSubmit = (data) => {
    updateUser({
      ...user,
      description: data.description,
      phone: data.phone,
    });
  };

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name.split(" ");
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phone", user.phone);
      setValue("description", user.description);
    }
  }, [user, setValue]);

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
                            <input {...getInputProps()} />
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
                  dataSource={data}
                  views={views}
                  defaultCurrentView="day"
                  defaultCurrentDate={currentDate}
                  height={730}
                  startDayHour={9}
                />
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 mt-5">
                <Map latLong={{}} profileEdit={true} />
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

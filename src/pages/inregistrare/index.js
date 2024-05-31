// ** Next Imports
import Link from "next/link";

// ** React Imports
import React from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";

// ** Third party libraries imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { signInWithGoogle } from "../../configs/firebase.config";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAndConditions: false,
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Prenumele este obligatoriu."),
  lastName: yup.string().required("Numele este obligatoriu."),
  email: yup
    .string()
    .email("Adresa de email nu este validă.")
    .required("Email-ul este obligatoriu."),
  password: yup
    .string()
    .required("Parola este obligatorie.")
    .min(6, "Parola trebuie să conțină cel puțin 6 caractere."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Parola trebuie să fie la fel.")
    .required("Confirmarea parolei este obligatorie."),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "Trebuie să fiți de acord cu termenii și condițiile."),
});

function signUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => console.log("Form data:", data);

  const handleLoginWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <>
      <Layout>
        <div className="signup-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Înscriere</h3>
                    <p>
                      Ai deja un cont?
                      <Link legacyBehavior href="/autentificare">
                        <a>Autentifică-te aici</a>
                      </Link>
                    </p>
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
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Introduceți adresa de email *</label>
                          <input
                            type="text"
                            placeholder="Introduceți adresa de email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-danger">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Parola *</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Creați o parolă"
                            {...register("password")}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                          {errors.password && (
                            <p className="text-danger">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Confirmare parolă *</label>
                          <input
                            type="password"
                            name="password"
                            id="password2"
                            placeholder="Confirmare parolă"
                            {...register("confirmPassword")}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword2" />
                          {errors.confirmPassword && (
                            <p className="text-danger">
                              {errors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="html"
                              {...register("termsAndConditions")}
                            />
                            <label htmlFor="html">
                              Sunt de acord cu Termenii &amp; Politica
                            </label>
                            {errors.termsAndConditions && (
                              <p className="text-danger">
                                {errors.termsAndConditions.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Creează cont</button>
                  </form>
                  <div className="alternate-signup-box">
                    <h6>SAU ÎNSCRIE-TE CU</h6>
                    <div className="btn-group gap-4">
                      <button
                        className="eg-btn google-btn d-flex align-items-center"
                        onClick={() => handleLoginWithGoogle()}
                      >
                        <i className="bx bxl-google" />
                        <span>ÎNSCRIE-TE CU GOOGLE</span>
                      </button>
                      <a className="eg-btn facebook-btn d-flex align-items-center">
                        <i className="bx bxl-facebook" />
                        ÎNSCRIE-TE CU FACEBOOK
                      </a>
                    </div>
                  </div>
                  <div className="form-poicy-area">
                    <p>
                      Făcând clic pe butonul "înscrie-te", creezi un cont și
                      ești de acord cu
                      <a href="#">Termenii &amp; Condițiile </a> &amp;{" "}
                      <a href="#">Politica de Confidențialitate </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default signUpPage;

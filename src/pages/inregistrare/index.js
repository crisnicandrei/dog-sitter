// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** React Imports
import React, { useRef, useContext, useState } from "react";

import emailjs from "emailjs-com";

// ** Layout Imports
import Layout from "../../layout/Layout";
import { AuthContext } from "../../context/AuthContext";

// ** Third party libraries imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  const form = useRef();
  const router = useRouter();
  const { register: registerUser, signInAndRegisterUsingGoogle } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const sendEmail = (formData) => {
    const templateParams = {
      user_first_name: formData.firstName,
      user_last_name: formData.lastName,
      user_email: formData.email,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID
      )
      .then((result) => console.log(result));
  };

  const onSubmit = (formData) => {
    const { firstName, lastName, email, password } = formData;
    const name = firstName + " " + lastName;

    registerUser(name, email, password, router).then(() => {
      sendEmail(formData);
    });
  };

  const handleLoginWithGoogle = () => {
    signInAndRegisterUsingGoogle(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Creați o parolă"
                            {...register("password")}
                          />
                          <i
                            style={{ cursor: "pointer" }}
                            onClick={togglePasswordVisibility}
                            className="bi bi-eye-slash"
                            id="togglePassword"
                          />
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
                            type={showPassword2 ? "text" : "password"}
                            name="password"
                            id="password2"
                            placeholder="Confirmare parolă"
                            {...register("confirmPassword")}
                          />
                          <i
                            onClick={togglePassword2Visibility}
                            style={{ cursor: "pointer" }}
                            className="bi bi-eye-slash"
                            id="togglePassword2"
                          />
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
                              Sunt de acord cu <a href="/termeni">Termenii</a>{" "}
                              &amp; <a href="/gdpr">Politica</a>
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
                        className="eg-btn google-btn d-flex align-items-center p-2 rounded-2"
                        onClick={() => handleLoginWithGoogle()}
                      >
                        <i className="bx bxl-google" />
                        <span>ÎNSCRIE-TE CU GOOGLE</span>
                      </button>
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

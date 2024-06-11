// ** Next Imports
import Link from "next/link";

// ** React Imports
import React, { useContext } from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";

// ** Third party libraries imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";

import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../configs/firebase.config";
import { async } from "@firebase/util";
import { useRouter } from "next/router";

const defaultValues = {
  password: "",
  email: "",
  termsAndConditions: false,
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Adresa de email nu este validă.")
    .required("Email-ul este obligatoriu."),
  password: yup
    .string()
    .required("Parola este obligatorie.")
    .min(6, "Parola trebuie să conțină cel puțin 6 caractere."),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "Trebuie să fiți de acord cu termenii și condițiile."),
});

function loginPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    try {
      await login(email, password);
      router.push("/profil");
    } catch (error) {
      alert("Nume sau parola incorecta!");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push("/profil");
    } catch (error) {
      alert("A aparut o problema");
    }
  };

  return (
    <>
      <Layout>
        <div className="login-section pt-50 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Autentificare</h3>
                    <p>
                      Membru nou?
                      <Link legacyBehavior href="/inregistrare">
                        <a>Înscrie-te aici</a>
                      </Link>
                    </p>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-12">
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
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Parola *</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Parola"
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
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="html"
                              {...register("termsAndConditions")}
                            />

                            <label htmlFor="html">
                              Sunt de acord cu{" "}
                              <a href="#">Termenii &amp; Politica</a>
                            </label>
                          </div>
                          <a href="#" className="forgot-pass">
                            Parolă uitată
                          </a>
                          {errors.termsAndConditions && (
                            <p className="text-danger">
                              {errors.termsAndConditions.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Autentificare</button>
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
                      <a href="#">Politica de Confidențialitate</a>
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

export default loginPage;

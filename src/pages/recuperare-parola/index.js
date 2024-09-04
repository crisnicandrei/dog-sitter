// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** React Imports
import React, { useRef, useContext, useState } from "react";

// ** Layout Imports
import Layout from "../../layout/Layout";
import { AuthContext } from "../../context/AuthContext";

// ** Third party libraries imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const defaultValues = {
  email: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Adresa de email nu este validă.")
    .required("Email-ul este obligatoriu."),
});

function signUpPage() {
  const form = useRef();
  const router = useRouter();

  const { resetPassword } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (formData) => {
    resetPassword(formData.email);
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
                  <form
                    ref={form}
                    className="w-100"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
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
                    </div>
                    <button className="account-btn">Recuperare prola</button>
                  </form>
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

// ** React Imports
import { useState } from "react";

// ** Third party Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// ** Component Imports
import ProfileCard from "../../components/shop/ProfileCard";
import Layout from "../../layout/Layout";

// ** Firebase Imports
import {
  getAllAcceptedUsers,
  getUsersByCity,
} from "../../configs/firebase.config";

// ** Utils Imports

import { removeDiacriticsAndLowercase } from "../../utils";

const defaultValues = {
  city: "",
  boarding: false,
  walking: false,
  daycare: false,
  sitting: false,
};

const validationSchema = yup.object().shape({
  city: yup.string().required("Orasul este obligatoriu."),
  boarding: yup.boolean(),
  walking: yup.boolean(),
  daycare: yup.boolean(),
  sitting: yup.boolean(),
});

function GasesteSitter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    const { city, boarding, daycare, sitting, walking } = formData;

    const normalizeCity = removeDiacriticsAndLowercase(city);

    try {
      setLoading(true);

      const sittersRes = await getUsersByCity(
        normalizeCity,
        boarding,
        daycare,
        sitting,
        walking
      );

      setSitters(sittersRes);
    } catch (error) {
      console.log("THE ERROR IS:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
                <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="md-6">
                      <div className="form-inner">
                        <label>Oras *</label>
                        <input
                          type="text"
                          placeholder="Oras"
                          {...register("city")}
                        />
                        {errors.city && (
                          <p className="text-danger">{errors.city.message}</p>
                        )}
                      </div>
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
                  <button className="account-btn">Cauta</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {sitters.length && (
          <div className="row">
            <div className="col-lg-12">
              <h1 className="mb-30 mt-30 d-flex justify-content-center">
                Sitterii disponibili:
              </h1>
            </div>
            <div className="col-lg-12">
              <div className="row g-4 justify-content-center">
                <ProfileCard users={sitters} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default GasesteSitter;

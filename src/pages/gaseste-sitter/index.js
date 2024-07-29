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
import { getAllAcceptedUsers } from "../../configs/firebase.config";

const defaultValues = {
  city: "",
};

const validationSchema = yup.object().shape({
  city: yup.string().required("Orasul este obligatoriu."),
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

  function removeDiacriticsAndLowercase(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const onSubmit = async (formData) => {
    const { city } = formData;

    const normalizeCity = (city) => removeDiacriticsAndLowercase(city);

    try {
      setLoading(true);

      const sittersRes = await getAllAcceptedUsers(city);
      const normalizedCity = normalizeCity(city);

      const filteredSittersByTown = sittersRes.filter(
        ({ city: sitterCity }) => {
          const normalizedSitterCity = normalizeCity(sitterCity);
          return normalizedSitterCity === normalizedCity;
        }
      );

      setSitters(filteredSittersByTown);
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
                  <button className="account-btn">Cauta</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {sitters.length && (
          <div className="row">
            <div className="col-lg-12">
              <h1 className="mb-30">Sitterii disponibili:</h1>
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

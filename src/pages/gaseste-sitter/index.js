import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Layout from "../../layout/Layout";
import { AuthContext } from "../../context/AuthContext";
import ProfileCard from "../../components/shop/ProfileCard";

const defaultValues = {
  city: "",
};

const validationSchema = yup.object().shape({
  city: yup.string().required("Orasul este obligatoriu."),
});

function GasesteSitter() {
  const { fetchSitters } = useContext(AuthContext);

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
    const { city } = formData;
    try {
      setLoading(true);
      const sittersRes = await fetchSitters(city);
      setSitters(sittersRes);
    } catch (error) {}
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

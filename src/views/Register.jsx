import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import registerImg from "../assets/img/register.jpg";
import RegionContext from "../contexts/RegionContext";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { errorToast, successToast } from "../utils/toast.js";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import InputField from "../components/InputField.jsx";

const initialRegisterForm = {
  userName: "",
  password: "",
  email: "",
  idRegion: "",
  idCommune: "",
  name: "",
  firstSurname: "",
  secondSurname: "",
  street: "",
  streetNumber: "",
  phone: "+56",
  urlImgProfile: "",
};
const Register = () => {
  const navigate = useNavigate();
  const [userRegister, setUserRegister] = useState(initialRegisterForm);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const { regions, refreshRegions } = useContext(RegionContext);
  const [communes, setCommunes] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (regions.length === 0) {
      refreshRegions();
    }
  }, [regions, refreshRegions]);

  const handleUserRegister = (event) =>
    setUserRegister({
      ...userRegister,
      [event.target.name]: event.target.value,
    });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegionChange = async (event) => {
    handleUserRegister(event);
    const selectedRegionId = event.target.value;
    showSpinner();
    try {
      const response = await axios.get(
        `${ENDPOINT.communes}/${selectedRegionId}`,
      );
      setCommunes(response.data);
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  const handleRegisterForm = async (event) => {
    event.preventDefault();

    showSpinner();
    try {
      const { data } = await axios.post(ENDPOINT.register, userRegister);
      successToast(data.message);
      navigate("/login");
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <div className="container-register">
      <div className="form-image-register">
        <div className="form-register register">
          <form onSubmit={handleRegisterForm}>
            <h1>Registrarse</h1>

            <InputField
              icon="fa-solid fa-n"
              value={userRegister.name}
              name="name"
              type="text"
              placeholder="Nombre"
              onChange={handleUserRegister}
              required
            />

            <div className="input-register-group">
              <InputField
                icon="fa-solid fa-p"
                value={userRegister.firstSurname}
                name="firstSurname"
                type="text"
                placeholder="Primer Apellido"
                onChange={handleUserRegister}
                required
              />
              <InputField
                icon="fa-solid fa-s"
                value={userRegister.secondSurname}
                name="secondSurname"
                type="text"
                placeholder="Segundo Apellido"
                onChange={handleUserRegister}
              />
            </div>

            <div className="input-register-group">
              <InputField
                icon="fa-solid fa-envelope"
                value={userRegister.email}
                name="email"
                type="email"
                placeholder="Correo Electrónico"
                onChange={handleUserRegister}
                required
              />
              <InputField
                icon="fa-solid fa-phone"
                value={userRegister.phone}
                name="phone"
                type="tel"
                placeholder="Teléfono"
                onChange={handleUserRegister}
                required
              />
            </div>

            <InputField
              icon="fa-solid fa-user"
              value={userRegister.userName}
              name="userName"
              type="text"
              placeholder="Usuario"
              onChange={handleUserRegister}
              required
            />

            <div className="input-register">
              <i className="fa-solid fa-lock"></i>
              <input
                value={userRegister.password}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                onChange={handleUserRegister}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={togglePassword}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>

            <div className="input-register-group">
              <InputField
                icon="fa-solid fa-map-pin"
                value={userRegister.street}
                name="street"
                type="text"
                placeholder="Dirección"
                onChange={handleUserRegister}
                required
              />
              <InputField
                icon="fa-solid fa-map-pin"
                value={userRegister.streetNumber}
                name="streetNumber"
                type="number"
                placeholder="N° Dirección"
                onChange={handleUserRegister}
                required
              />
            </div>

            <div className="select-register">
              <select
                value={userRegister.idRegion}
                name="idRegion"
                onChange={handleRegionChange}
                required
              >
                <option hidden value="">
                  Región
                </option>
                {regions.map((region) => (
                  <option key={region.id_region} value={region.id_region}>
                    {region.name_region}
                  </option>
                ))}
              </select>

              <select
                value={userRegister.idCommune}
                name="idCommune"
                onChange={handleUserRegister}
                required
              >
                <option hidden value="">
                  Comuna
                </option>
                {communes.length > 0 ? (
                  communes.map((commune) => (
                    <option key={commune.id_commune} value={commune.id_commune}>
                      {commune.name_commune}
                    </option>
                  ))
                ) : (
                  <option disabled>No hay comunas</option>
                )}
              </select>
            </div>

            <div className="input-register-checkbox">
              <input type="checkbox" name="terminos" required />
              <span>
                Al marcar esta casilla, acepto los Términos y Condiciones, la
                Política de Privacidad, y la Política de Cookies de PetMarket.
              </span>
            </div>

            <div className="button-group">
              <button type="submit" className="register-btn">
                Registrarse
              </button>
              <Link to="/login">
                <button type="button" className="registrar-cuenta-btn">
                  Iniciar Sesión
                </button>
              </Link>
            </div>
          </form>
        </div>

        <div className="image-section">
          <img src={registerImg} alt="Image" />
          <div className="image-text">
            <h1>¡Hola!</h1>
            <p>
              Si ya tienes cuenta, solo presiona el botón de{" "}
              <span className="register-text">"Iniciar sesión"</span> y accede a
              todas las opciones para ti y tu mascota.
            </p>
            <Link to="/login" className="image-btn">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

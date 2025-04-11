import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import "../assets/css/login.css";
import loginImg from "../assets/img/login.jpg";
import { errorToast, successToast } from "../utils/toast.js";
import { ENDPOINT } from "../config/constants.js";
import UserContext from "../contexts/UserContext.jsx";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext";
import InputField from "../components/InputField.jsx";

const initialLoginForm = { userName: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialLoginForm);
  const { setUserData } = useContext(UserContext);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleLoginForm = async (event) => {
    event.preventDefault();

    if (!user.userName.trim()) {
      return errorToast("Usuario obligtorio");
    }

    if (!user.password.trim()) {
      return errorToast("Contraseña obligtoria");
    }

    showSpinner();

    try {
      const { data } = await axios.post(ENDPOINT.login, user);

      window.sessionStorage.setItem("token", data.token);
      setUserData(data);

      successToast(data.message);
      navigate("/");
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <div className="container-login">
      <div className="form-image-login">
        <div className="form-login login">
          <form onSubmit={handleLoginForm}>
            <h1>Iniciar Sesión</h1>

            <InputField
              icon="fa-solid fa-user"
              value={user.userName}
              name="userName"
              type="text"
              placeholder="Usuario"
              onChange={handleUser}
            />

            <InputField
              icon="fa-solid fa-lock"
              value={user.password}
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={handleUser}
            />

            <div className="button-group">
              <button type="submit" className="login-btn">
                Iniciar Sesión
              </button>
              <Link to="/register">
                <button type="button" className="login-account-btn">
                  Registrarse
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="image-section-login">
          <img src={loginImg} alt="Imagen de inicio de sesión" />
          <div className="image-text-login">
            <h1>¡Bienvenido!</h1>
            <p>
              Si aún no tienes cuenta, solo presiona el botón de{" "}
              <span className="login-account-text">"Registrarse"</span> y
              comienza a disfrutar de todas las opciones para ti y tu mascota.
            </p>
            <Link to="/register" className="image-btn-login">
              <b>Registrarse</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import "../assets/css/login.css";
import loginImg from "../assets/img/login.jpg";
import Context from "../contexts/Context.js";
import { errorToast, successToast } from "../utils/toast.js";
import { ENDPOINT } from "../config/constants.js";

const initialLoginForm = { userName: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialLoginForm);
  const { setDeveloper } = useContext(Context);

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleLoginForm = (event) => {
    event.preventDefault();

    if (!user.userName.trim()) {
      return errorToast("Usuario obligtorio");
    }

    if (!user.password.trim()) {
      return errorToast("Contraseña obligtoria");
    }

    axios
      .post(ENDPOINT.login, user)
      .then(({ data }) => {
        window.sessionStorage.setItem("token", data.token);
        successToast(data.message);
        setDeveloper({});
        navigate("/");
      })
      .catch(({ response: { data } }) => {
        return errorToast(data.message);
      });
  };

  return (
    <div className="container-login">
      <div className="form-image-login">
        <div className="form-login login">
          <form onSubmit={handleLoginForm}>
            <h1>Iniciar Sesión</h1>
            <div className="input-login">
              <i className="fa-solid fa-user"></i>
              <input
                value={user.userName}
                name="userName"
                type="text"
                placeholder="Usuario"
                onChange={handleUser}
              />
            </div>
            <div className="input-login">
              <i className="fa-solid fa-lock"></i>
              <input
                value={user.password}
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={handleUser}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="login-btn">
                Iniciar Sesión
              </button>
              <Link to="/registrarse">
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
            <Link to="/registrarse" className="image-btn-login">
              <b>Registrarse</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

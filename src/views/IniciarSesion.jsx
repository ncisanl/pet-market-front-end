import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/iniciar-sesion.css";
import iniciarSesionImg from "../assets/img/iniciar-sesion.jpg";

const IniciarSesion = () => {
  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      navigate("/perfil-usuario");
    } else {
      alert("Usuario no encontrado");
    }
  };

  return (
    <div className="container-iniciar-sesion">
      <div className="form-image-iniciar-sesion">
        <div className="form-iniciar-sesion iniciar-sesion">
          <form onSubmit={handleSubmitLogin}>
            <h1>Iniciar Sesión</h1>
            <div className="input-iniciar-sesion">
              <i className="fa-solid fa-user"></i>
              <input type="text" id="usuario" placeholder="Usuario" required />
            </div>
            <div className="input-iniciar-sesion">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" id="email" placeholder="Email" required />
            </div>
            <div className="input-iniciar-sesion">
              <i className="fa-solid fa-lock"></i>
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                required
              />
            </div>
            <button
              type="button"
              id="olvide-contrasena"
              className="olvide-contrasena"
            >
              ¿Olvidaste tu Contraseña?
            </button>
            <div className="button-group">
              <button type="submit" className="iniciar-sesion-btn">
                Iniciar Sesión
              </button>
              <Link to="/registrarse">
                <button type="button" className="iniciar-cuenta-btn">
                  Registrarse
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="image-section-iniciar-sesion">
          <img src={iniciarSesionImg} alt="Imagen de inicio de sesión" />
          <div className="image-text-iniciar-sesion">
            <h1>¡Bienvenido!</h1>
            <p>
              Si aún no tienes cuenta, solo presiona el botón de{" "}
              <span className="iniciar-cuenta-text">"Registrarte"</span> y
              comienza a disfrutar de todas las opciones para ti y tu mascota.
            </p>
            <Link to="/registrarse" className="image-btn-iniciar-sesion">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;

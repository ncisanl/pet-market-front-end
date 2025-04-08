import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/registrarse.css";
import registrarseImg from "../assets/img/registrarse.jpg";

const Registrarse = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    telefono: "",
    rut: "",
    email: "",
    password: "",
    direccion: "",
    region: "",
    comuna: "",
    terminos: false,
  });

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/login");
  };

  return (
    <div className="container-registrarse">
      <div className="form-image-registrarse">
        <div className="form-registrarse registrarse">
          <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>
            <div className="input-registrarse-group">
              <div className="input-registrarse">
                <i className="fa-solid fa-n"></i>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-registrarse">
                <i className="fa-solid fa-a"></i>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-registrarse-group">
              <div className="input-registrarse">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  name="usuario"
                  placeholder="Usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-registrarse">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-registrarse">
              <i className="fa-solid fa-list-ol"></i>
              <input
                type="text"
                name="rut"
                placeholder="Rut"
                value={formData.rut}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-registrarse">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-registrarse">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="button"
              id="registrarse-password"
              className="registrarse-password"
              onClick={togglePassword}
            >
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </button>

            <div className="input-registrarse">
              <i className="fa-solid fa-map-pin"></i>
              <input
                type="text"
                name="direccion"
                placeholder="Calle, Dirección"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="select-registrarse">
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option hidden>Región</option>
                <option>Aysén</option>
                <option>Antofagasta</option>
                <option>Arica y Parinacota</option>
                <option>Atacama</option>
                <option>Biobío</option>
                <option>Coquimbo</option>
                <option>Los Lagos</option>
                <option>Los Ríos</option>
                <option>Magallanes y de la Antártica Chilena</option>
                <option>Maule</option>
                <option>Ñuble</option>
                <option>O'Higgins</option>
                <option>Metropolitana</option>
                <option>Tarapacá</option>
                <option>Valparaíso</option>
              </select>

              <select
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                required
              >
                <option hidden>Comuna</option>
                <option value="Santiago">Santiago</option>
                <option value="Puente Alto">Puente Alto</option>
                <option value="Maipú">Maipú</option>
                <option value="Las Condes">Las Condes</option>
                <option value="La Florida">La Florida</option>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Viña del Mar">Viña del Mar</option>
                <option value="Concón">Concón</option>
                <option value="Quilpué">Quilpué</option>
                <option value="Concepción">Concepción</option>
                <option value="Chillán">Chillán</option>
                <option value="Los Ángeles">Los Ángeles</option>
                <option value="Antofagasta">Antofagasta</option>
                <option value="Calama">Calama</option>
                <option value="Tocopilla">Tocopilla</option>
              </select>
            </div>

            <div className="input-registrarse-checkbox">
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleChange}
                required
              />
              <span>
                Al marcar esta casilla, acepto los Términos y Condiciones, la
                Política de Privacidad, y la Política de Cookies de PetMarket.
              </span>
            </div>

            <div className="button-group">
              <button type="submit" className="registrarse-btn">
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
          <img src={registrarseImg} alt="Image" />
          <div className="image-text">
            <h1>¡Hola!</h1>
            <p>
              Si ya tienes cuenta, solo presiona el botón de{" "}
              <span className="registrarse-text">"Iniciar sesión"</span> y
              accede a todas las opciones para ti y tu mascota.
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

export default Registrarse;

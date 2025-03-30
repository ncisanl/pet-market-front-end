import React, { useState } from "react";
import "../assets/css/perfil-usuario.css";

const PerfilUsuario = () => {
  const [fotoPerfil, setFotoPerfil] = useState("default-photo.jpg");
  const [nombre, setNombre] = useState("Nombre");
  const [apellido, setApellido] = useState("Apellido");
  const [correo, setCorreo] = useState("Nombre.apellido@correo.com");
  const [telefono, setTelefono] = useState("123456789");
  const [direccion, setDireccion] = useState(
    "Calle Ficticia 123, Piso 4, Santiago, Chile",
  );
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [modalDireccionVisible, setModalDireccionVisible] = useState(false);

  const cambiarFoto = () => {
    document.getElementById("inputFoto").click();
  };

  const manejarCambioFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setFotoPerfil(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const abrirModalInfo = () => {
    setModalInfoVisible(true);
  };

  const cerrarModalInfo = () => {
    setModalInfoVisible(false);
  };

  const abrirModalDireccion = () => {
    setModalDireccionVisible(true);
  };

  const cerrarModalDireccion = () => {
    setModalDireccionVisible(false);
  };

  const editarInfo = () => {
    setNombre(document.getElementById("inputNombre").value);
    setApellido(document.getElementById("inputApellido").value);
    setCorreo(document.getElementById("inputCorreo").value);
    setTelefono(document.getElementById("inputTelefono").value);
    cerrarModalInfo();
  };

  const editarDireccion = () => {
    setDireccion(document.getElementById("inputDireccion").value);
    cerrarModalDireccion();
  };

  return (
    <div className="container">
      <div className="perfil-usuario">
        <div className="perfil-header">
          <div className="perfil-foto">
            <div id="fotoContainer" className="foto-container">
              <img src={fotoPerfil} alt="Foto de perfil" id="fotoPerfil" />
            </div>
            <input
              type="file"
              id="inputFoto"
              style={{ display: "none" }}
              accept="image/*"
              onChange={manejarCambioFoto}
            />
          </div>
          <button
            id="cambiarFoto"
            className="cambiar-foto-btn"
            onClick={cambiarFoto}
          >
            Cambiar Foto
          </button>
          <div className="perfil-info">
            <h2 id="nombreUsuario">{nombre}</h2>
            <p id="emailUsuario">{correo}</p>
          </div>
        </div>

        <div className="perfil-detalles">
          <div className="perfil-datos-personales">
            <h3>Información Personal</h3>
            <hr />
            <p className="strong">
              <strong>Nombre:</strong> <span id="nombre">{nombre}</span>
            </p>
            <p className="strong">
              <strong>Apellido:</strong> <span id="apellido">{apellido}</span>
            </p>
            <p className="strong">
              <strong>Correo:</strong> <span id="correo">{correo}</span>
            </p>
            <p className="strong">
              <strong>Teléfono:</strong> <span id="telefono">{telefono}</span>
            </p>
            <button
              className="editar-info-btn"
              id="editarInfo"
              onClick={abrirModalInfo}
            >
              <span>
                <i className="fa-solid fa-pen"></i>
              </span>{" "}
              Editar Información
            </button>
          </div>

          <div className="perfil-direccion">
            <h3>Datos de Envío</h3>
            <hr />
            <p className="strong">
              <strong>Dirección:</strong>{" "}
              <span id="direccion">{direccion}</span>
            </p>
            <button
              className="editar-info-btn"
              id="editarDireccion"
              onClick={abrirModalDireccion}
            >
              <span>
                <i className="fa-solid fa-pen"></i>
              </span>{" "}
              Editar Dirección
            </button>
          </div>
        </div>

        <button id="galeriaBtn" className="galeria-btn">
          Galería de imágenes
        </button>
      </div>

      {modalInfoVisible && (
        <div id="modalInfo" className="modal">
          <div className="modal-content-info">
            <span id="closeModal" className="close" onClick={cerrarModalInfo}>
              &times;
            </span>
            <h3>Editar Información Personal</h3>
            <form
              id="formInfo"
              onSubmit={(e) => {
                e.preventDefault();
                editarInfo();
              }}
            >
              <label htmlFor="inputNombre">Nombre:</label>
              <input type="text" id="inputNombre" defaultValue={nombre} />
              <label htmlFor="inputApellido">Apellido:</label>
              <input type="text" id="inputApellido" defaultValue={apellido} />
              <label htmlFor="inputCorreo">Correo:</label>
              <input type="email" id="inputCorreo" defaultValue={correo} />
              <label htmlFor="inputTelefono">Teléfono:</label>
              <input type="text" id="inputTelefono" defaultValue={telefono} />
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}

      {modalDireccionVisible && (
        <div id="modalDireccion" className="modal">
          <div className="modal-content-direccion">
            <span
              id="closeModalDireccion"
              className="close"
              onClick={cerrarModalDireccion}
            >
              &times;
            </span>
            <h3>Editar Dirección</h3>
            <form
              id="formDireccion"
              onSubmit={(e) => {
                e.preventDefault();
                editarDireccion();
              }}
            >
              <label htmlFor="inputDireccion">Dirección:</label>
              <input type="text" id="inputDireccion" defaultValue={direccion} />
              <button className="guardar-cambios-btn" type="submit">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;

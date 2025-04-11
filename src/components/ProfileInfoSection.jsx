import React, { useState } from "react";

const ProfileInfoSection = ({ data, onSave }) => {
  const [editing, setEditing] = useState(false);
  // Inicializa el estado local con la data recibida
  const [localData, setLocalData] = useState({
    userName: data.userName,
    name: data.name,
    firstSurname: data.firstSurname,
    secondSurname: data.secondSurname,
    email: data.email,
    phone: data.phone,
    street: data.street,
    streetNumber: data.streetNumber,
    idRegion: data.idRegion,
    idCommune: data.idCommune,
    urlImgProfile: data.urlImgProfile,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Llama a la función onSave que debe actualizar la data en el contexto/API.
    await onSave(localData);
    setEditing(false);
  };

  return (
    <div className="profile-datos-personales mb-4">
      <h3>Información Personal</h3>
      <hr className="hr-profile" />
      {editing ? (
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              value={localData.name || ""}
              onChange={handleChange}
              className="form-control"
              id="floatingName"
              placeholder="Nombre"
              required
            />
            <label htmlFor="floatingName">Nombre</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="firstSurname"
              value={localData.firstSurname || ""}
              onChange={handleChange}
              className="form-control"
              id="floatingFirstSurname"
              placeholder="Primer Apellido"
              required
            />
            <label htmlFor="floatingFirstSurname">Primer Apellido</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="secondSurname"
              value={localData.secondSurname || ""}
              onChange={handleChange}
              className="form-control"
              id="floatingSecondSurname"
              placeholder="Segundo Apellido"
            />
            <label htmlFor="floatingSecondSurname">Segundo Apellido</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={localData.email || ""}
              onChange={handleChange}
              className="form-control"
              id="floatingEmail"
              placeholder="Correo Electrónico"
              required
            />
            <label htmlFor="floatingEmail">Correo Electrónico</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="phone"
              value={localData.phone || ""}
              onChange={handleChange}
              className="form-control"
              id="floatingPhone"
              placeholder="Teléfono"
              required
            />
            <label htmlFor="floatingPhone">Teléfono</label>
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="p-profile">
            <strong>Nombre:</strong> {data.name}
          </p>
          <p className="p-profile">
            <strong>Primer Apellido:</strong> {data.firstSurname}
          </p>
          <p className="p-profile">
            <strong>Segundo Apellido:</strong> {data.secondSurname}
          </p>
          <p className="p-profile">
            <strong>Correo Electrónico:</strong> {data.email}
          </p>
          <p className="p-profile">
            <strong>Teléfono:</strong> {data.phone}
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="btn btn-outline-primary"
          >
            <i className="fa-solid fa-pen"></i> Editar Información
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileInfoSection;

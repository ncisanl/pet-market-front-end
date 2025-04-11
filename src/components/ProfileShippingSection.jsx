import React, { useState } from "react";

const ProfileShippingSection = ({ data, onSave }) => {
  const [editing, setEditing] = useState(false);
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
    await onSave(localData);
    setEditing(false);
  };

  return (
    <div className="profile-direccion mb-4">
      <h3>Datos de Envío</h3>
      <hr className="hr-profile" />
      {editing ? (
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="street"
              value={localData.street}
              onChange={handleChange}
              className="form-control"
              id="floatingStreet"
              placeholder="Calle"
              required
            />
            <label htmlFor="floatingStreet">Calle</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              name="streetNumber"
              value={localData.streetNumber}
              onChange={handleChange}
              className="form-control"
              id="floatingStreetNumber"
              placeholder="N° Dirección"
              required
            />
            <label htmlFor="floatingStreetNumber">N° Dirección</label>
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
            <strong>Dirección:</strong> {data.street}, {data.streetNumber}
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="btn btn-outline-primary"
          >
            <i className="fa-solid fa-pen"></i> Editar Dirección
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileShippingSection;

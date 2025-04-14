import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { errorToast, successToast } from "../utils/toast.js";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import InputField from "../components/InputField.jsx";
import PetTypeContext from "../contexts/PetTypeContext.jsx";
import CategoryContext from "../contexts/CategoryContext.jsx";

const initialRegisterPostForm = {
  categoryId: "",
  productName: "",
  brand: "",
  weightKg: "",
  price: "",
  sale: "",
  discountPercentage: "0",
  petType: "",
  title: "",
  simpleDescription: "",
  fullDescription: "",
  stock: "",
  available: true,
  urlImage: "",
};
const CreatePost = () => {
  const [postRegister, setPostRegister] = useState(initialRegisterPostForm);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const { petType, refreshPetType } = useContext(PetTypeContext);
  const { category, refreshCategory } = useContext(CategoryContext);
  useEffect(() => {
    if (petType.length === 0) {
      refreshPetType();
    }

    if (petType.length === 0) {
      refreshCategory();
    }
  }, [petType, refreshPetType, category, refreshCategory]);

  const handlePostRegister = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    if (
      name === "categoryId" ||
      name === "price" ||
      name === "discountPercentage" ||
      name === "petType" ||
      name === "stock"
    ) {
      newValue = parseInt(value, 10);
    } else if (name === "weightKg") {
      newValue = parseFloat(value);
    }
    setPostRegister({
      ...postRegister,
      [name]: newValue,
    });
  };

  const handleRegisterPostForm = async (event) => {
    event.preventDefault();

    const token = window.sessionStorage.getItem("token");
    showSpinner();
    try {
      await axios.post(ENDPOINT.post, postRegister, {
        headers: { Authorization: `Bearer ${token}` },
      });
      successToast("Publicación creada exitosamente");
      setPostRegister([]);
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <div className="container-register">
      <div className="form-image-create-post">
        <div className="form-create-post register">
          <form onSubmit={handleRegisterPostForm}>
            <h1>Crear Publicación</h1>

            <InputField
              icon="fa-solid fa-n"
              value={postRegister.productName}
              name="productName"
              type="text"
              placeholder="Nombre Producto"
              onChange={handlePostRegister}
              required
            />

            <div className="input-register-group">
              <InputField
                icon="fa-solid fa-b"
                value={postRegister.brand}
                name="brand"
                type="text"
                placeholder="Marca"
                onChange={handlePostRegister}
                required
              />
              <InputField
                icon="fa-solid fa-money-bill-1"
                value={postRegister.price}
                name="price"
                type="number"
                placeholder="Precio"
                onChange={handlePostRegister}
                required
              />
            </div>

            <div className="select-register">
              <select
                value={postRegister.petType}
                name="petType"
                onChange={handlePostRegister}
                required
              >
                <option hidden value="">
                  Tipo Mascota
                </option>
                {petType.map((type) => (
                  <option key={type.id_pet_type} value={type.id_pet_type}>
                    {type.name}
                  </option>
                ))}
              </select>

              <select
                value={postRegister.categoryId}
                name="categoryId"
                onChange={handlePostRegister}
                required
              >
                <option hidden value="">
                  Categoria
                </option>
                {category.map((categ) => (
                  <option key={categ.id_category} value={categ.id_category}>
                    {categ.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-register-group select-register">
              <select
                value={postRegister.sale}
                name="sale"
                onChange={handlePostRegister}
                required
              >
                <option hidden value="">
                  Oferta
                </option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <div
                className="input-register"
                style={{ marginTop: "5px", height: "47px" }}
              >
                <i className="fa-solid fa-percent"></i>
                <input
                  disabled={
                    postRegister.sale === "false" || postRegister.sale === ""
                  }
                  value={postRegister.discountPercentage}
                  name="discountPercentage"
                  type="number"
                  placeholder="Porcentaje Oferta"
                  onChange={handlePostRegister}
                />
              </div>
            </div>

            <div className="input-register-group">
              <InputField
                icon="fa-solid fa-weight-hanging"
                value={postRegister.weightKg}
                name="weightKg"
                type="number"
                placeholder="Peso"
                onChange={handlePostRegister}
              />
              <InputField
                icon="fa-solid fa-money-bill-trend-up"
                value={postRegister.stock}
                name="stock"
                type="number"
                placeholder="Stock"
                onChange={handlePostRegister}
                required
              />
            </div>

            <InputField
              icon="fa-solid fa-t"
              value={postRegister.title}
              name="title"
              type="text"
              placeholder="Título Publicación"
              onChange={handlePostRegister}
              required
            />

            <InputField
              icon="fa-solid fa-s"
              value={postRegister.simpleDescription}
              name="simpleDescription"
              type="text"
              placeholder="Descripción breve"
              onChange={handlePostRegister}
              required
            />

            <InputField
              icon="fa-solid fa-c"
              value={postRegister.fullDescription}
              name="fullDescription"
              type="text"
              placeholder="Descripción completa"
              onChange={handlePostRegister}
              required
            />

            <InputField
              icon="fa-solid fa-image"
              value={postRegister.urlImage}
              name="urlImage"
              type="text"
              placeholder="URL Imagen"
              onChange={handlePostRegister}
              required
            />

            <div className="button-group">
              <button type="submit" className="register-btn">
                Crear Publicación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

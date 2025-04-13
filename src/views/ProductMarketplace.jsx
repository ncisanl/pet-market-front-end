import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constants.js";
import { errorToast } from "../utils/toast.js";
import { useContext, useEffect, useState } from "react";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";

// Función para formatear el precio con separador de miles y prefijo "$"
const formatPrice = (price) => {
  if (!price) {
    return;
  }
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function ProductMarketplace() {
  const { postId } = useParams();
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const [postDetail, setPostDetail] = useState([]);

  useEffect(() => {
    const url = ENDPOINT.postDetail.replace(":postId", postId);
    showSpinner();
    axios
      .get(url)
      .then(({ data }) => {
        setPostDetail(data);
      })
      .catch(({ response: { data } }) => {
        errorToast(data.message);
      })
      .finally(() => hideSpinner());
  }, [showSpinner, hideSpinner]);

  if (!postDetail) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Producto no encontrado</h2>
        <p>El producto que buscas no está disponible.</p>
      </div>
    );
  }

  return (
    <section className="text-secondary body-font overflow-hidden">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 d-flex flex-wrap">
            <img
              alt={postDetail.title}
              className="col-lg-6 col-12 img-fluid rounded"
              src={
                postDetail.urlImage ||
                "https://via.placeholder.com/400x400?text=No+Image"
              }
            />
            <div className="col-lg-6 col-12 ps-lg-4 pt-4">
              <h2 className="text-muted text-uppercase small">
                {postDetail.brand}
              </h2>
              <h1 className="text-dark h3">{postDetail.title}</h1>
              <p className="text-muted">{postDetail.fullDescription}</p>
              <p className="text-muted">
                <small>
                  Stock: {postDetail.stock} | Peso: {postDetail.weightKg} kg
                </small>
              </p>
              <div className="d-flex">
                <span className="h4 text-dark">
                  {formatPrice(postDetail.price)}
                </span>
                <button className="btn btn-primary ms-auto">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductMarketplace;

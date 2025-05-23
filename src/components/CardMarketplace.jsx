import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext.jsx";

// Función para formatear el precio con separador de miles y prefijo "$"
const formatPrice = (price) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CardMarketplace = ({
  product,
  onToggleFavorite,
  showFavorites = true,
  showDelete = false,
  onToggleDelete,
}) => {
  const { userData } = useContext(UserContext);
  const [postFavorite, setFavorite] = useState(product.postFavorite || false);

  const isLogin = () => {
    if (userData && showFavorites) {
      return (
        <button
          className="btn btn-link p-0"
          onClick={toggleFavorite}
          aria-label="Toggle Favorite"
        >
          <i
            className="fa-solid fa-heart"
            style={{ color: postFavorite ? "red" : "grey", fontSize: "1.5rem" }}
          ></i>
        </button>
      );
    }
  };

  const isShowDelete = () => {
    if (showDelete) {
      return (
        <button onClick={toggleDelete} className="btn btn-danger">
          Eliminar
        </button>
      );
    }
  };

  useEffect(() => {
    setFavorite(product.postFavorite || false);
  }, [product.postFavorite]);

  const toggleFavorite = () => {
    const newFavorite = !postFavorite;
    setFavorite(newFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(product.postId, product.favoriteId, newFavorite);
    }
  };

  const toggleDelete = () => {
    if (onToggleDelete) {
      onToggleDelete(product.postId);
    }
  };

  return (
    <div className="card mb-4" style={{ width: "18rem" }}>
      <img
        src={
          product.urlImage ||
          "https://via.placeholder.com/286x180?text=No+Image"
        }
        className="card-img-top"
        alt={product.title}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{product.title}</h5>
          {isLogin()}
        </div>
        <p className="card-text">{product.simpleDescription}</p>
        <p className="card-text">
          <small className="text-muted">Marca: {product.brand}</small>
        </p>
        <p className="card-text">
          <strong>{formatPrice(product.price)}</strong>
          {product.sale && (
            <span className="badge bg-danger ms-2">
              {product.discountPercentage}% OFF
            </span>
          )}
        </p>
        {product.available ? (
          <span className="badge bg-success">Disponible</span>
        ) : (
          <span className="badge bg-secondary">No disponible</span>
        )}
        <div className="mt-3 d-flex justify-content-between">
          <Link
            to={`/marketplace/post/${product.postId}`}
            className="btn btn-primary"
          >
            Ver Detalle
          </Link>
          {isShowDelete()}
        </div>
      </div>
    </div>
  );
};

export default CardMarketplace;

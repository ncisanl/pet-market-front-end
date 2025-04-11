import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Función para formatear el precio con separador de miles y prefijo "$"
const formatPrice = (price) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CardMarketplace = ({ product, onToggleFavorite }) => {
  const [favorite, setFavorite] = useState(product.favorite || false);

  useEffect(() => {
    setFavorite(product.favorite || false);
  }, [product.favorite]);

  const toggleFavorite = () => {
    const newFavorite = !favorite;
    setFavorite(newFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(product.idPost, newFavorite);
    }
  };

  return (
    <div className="card mb-4" style={{ width: "18rem" }}>
      <img
        src={
          product.imgPost || "https://via.placeholder.com/286x180?text=No+Image"
        }
        className="card-img-top"
        alt={product.title}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{product.title}</h5>
          <button
            className="btn btn-link p-0"
            onClick={toggleFavorite}
            aria-label="Toggle Favorite"
          >
            <i
              className="fa-solid fa-heart"
              style={{ color: favorite ? "red" : "grey", fontSize: "1.5rem" }}
            ></i>
          </button>
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
        <div className="mt-3">
          <Link
            to={`/marketplace/post/${product.idPost}`}
            className="btn btn-primary"
          >
            Ver Detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardMarketplace;

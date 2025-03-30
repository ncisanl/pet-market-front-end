// Función para formatear el precio con separador de miles y prefijo "$"
const formatPrice = (price) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CardMarketplace = ({ product }) => {
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
        <h5 className="card-title">{product.title}</h5>
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
      </div>
    </div>
  );
};

export default CardMarketplace;

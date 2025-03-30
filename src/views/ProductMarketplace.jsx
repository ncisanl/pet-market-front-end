import { useParams } from "react-router-dom";
import { postsDetail } from "../assets/js/postDetail.js";

// Función para formatear el precio con separador de miles y prefijo "$"
const formatPrice = (price) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function ProductMarketplace() {
  const { postId } = useParams();

  // Buscar el producto por ID en postDetail
  const product = postsDetail.find((post) => post.idPost === postId);

  if (!product) {
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
            {/* Imagen del producto */}
            <img
              alt={product.title}
              className="col-lg-6 col-12 img-fluid rounded"
              src={
                product.imgPost ||
                "https://via.placeholder.com/400x400?text=No+Image"
              }
            />
            {/* Detalles del producto */}
            <div className="col-lg-6 col-12 ps-lg-4 pt-4">
              <h2 className="text-muted text-uppercase small">
                {product.brand}
              </h2>
              <h1 className="text-dark h3">{product.title}</h1>
              {/* Descripción completa del producto */}
              <p className="text-muted">{product.fullDescription}</p>
              <p className="text-muted">
                <small>
                  Stock: {product.stock} | Peso: {product.weightKg} kg
                </small>
              </p>
              {/* Sección para opciones de color o tamaño (si estuvieran disponibles) */}
              <div className="d-flex">
                <span className="h4 text-dark">
                  {formatPrice(product.price)}
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

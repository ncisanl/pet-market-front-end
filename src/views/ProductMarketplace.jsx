import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constants.js";
import { errorToast, successToast } from "../utils/toast.js";
import { useContext, useEffect, useState } from "react";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import UserContext from "../contexts/UserContext.jsx";
import CartContext from "../contexts/CartContext.jsx";

// Función para formatear el precio con separador de miles y prefijo "$"
const formatPrice = (price) => {
  if (!price) {
    return "";
  }

  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function ProductMarketplace() {
  const { postId } = useParams();
  const { userData } = useContext(UserContext);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const { cartData, setCartData } = useContext(CartContext);
  const [postDetail, setPostDetail] = useState(null);

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
  }, [postId, showSpinner, hideSpinner]);

  const createOrAddPostCart = async () => {
    showSpinner();
    const token = window.sessionStorage.getItem("token");

    try {
      if (cartData) {
        const url = ENDPOINT.addPostCart.replace(":cartId", cartData.cartId);
        const bodyCart = {
          postId: postDetail.postId,
          quantity: 1,
        };
        await axios.post(url, bodyCart, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return successToast("Artículo agregado exitosamente!");
      }

      const bodyCart = {
        postId: postDetail.postId,
        quantity: 1,
      };
      const { data } = await axios.post(ENDPOINT.createCart, bodyCart, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartData(data);
      return successToast("Artículo agregado exitosamente!");
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  const isLogin = () => {
    if (userData) {
      return (
        <div className="d-flex">
          <span className="h4 text-dark">{formatPrice(finalPrice)}</span>
          <button
            className="btn btn-primary ms-auto"
            onClick={createOrAddPostCart}
          >
            Agregar al carrito
          </button>
        </div>
      );
    }

    return (
      <div className="d-flex">
        <span className="h4 text-dark">{formatPrice(finalPrice)}</span>
      </div>
    );
  };

  if (!postDetail) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Producto no encontrado</h2>
        <p>El producto que buscas no está disponible.</p>
      </div>
    );
  }

  const finalPrice = postDetail.sale
    ? postDetail.price -
      postDetail.price * (postDetail.discountPercentage / 100)
    : postDetail.price;

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
              {isLogin()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductMarketplace;

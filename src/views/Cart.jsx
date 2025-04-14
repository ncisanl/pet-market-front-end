import { useCallback, useContext, useEffect, useState } from "react";
import "../assets/css/cart.css";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { errorToast, successToast } from "../utils/toast.js";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import CartContext from "../contexts/CartContext.jsx";

// Función para formatear el precio con separador de miles y prefijo "$"
const formatPrice = (price) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const Cart = () => {
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const { cartData, clearCartData } = useContext(CartContext);
  const [cart, setCart] = useState([]);

  const loadCart = useCallback(() => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    axios
      .get(ENDPOINT.cart, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setCart(data);
      })
      .catch(({ response: { data } }) => {
        errorToast(data.message);
      })
      .finally(() => hideSpinner());
  }, [showSpinner, hideSpinner]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const removeProduct = async (postId) => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    const url = ENDPOINT.deletePostCart
      .replace(":cartId", cartData.cartId)
      .replace(":postId", postId);
    try {
      const { data } = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      successToast(data.message);
      loadCart();
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  const updateQuantity = async (postId, quantity) => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    const url = ENDPOINT.modifyPostCart
      .replace(":cartId", cartData.cartId)
      .replace(":postId", postId)
      .replace(":quantity", quantity);
    try {
      await axios.put(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      successToast("Post modificado del carrito correctamente");
      loadCart();
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  const deleteCart = async () => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    const url = ENDPOINT.deleteCart.replace(":cartId", cartData.cartId);
    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      successToast("Compra finalizada exitosamente");
      setCart([]);
      clearCartData();
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) =>
        total +
        (product.price - product.price * (product.discountPercentage / 100)) *
          product.quantity,
      0,
    );
  };

  return (
    <div className="cart-container">
      <h1 className="cart-h1">Carrito de Compras</h1>
      <div className="cart-items">
        {cart.map((product) => (
          <div key={product.postId} className="cart-item">
            <div className="cart-item-info">
              <h3>{product.productName}</h3>
              <p>
                {formatPrice(
                  product.price -
                    product.price * (product.discountPercentage / 100),
                )}
              </p>
            </div>
            <div className="cart-quantity-control">
              <button
                onClick={() =>
                  updateQuantity(product.postId, product.quantity - 1)
                }
                disabled={product.quantity <= 1}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(product.postId, product.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <div className="cart-remove-item">
              <button onClick={() => removeProduct(product.postId)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: {formatPrice(calculateTotal())}</h3>
      </div>
      <div className="cart-checkout">
        {cart.length > 0 && (
          <div className="cart-checkout">
            <button onClick={deleteCart}>Finalizar Compra</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

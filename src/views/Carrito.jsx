import React, { useState } from "react";
import "../assets/css/carrito.css";

const Carrito = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Producto 1", price: 15000, quantity: 1 },
    { id: 2, name: "Producto 2", price: 10000, quantity: 1 },
    { id: 3, name: "Producto 3", price: 30000, quantity: 1 },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR").format(price);
  };

  const addProduct = (id) => {
    setCart(
      cart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };

  const removeProduct = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity } : product,
      ),
    );
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  };

  return (
    <div className="carrito-container">
      <h1 className="carrito-h1">Carrito de Compras</h1>
      <div className="carrito-items">
        {cart.map((product) => (
          <div key={product.id} className="carrito-item">
            <div className="carrito-item-info">
              <h3>{product.name}</h3>
              <p>${formatPrice(product.price)}</p>
            </div>
            <div className="carrito-quantity-control">
              <button
                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                disabled={product.quantity <= 1}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, product.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="carrito-remove-item">
              <button onClick={() => removeProduct(product.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="carrito-total">
        <h3>Total: ${formatPrice(calculateTotal())}</h3>
      </div>
      <div className="carrito-checkout">
        <button>Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Carrito;

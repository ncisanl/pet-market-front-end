import { createContext, useState } from "react";

const CartContext = createContext({
  cartData: null,
  setCartData: () => {},
  clearCartData: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);

  const clearCartData = () => setCartData(null);

  return (
    <CartContext.Provider value={{ cartData, setCartData, clearCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

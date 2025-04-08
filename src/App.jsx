import "./assets/css/style.css";
import Context from "./contexts/Context";
import useDeveloper from "./hooks/useDeveloper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Footer from "./components/Footer";
import Registrarse from "./views/Registrarse";
import Login from "./views/Login.jsx";
import Carrito from "./views/Carrito";
import Marketplace from "./views/Marketplace";
import ProductMarketplace from "./views/ProductMarketplace";
import Favorite from "./views/Favorite";

const App = () => {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <div className="grid-container">
          <Navigation />
          <main className="content">
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registrarse" element={<Registrarse />} />
              <Route path="/login" element={<Login />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route
                path="/marketplace/:petType/:category"
                element={<Marketplace />}
              />
              <Route
                path="/marketplace/post/:postId"
                element={<ProductMarketplace />}
              />
              <Route path="/favorite" element={<Favorite />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;

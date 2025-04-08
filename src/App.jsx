import "./assets/css/style.css";
import { UserProvider } from "./contexts/UserContext.jsx";
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
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;

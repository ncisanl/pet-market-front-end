import "./assets/css/style.css";
import Context from "./contexts/Context";
import useDeveloper from "./hooks/useDeveloper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Footer from "./components/Footer";
import Registrarse from "./views/Registrarse";
import IniciarSesion from "./views/IniciarSesion";
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registrarse" element={<Registrarse />} />
              <Route path="/iniciar-sesion" element={<IniciarSesion />} />
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

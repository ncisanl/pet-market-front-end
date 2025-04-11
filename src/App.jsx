import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { GlobalSpinnerProvider } from "./contexts/GlobalSpinnerContext";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import { RegionProvider } from "./contexts/RegionContext";

import GlobalSpinner from "./components/GlobalSpinner";
import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Footer from "./components/Footer";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import Profile from "./views/Profile.jsx";
import Carrito from "./views/Carrito";
import Marketplace from "./views/Marketplace";
import ProductMarketplace from "./views/ProductMarketplace";
import Favorite from "./views/Favorite";

const App = () => {
  return (
    <GlobalSpinnerProvider>
      <RegionProvider>
        <UserProvider>
          <ProfileProvider>
            <BrowserRouter>
              <GlobalSpinner />
              <div className="grid-container">
                <Navigation />
                <main className="content">
                  <ToastContainer />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
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
          </ProfileProvider>
        </UserProvider>
      </RegionProvider>
    </GlobalSpinnerProvider>
  );
};

export default App;

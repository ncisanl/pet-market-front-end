import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { GlobalSpinnerProvider } from "./contexts/GlobalSpinnerContext";
import { UserProvider } from "./contexts/UserContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import { RegionProvider } from "./contexts/RegionContext";

import GlobalSpinner from "./components/GlobalSpinner";
import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Footer from "./components/Footer";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import Profile from "./views/Profile.jsx";
import Cart from "./views/Cart.jsx";
import Marketplace from "./views/Marketplace";
import ProductMarketplace from "./views/ProductMarketplace";
import Favorite from "./views/Favorite";
import MyPost from "./views/MyPost";

const App = () => {
  return (
    <GlobalSpinnerProvider>
      <RegionProvider>
        <UserProvider>
          <CartProvider>
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
                      <Route path="/cart" element={<Cart />} />
                      <Route
                        path="/marketplace/:petType/:category"
                        element={<Marketplace />}
                      />
                      <Route
                        path="/marketplace/post/:postId"
                        element={<ProductMarketplace />}
                      />
                      <Route path="/favorite" element={<Favorite />} />
                      <Route path="/my-post" element={<MyPost />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </ProfileProvider>
          </CartProvider>
        </UserProvider>
      </RegionProvider>
    </GlobalSpinnerProvider>
  );
};

export default App;

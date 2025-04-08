import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import logo from "../assets/icon/tabIcon.png";
import Context from "../contexts/Context.js";

const petTypes = [
  { name: "Gato", path: "gato" },
  { name: "Perro", path: "perro" },
  { name: "Exótico", path: "exotico" },
];

const categories = ["Alimentos", "Snacks", "Medicamentos", "Accesorios"];

const Navigation = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const logout = () => {
    setDeveloper();
    window.sessionStorage.removeItem("token");
    navigate("/login");
  };
  const isLogin = () => {
    if (getDeveloper) {
      return (
        <>
          <li>
            <Link className="dropdown-item" to="/">
              Perfil
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/">
              Publicaciones
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/favorite">
              Favoritos
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link onClick={logout} className="dropdown-item" to="/login">
              Cerrar Sesión
            </Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          <Link className="dropdown-item" to="/login">
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/registrarse">
            Registrarse
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img alt="Logo PetMarket" src={logo} width="30" height="30" />
          PetMarket
        </Link>

        <div className="d-flex d-lg-none">
          <Link className="nav-link login-button shopping-button" to="/">
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
          </Link>

          <li className="nav-item dropdown d-flex ms-3">
            <button
              className="nav-link login-button"
              id="navbarDropdownMobile"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-boundary="viewport"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user fa-lg"></i>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMobile"
            >
              {isLogin()}
            </ul>
          </li>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {petTypes.map((pet, index) => (
              <li className="nav-item dropdown" key={index}>
                <button
                  className="nav-link nav-link-personalized dropdown-toggle"
                  id={`petDropdown-${pet.path}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-boundary="viewport"
                  aria-expanded="false"
                >
                  {pet.name}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`petDropdown-${pet.path}`}
                >
                  {categories.map((category, categoryIndex) => (
                    <li key={categoryIndex}>
                      <Link
                        className="dropdown-item"
                        to={`/marketplace/${pet.path}/${category.toLowerCase()}`}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="nav-item">
              <Link className="nav-link nav-link-personalized" to="/">
                Ofertas
              </Link>
            </li>
          </ul>

          <div className="d-none d-lg-flex">
            <Link
              className="nav-link login-button shopping-button"
              to="/carrito"
            >
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
            </Link>
          </div>

          <li className="nav-item dropdown d-none d-lg-flex ms-3">
            <button
              className="nav-link login-button"
              id="navbarDropdownDesktop"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-boundary="viewport"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user fa-lg"></i>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownDesktop"
            >
              {isLogin()}
            </ul>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

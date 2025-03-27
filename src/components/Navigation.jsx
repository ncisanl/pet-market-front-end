import { Link } from "react-router-dom";
import logo from "../assets/icon/tabIcon.png";

const Navigation = () => {
  const tokenTemp = false;

  const isLogin = () => {
    if (tokenTemp) {
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
            <Link className="dropdown-item" to="/">
              Favoritos
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/">
              Cerrar Sesión
            </Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          <Link className="dropdown-item" to="/">
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/">
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
            <li className="nav-item">
              <Link className="nav-link nav-link-personalized" to="/">
                Gato
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-personalized" to="/">
                Perro
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-personalized" to="/">
                Exótico
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-personalized" to="/">
                Ofertas
              </Link>
            </li>
          </ul>

          <div className="d-none d-lg-flex">
            <Link className="nav-link login-button shopping-button" to="/">
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

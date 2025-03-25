import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../contexts/Context";
import logo from "../assets/icon/tabIcon.png";

const Navigation = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const logout = () => {
    setDeveloper();
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light sticky-top">
      <div className="container-fluid">
        <Link to="/" className="poppins-semibold">
          <img alt="Logo PetMarket" src={logo} width="30" height="30" />
          PetMarket
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;

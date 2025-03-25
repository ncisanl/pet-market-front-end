import logo from "../assets/icon/tabIcon.png";

const Footer = () => {
  return (
    <div className="container-fluid footer-pet-market">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-2">
        <div className="col-md-4 d-flex align-items-center">
          <img
            className="me-2"
            alt="Logo PetMarket"
            src={logo}
            width="30"
            height="30"
          />
          <span className="mb-3 mb-md-0 text-white poppins-light">
            © 2025 PetMarket
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <i className="fa-brands fa-x-twitter fa-lg icon-footer"></i>
          </li>
          <li className="ms-3">
            <i className="fa-brands fa-instagram fa-lg icon-footer"></i>
          </li>
          <li className="ms-3">
            <i className="fa-brands fa-facebook fa-lg icon-footer"></i>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;

import { Link } from "react-router-dom";

const CardHome = ({ icon, title, description, titleButton }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="bg-light p-4 h-100 rounded">
        <div className="d-flex align-items-center mb-3">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle me-3 icon-card-home-personalized">
            {icon}
          </div>
          <h2 className="h5 mb-0 text-dark">{title}</h2>
        </div>
        <p className="mb-3">{description}</p>
        <Link
          to="/"
          className="text-decoration-none text-primary d-inline-flex align-items-center"
        >
          {titleButton}
          <i className="fa-solid fa-arrow-right ms-2"></i>
        </Link>
      </div>
    </div>
  );
};

export default CardHome;

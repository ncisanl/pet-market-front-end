import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
    const { pathname } = useLocation();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="display-1 text-danger">404</h1>
            <p className="lead">No encontramos nada en <code>{pathname}</code></p>
            <Link to="/" className="btn btn-primary">
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;

import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import axios from "axios";
import { ENDPOINT } from "../config/constants.js";
import { errorToast } from "../utils/toast.js";
import CardMarketplace from "../components/CardMarketplace.jsx";

function MyPost() {
  const [myPosts, setMyPosts] = useState([]);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);

  const loadMyPosts = useCallback(() => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    axios
      .get(ENDPOINT.myPosts, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setMyPosts(data);
      })
      .catch(({ response: { data } }) => {
        errorToast(data.message);
      })
      .finally(() => hideSpinner());
  }, [showSpinner, hideSpinner]);

  useEffect(() => {
    loadMyPosts();
  }, [loadMyPosts]);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="text-2xl font-bold text-dark">Publicaciones</h1>
          <p className="mt-2 text-muted">
            Aquí se muestran todas tus publicaciones.
          </p>
        </div>
        <Link to="/create-post" className="btn btn-primary">
          Crear Publicación
        </Link>
      </div>

      <div className="row mt-4">
        {myPosts.length > 0 ? (
          myPosts.map((product) => (
            <div
              key={product.postId}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4"
            >
              <CardMarketplace product={product} showFavorites={false} />
            </div>
          ))
        ) : (
          <p className="text-muted mt-4">No se encontraron publicaciones.</p>
        )}
      </div>
    </div>
  );
}

export default MyPost;

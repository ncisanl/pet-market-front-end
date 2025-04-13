import { useCallback, useContext, useEffect, useState } from "react";
import CardMarketplace from "../components/CardMarketplace";
import Pagination from "../components/Pagination";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { errorToast, successToast } from "../utils/toast.js";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";

function Favorite() {
  const [postsFavorites, setPostsFavorites] = useState([]);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);

  const loadFavorites = useCallback(() => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    axios
      .get(ENDPOINT.favorites, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setPostsFavorites(data);
      })
      .catch(({ response: { data } }) => {
        errorToast(data.message);
      })
      .finally(() => hideSpinner());
  }, [showSpinner, hideSpinner]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const onToggleFavorite = useCallback(
    async (postId, favoriteId) => {
      const token = window.sessionStorage.getItem("token");
      showSpinner();
      const url = ENDPOINT.deletePostFavorite.replace(
        ":favoriteId",
        favoriteId,
      );
      try {
        const { data } = await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        successToast(data.message);
        loadFavorites();
      } catch ({ response: { data } }) {
        errorToast(data.message);
      } finally {
        hideSpinner();
      }
    },
    [showSpinner, hideSpinner, loadFavorites],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const totalPosts = postsFavorites.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const postsToShow = postsFavorites.slice(startIndex, startIndex + pageSize);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-dark">Favoritos</h1>
      <p className="mt-2 text-muted">
        Aquí se muestran todos los productos marcados como favoritos.
      </p>

      <div className="row mt-4">
        {postsToShow.length > 0 ? (
          postsToShow.map((product) => (
            <div
              key={product.postId}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4"
            >
              <CardMarketplace
                product={product}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))
        ) : (
          <p className="text-muted mt-4">
            No se encontraron productos favoritos.
          </p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrev={handlePrev}
        handleNext={handleNext}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}

export default Favorite;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMarketplace from "../components/CardMarketplace";
import Pagination from "../components/Pagination";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import axios from "axios";
import { ENDPOINT } from "../config/constants.js";
import { errorToast, successToast } from "../utils/toast.js";

function Marketplace() {
  const { petType, category } = useParams();
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const [posts, setPosts] = useState([]);

  const petTypeId = petType === "gato" ? 1 : petType === "perro" ? 2 : 3;
  const categoryId =
    category === "alimentos"
      ? 1
      : category === "snacks"
        ? 2
        : category === "medicamentos"
          ? 3
          : 4;

  useEffect(() => {
    const url = ENDPOINT.postCategoryPetType
      .replace(":petTypeId", petTypeId)
      .replace(":categoryId", categoryId);
    showSpinner();
    axios
      .get(url)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(({ response: { data } }) => {
        errorToast(data.message);
      })
      .finally(() => hideSpinner());
  }, [petTypeId, categoryId, showSpinner, hideSpinner]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const postsToShow = posts.slice(startIndex, startIndex + pageSize);

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

  const onToggleFavorite = async (postId) => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    try {
      await axios.post(
        `${ENDPOINT.addPostFavorite}`,
        { postId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      successToast("Estado de favorito actualizado");
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-dark">
        {category.charAt(0).toUpperCase() + category.slice(1)} para{" "}
        {petType.charAt(0).toUpperCase() + petType.slice(1)}
      </h1>
      <p className="mt-2 text-muted">
        Aquí encontrarás los mejores {category} para {petType}.
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
            No se encontraron productos para esta categoría.
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

export default Marketplace;

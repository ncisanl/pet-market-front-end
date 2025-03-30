import { useState } from "react";
import { posts } from "../assets/js/post.js";
import CardMarketplace from "../components/CardMarketplace";
import Pagination from "../components/Pagination";

function Favorite() {
  // Filtrar los productos que tengan favorite true
  const filteredPosts = posts.filter((post) => post.favorite === true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const postsToShow = filteredPosts.slice(startIndex, startIndex + pageSize);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reinicia a la primera página al cambiar el tamaño
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
              key={product.idPost}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4"
            >
              <CardMarketplace product={product} />
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

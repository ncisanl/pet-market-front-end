const Pagination = ({
  currentPage,
  totalPages,
  handlePrev,
  handleNext,
  pageSize,
  handlePageSizeChange,
}) => {
  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrev}>
              Anterior
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              Página {currentPage} de {totalPages}
            </span>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages || totalPages === 0 ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNext}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-3 d-flex align-items-center">
        <label htmlFor="pageSizeSelect" className="me-2">
          Mostrar:
        </label>
        <select
          id="pageSizeSelect"
          className="form-select w-auto"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
        </select>
        <span className="ms-2">productos por página</span>
      </div>
    </div>
  );
};

export default Pagination;

import { useCallback, useContext, useEffect, useState } from "react";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import axios from "axios";
import { ENDPOINT } from "../config/constants.js";
import { errorToast } from "../utils/toast.js";
import CardMarketplace from "../components/CardMarketplace.jsx";

function Sales() {
  const [postsSale, setPostsSale] = useState([]);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);

  const loadPostsSale = useCallback(() => {
    showSpinner();
    axios
      .get(ENDPOINT.postsSales)
      .then(({ data }) => {
        setPostsSale(data);
      })
      .catch(({ response: { data } }) => {
        errorToast(data.message);
      })
      .finally(() => hideSpinner());
  }, [showSpinner, hideSpinner]);

  useEffect(() => {
    loadPostsSale();
  }, [loadPostsSale]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-dark">Ofertas</h1>
      <p className="mt-2 text-muted">Aquí se muestran todas las ofertas.</p>

      <div className="row mt-4">
        {postsSale.length > 0 ? (
          postsSale.map((product) => (
            <div
              key={product.postId}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4"
            >
              <CardMarketplace product={product} showFavorites={false} />
            </div>
          ))
        ) : (
          <p className="text-muted mt-4">No se encontraron ofertas.</p>
        )}
      </div>
    </div>
  );
}

export default Sales;

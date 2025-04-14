import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constants";
import GlobalSpinnerContext from "./GlobalSpinnerContext.jsx";
import { errorToast } from "../utils/toast.js";

const CategoryContext = createContext({
  category: [],
  refreshCategory: () => {},
});

export const CategoryProvider = ({ children }) => {
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    showSpinner();
    try {
      const { data } = await axios.get(ENDPOINT.category);
      setCategory(data);
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ category, refreshCategory: fetchCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;

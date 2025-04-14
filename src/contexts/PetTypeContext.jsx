import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constants";
import GlobalSpinnerContext from "./GlobalSpinnerContext.jsx";
import { errorToast } from "../utils/toast.js";

const PetTypeContext = createContext({
  petType: [],
  refreshPetType: () => {},
});

export const PetTypeProvider = ({ children }) => {
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const [petType, setPetType] = useState([]);

  const fetchPetType = async () => {
    showSpinner();
    try {
      const { data } = await axios.get(ENDPOINT.petType);
      setPetType(data);
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    fetchPetType();
  }, []);

  return (
    <PetTypeContext.Provider value={{ petType, refreshPetType: fetchPetType }}>
      {children}
    </PetTypeContext.Provider>
  );
};

export default PetTypeContext;

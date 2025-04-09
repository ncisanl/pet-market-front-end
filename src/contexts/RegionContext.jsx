import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constants";
import GlobalSpinnerContext from "./GlobalSpinnerContext.jsx";
import { errorToast } from "../utils/toast.js";

const RegionContext = createContext({
  regions: [],
  refreshRegions: () => {},
});

export const RegionProvider = ({ children }) => {
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const [regions, setRegions] = useState([]);

  const fetchRegions = async () => {
    showSpinner();
    try {
      const { data } = await axios.get(ENDPOINT.regions);
      setRegions(data);
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <RegionContext.Provider value={{ regions, refreshRegions: fetchRegions }}>
      {children}
    </RegionContext.Provider>
  );
};

export default RegionContext;

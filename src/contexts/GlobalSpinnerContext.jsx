import { createContext, useState } from "react";

const GlobalSpinnerContext = createContext({
  isLoading: false,
  showSpinner: () => {},
  hideSpinner: () => {},
});

export const GlobalSpinnerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => setIsLoading(true);
  const hideSpinner = () => setIsLoading(false);

  return (
    <GlobalSpinnerContext.Provider
      value={{ isLoading, showSpinner, hideSpinner }}
    >
      {children}
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContext;

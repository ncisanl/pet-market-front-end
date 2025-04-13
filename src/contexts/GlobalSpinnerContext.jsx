import { createContext, useCallback, useState } from "react";

const GlobalSpinnerContext = createContext({
  isLoading: false,
  showSpinner: () => {},
  hideSpinner: () => {},
});

export const GlobalSpinnerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = useCallback(() => {
    setIsLoading(true);
  }, []);
  const hideSpinner = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <GlobalSpinnerContext.Provider
      value={{ isLoading, showSpinner, hideSpinner }}
    >
      {children}
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContext;

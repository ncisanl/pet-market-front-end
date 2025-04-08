import { useContext } from "react";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext";

const GlobalSpinner = () => {
  const { isLoading } = useContext(GlobalSpinnerContext);

  if (!isLoading) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      ></div>
    </div>
  );
};

export default GlobalSpinner;

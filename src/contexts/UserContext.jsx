import { createContext, useState } from "react";

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  clearUserData: () => {},
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const clearUserData = () => setUserData(null);

  return (
    <UserContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

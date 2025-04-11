import { createContext, useState } from "react";

const ProfileContext = createContext({
  profileData: null,
  setProfileData: () => {},
  clearProfileData: () => {},
});

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  const clearProfileData = () => setProfileData(null);

  return (
    <ProfileContext.Provider
      value={{ profileData, setProfileData, clearProfileData }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;

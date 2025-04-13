import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/profile.css";
import profileImg from "../assets/img/img_profile.jpg";
import ProfileContext from "../contexts/ProfileContext.jsx";
import GlobalSpinnerContext from "../contexts/GlobalSpinnerContext.jsx";
import axios from "axios";
import { ENDPOINT } from "../config/constants.js";
import { errorToast, successToast } from "../utils/toast.js";
import ProfileInfoSection from "../components/ProfileInfoSection";
import ProfileShippingSection from "../components/ProfileShippingSection";

const Profile = () => {
  const navigate = useNavigate();
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { showSpinner, hideSpinner } = useContext(GlobalSpinnerContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!profileData) {
      const token = window.sessionStorage.getItem("token");
      showSpinner();

      axios
        .get(ENDPOINT.profile, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setProfileData(data);
          setFormData(data);
        })
        .catch(({ response: { data } }) => {
          errorToast(data.message);
          navigate("/");
        })
        .finally(() => hideSpinner());
    } else {
      setFormData(profileData);
    }
  }, [profileData, setProfileData, navigate, showSpinner, hideSpinner]);

  const handleUpdateInfo = async (updateInfo) => {
    const token = window.sessionStorage.getItem("token");
    showSpinner();
    try {
      const { data } = await axios.post(ENDPOINT.profileUpdate, updateInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(data.data);
      successToast(data.message);
    } catch ({ response: { data } }) {
      errorToast(data.message);
    } finally {
      hideSpinner();
    }
  };

  if (!profileData) return <div>Loading profile...</div>;

  return (
    <div className="container-profile">
      <div className="user-profile">
        <div className="profile-header">
          <div className="profile-foto">
            <div className="foto-container">
              <img src={profileImg} alt="Foto de perfil" />
            </div>
            <input
              type="file"
              id="inputFoto"
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
          <div className="profile-info">
            <h2 className="h2-profile">
              {profileData.name} {profileData.firstSurname}{" "}
              {profileData.secondSurname}
            </h2>
            <p className="p-profile">{profileData.email}</p>
          </div>
        </div>

        <div className="profile-detalles">
          <ProfileInfoSection data={formData} onSave={handleUpdateInfo} />
          <ProfileShippingSection data={formData} onSave={handleUpdateInfo} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

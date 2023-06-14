import { useState } from "react";
import { useLocation } from "react-router-dom";
import AuthStyles from "./Auth.module.css";

const Auth = () => {
  const [showModal, setShowModal] = useState(true);
  const location = useLocation();

  const handleAuth = async () => {
    const scope = "user-read-private user-read-email streaming";
    const client_id = "997a23f18c14403e99efca70ae7550dc";
    const redirect_uri = "http://localhost:5173/api/search/callback";
    const queryString = `response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}`;
    const authorisationUrl = `https://accounts.spotify.com/authorize?${queryString}`;

    window.location.href = authorisationUrl;
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
     <>
    <div className={AuthStyles.container}>
      <button className={AuthStyles.containerButton} onClick={openModal}>
        Authenticate
      </button>
      </div>
      {showModal && (
        <div className={AuthStyles.modalContainer}>
          <div className={AuthStyles.modalContent}>
          <button className={AuthStyles.modalButtonBack} onClick={closeModal}>
                X
              </button>
            <h2>Authenticate</h2>
              <button className={AuthStyles.modalButton} onClick={handleAuth}>
                Continue
              </button>
            </div>
          </div>
      )}
    </>
  );
};

export default Auth;

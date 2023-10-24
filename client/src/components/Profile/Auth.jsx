import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import AuthStyles from "./Auth.module.css";

const Auth = () => {
  const { user, updateUser } = useAuth();
  const location = useLocation();

  //check to see if the authentication is stored for the logged in user if yes store it otherwise user needs to authorise.
  const storedIsLinked = localStorage.getItem("isLinked");
  const [isLinked, setIsLinked] = useState(
    storedIsLinked !== null ? JSON.parse(storedIsLinked) : false
  );

  //  changes status to localStorage whenever the user playlist is altered.
  useEffect(() => {
    localStorage.setItem("isLinked", JSON.stringify(isLinked));
  }, [isLinked]);

  // authorises users spotify - directs them to spotify login and initiates a callback.
  const handleAuth = async () => {
    const scope = "user-read-private user-read-email streaming";
    const client_id = "997a23f18c14403e99efca70ae7550dc";
    const redirect_uri = "http://localhost:5173/api/search/callback";
    const queryString = `response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}`;
    const authorisationUrl = `https://accounts.spotify.com/authorize?${queryString}`;
    window.location.href = authorisationUrl;
    updateUser({ isLinked: true });
    setIsLinked(true);
  };

  return (
    <div className={AuthStyles.container}>
      {isLinked ? (
        <p className={AuthStyles.linkAccount}>
          {user.email} is now linked to spotify.
        </p>
      ) : (
        <button
          className={AuthStyles.containerButton}
          onClick={() => {
            handleAuth();
          }}
        >
          Link Spotify Account
        </button>
      )}
    </div>
  );
};

export default Auth;

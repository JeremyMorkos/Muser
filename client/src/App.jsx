import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useLocation,
} from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./components/PrivateRoutes";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./components/LandingPage";
import { useAuth } from "./contexts/AuthProvider";
import Logout from "./components/Logout";
import NavStyles from "./components/Nav.module.css";



function App() {
  const { user } = useAuth();
  const location = useLocation();
  
//1. when user clicks call api/search/authorise
//  2. redirect user to spotifies location from response from step 1 - authorise?
// 3. control goes to spotify, redirect to call back url
// 4. user should be logged into spotify

  const HandleAuth = async () => {
    const scope = "user-read-private user-read-email streaming";
    const client_id = "997a23f18c14403e99efca70ae7550dc";
    const redirect_uri = "http://localhost:5173/api/search/callback";
    const queryString = `response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    const authorizationUrl = `https://accounts.spotify.com/authorize?${queryString}`;
  
    window.location.href = authorizationUrl;
  }


  return (
    <div className="app">
      <nav className={NavStyles.navbar}>
        <div className={NavStyles.navbarContainer}>
          {user && (
            <div className={NavStyles.userSection}>
              <p className={NavStyles.username}>Welcome {user.displayName}</p>
              <Logout />
            </div>
          )}
          <ul className={NavStyles.navbarLinks}>
            {user && (
              <>
                {location.pathname === "/" ? (
                  <li>
                    <NavLink to="/profile" className={NavStyles.navLink}>
                      Profile 🎧
                    </NavLink>
                    <button onClick={() => HandleAuth()}>Authorize with Spotify</button>
                  </li>
                ) : null}
                {location.pathname === "/profile" ? (
                  <li>
                    <NavLink to="/" className={NavStyles.navLink} end>
                      Home
                    </NavLink>
                  </li>
                ) : null}
              </>
            )}
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes redirectTo="/landing" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

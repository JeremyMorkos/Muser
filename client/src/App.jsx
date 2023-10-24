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
import LandingPage from "./pages/LandingPage";
import { useAuth } from "./contexts/AuthProvider";
import Logout from "./components/Logout/Logout";
import NavStyles from "./components/Nav/Nav.module.css";
import FriendsPage from "./pages/FriendsPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faUsers,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayListPage from "./pages/PlayListPage";
import Logo from "./components/Logo/Logo";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <div className="app">
        <Navbar collapseOnSelect expand="sm" className={NavStyles.navbar}>
          {user && (
            <div className={`container ${NavStyles.navbarContainer}`}>
              <Navbar.Brand className={`navbar-brand ${NavStyles.userSection}`}>
                <Logo />
                <p className={NavStyles.username}>{user.displayName}</p>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={`me-auto ${NavStyles.navbarContainer}`}>
                  <Nav.Link as={Link} to="/" className={NavStyles.navLink}>
                    <FontAwesomeIcon
                      icon={faHouse}
                      size="lg"
                      style={{ color: "#000000" }}
                    />{" "}
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    className={NavStyles.navLink}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      size="lg"
                      style={{ color: "#000000" }}
                    />{" "}
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/friends"
                    className={NavStyles.navLink}
                  >
                    <FontAwesomeIcon
                      icon={faUsers}
                      size="lg"
                      style={{ color: "#000000" }}
                    />{" "}
                    Friends
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/playlist"
                    className={NavStyles.navLink}
                  >
                    <FontAwesomeIcon
                      icon={faHeadphones}
                      size="lg"
                      style={{ color: "#000000" }}
                    />{" "}
                    Playlist
                  </Nav.Link>
                  <Logout />
                </Nav>
              </Navbar.Collapse>
            </div>
          )}
        </Navbar>

        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes redirectTo="/landing" />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/playlist" element={<PlayListPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

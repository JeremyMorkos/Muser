import { useAuth } from "../../contexts/AuthProvider";
import NavStyles from "../Nav/Nav.module.css";

const Logout = () => {
  const { logout } = useAuth();

  // Remove the "isLinked" item from local storage
  const handleLogout = () => {
    localStorage.removeItem("isLinked");
    logout();
  };

  return (
    <button className={NavStyles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;

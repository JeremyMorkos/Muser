import { useAuth } from "../contexts/AuthProvider";
import NavStyles from './Nav.module.css'

const Logout = () => {
  const { logout } = useAuth();

  return (
    <button className={NavStyles.logoutButton} onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;

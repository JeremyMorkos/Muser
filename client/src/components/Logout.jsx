import { useAuth } from "../contexts/AuthProvider";

const Logout = () => {
  const { logout } = useAuth();

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Logout 
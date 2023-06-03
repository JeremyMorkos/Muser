import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoutes = (props) => {
  const { isLoadingUser, user } = useAuth();

  if (isLoadingUser) return <p>Loading ...</p>

  return user ? <Outlet/> : <Navigate to={props.redirectTo} replace />;
};

export default PrivateRoutes;
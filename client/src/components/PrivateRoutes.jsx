import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";


// when user logs in, redirect them to private routes
const PrivateRoutes = (props) => {
  const { isLoadingUser, user } = useAuth();

  if (isLoadingUser) return <p>Loading ...</p>
  return user ? <Outlet/> : <Navigate to={props.redirectTo} replace />;
};

export default PrivateRoutes;
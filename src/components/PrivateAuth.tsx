import { Navigate, Outlet } from 'react-router-dom';

const useAuth = (): boolean => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

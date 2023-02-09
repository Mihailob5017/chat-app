import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  console.log('PrivateRoutes triggered');
  const isUserLoggedIn = useSelector(
    (state: any): any => state.state.isLoggedIn
  );
  console.log(isUserLoggedIn);
  return isUserLoggedIn === true ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;

import { useEffect } from 'react';
import ToggleColorMode from './components/ToggleColorMode';
import Views from './components/Views';
import { useDispatch } from 'react-redux';
import { fetchCredentials } from './helpers/helpers';
import { actions } from './redux/slices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state: any) => state.state.isLoggedIn);
  const fetchSessionUID = async (): Promise<void> => {
    const response = await fetchCredentials();
    if (response.userLoggedIn === true) {
      dispatch(actions.setCredentials(response));
    }
  };

  useEffect(() => {
    fetchSessionUID();
  }, []);
  useEffect(() => {
    if (isUserLoggedIn === true) {
      navigate('/home');
    }
  }, [isUserLoggedIn]);
  return (
    <>
      <Views />
      <ToggleColorMode />
    </>
  );
}

export default App;

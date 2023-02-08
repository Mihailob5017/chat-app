import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import PrivateRoutes from './PrivateAuth';
type Props = {};

const Views = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;

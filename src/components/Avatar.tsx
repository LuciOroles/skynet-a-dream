import React from 'react';
import { useLogin } from '../context';
import Login from './Login';

const Avatar = () => {
  const { state } = useLogin();
  const userID = state.logged ? state?.userID : null;

  return (
    <div className="header-right">
      {userID}
      <Login />
    </div>
  );
};

export default Avatar;

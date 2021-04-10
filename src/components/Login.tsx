import React from 'react';
import { useLogin } from '../context';
const Login = () => {
  const { state } = useLogin();
  const message = state.logged ? 'Log out' : 'Log in';
  return <button type="button"> {message} with Skynet</button>;
};

export default Login;

import React, { useEffect } from 'react';

import useSkyStatus from '../context/useSkyStatus';
import { useLogin } from '../context';

const Login = () => {
  const { state } = useLogin();
  const { instance } = useSkyStatus();
  const { dispatch } = useLogin();

  const handleClick = async () => {
    if (!instance) return;

    if (!state.logged) {
      const status = await instance.requestLoginAccess();

      if (status) {
        const userID = await instance.userID();

        dispatch({
          type: 'login',
          payload: {
            userID,
          },
        });
      }
    } else {
      await instance.logout();
      dispatch({ type: 'logout' });
    }
  };

  useEffect(() => {
    if (instance && !state.logged) {
      (async () => {
        const logged = await instance.checkLogin();
        if (logged) {
          const userID = await instance.userID();
          if (userID) {
            dispatch({
              type: 'login',
              payload: {
                userID,
              },
            });
          }
        }
      })();
    }
  }, [dispatch, instance, state.logged]);

  const message = state.logged ? 'Log out from' : 'Login to';
  return (
    <button type="button" onClick={handleClick}>
      {message} Skynet
    </button>
  );
};

export default Login;

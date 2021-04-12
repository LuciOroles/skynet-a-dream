import React, { useEffect } from 'react';

import useSkyStatus from '../context/useSkyStatus';
import { useLogin } from '../context';

const Login = () => {
  const { state } = useLogin();
  const { mySky } = useSkyStatus();
  const { dispatch } = useLogin();

  const handleClick = async () => {
    if (!mySky) return;

    if (!state.logged) {
      const status = await mySky.requestLoginAccess();

      if (status) {
        const userID = await mySky.userID();

        dispatch({
          type: 'login',
          payload: {
            userID,
          },
        });
      }
    } else {
      await mySky.logout();
      dispatch({ type: 'logout' });
    }
  };

  useEffect(() => {
    if (mySky && !state.logged) {
      (async () => {
        const logged = await mySky.checkLogin();
        if (logged) {
          const userID = await mySky.userID();
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
  }, [dispatch, mySky, state.logged]);

  const message = state.logged ? 'Log out from' : 'Login to';
  return (
    <button type="button" onClick={handleClick}>
      {message} Skynet
    </button>
  );
};

export default Login;

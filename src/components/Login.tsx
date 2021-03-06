import React, { useEffect } from 'react';

import useSkyStatus from '../context/useSkyStatus';
import { useAppContext } from '../context';
import { Button } from 'semantic-ui-react';

const Login = () => {
  const { state, dispatch } = useAppContext();
  const { mySky } = useSkyStatus();

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
    <Button secondary onClick={handleClick}>
      {message} Skynet
    </Button>
  );
};

export default Login;

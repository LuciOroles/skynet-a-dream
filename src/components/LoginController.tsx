import React, { ChangeEvent, useState } from 'react';
import { useLogin } from '../context';

const LoginController = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const { dispatch } = useLogin();
  return (
    <div>
      <label htmlFor="ctrl-login">
        <input
          type="checkbox"
          id="ctrl-login"
          checked={logged}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => {
            setLogged(ev.target.checked);

            dispatch({
              type: ev.target.checked ? 'login' : 'logout',
            });
          }}
        />
      </label>
    </div>
  );
};

export default LoginController;

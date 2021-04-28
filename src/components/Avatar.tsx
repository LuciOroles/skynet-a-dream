import React from 'react';
import { useLogin } from '../context';
import Login from './Login';
import { Card } from 'semantic-ui-react';

const Avatar = () => {
  const { state } = useLogin();
  const userID = state.logged ? state?.userID : null;

  return (
    <Card>
      <Card.Content>
        <div className="header-right">
          <div className="userId">{userID}</div>
          <Login />
        </div>
      </Card.Content>
    </Card>
  );
};

export default Avatar;

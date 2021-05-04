import React from 'react';
import { useAppContext } from '../context';
import Login from './Login';
import { Card } from 'semantic-ui-react';
import copyImg from '../img/files-copy-interface-symbol.svg';

const Avatar = () => {
  const { state } = useAppContext();
  const userID = state.logged ? state?.userID : null;
  const handleCopy = () => {
    if (state?.userID) {
      navigator.clipboard.writeText(state?.userID).then(
        function () {
          console.log('copied');
        },
        function () {
          console.log('failed to copy');
        }
      );
    }
  };
  return (
    <Card>
      <Card.Content>
        <div className="header-right">
          <div className="user-public-id">
            <div className="copy-clipboard" onClick={handleCopy}>
              <img
                src={copyImg}
                alt="copy to clipboard"
                title="Copy id to clipboard!"
              />
            </div>
            <div className="userId">{userID}</div>
          </div>

          <Login />
        </div>
      </Card.Content>
    </Card>
  );
};

export default Avatar;

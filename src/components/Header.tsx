import React from 'react';
import Avatar from '../components/Avatar';
import { Header } from 'semantic-ui-react';

const AppHeader = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Header as="h1" id="title">
          Skynet map builder
        </Header>
      </div>

      <Avatar />
    </header>
  );
};

export default AppHeader;

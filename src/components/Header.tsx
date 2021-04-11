import React from 'react';
import Avatar from '../components/Avatar';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">Skynet map builder</div>

      <Avatar />
    </header>
  );
};

export default Header;

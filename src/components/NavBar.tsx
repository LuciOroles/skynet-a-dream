import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function NavBar(): ReactElement {
  return (
    <nav>
      <ul className="listMenu">
        <li>
          <Link to="/">Main </Link>
        </li>
        <li>
          <Link to="/dev">Debuger area</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
    </nav>
  );
}

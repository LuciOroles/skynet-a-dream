import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(): ReactElement {
  return (
    <nav>
      <ul className="listMenu">
        <li>
          <Link to="/">Main </Link>
        </li>
        <li>
          <Link to="/graph">Graph</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
        <li>
          <Link to="/dev">Debuger area</Link>
        </li>
      </ul>
    </nav>
  );
}

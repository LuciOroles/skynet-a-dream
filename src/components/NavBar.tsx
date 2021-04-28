import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(): ReactElement {
  return (
    <nav>
      <ul className="listMenu">
        <li>
          <Link to="/">Init </Link>
        </li>
        <li>
          <Link to="/graph">Graph</Link>
        </li>
      </ul>
    </nav>
  );
}

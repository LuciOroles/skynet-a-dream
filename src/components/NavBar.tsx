import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

export default function NavBar(): ReactElement {
  return (
    <nav>
      <ul className="listMenu">
        <li>
          <Header as="h3">
            <Link to="/">Init </Link>
          </Header>
        </li>
        <li>
          <Header as="h3">
            <Link to="/graph">Graph</Link>
          </Header>
        </li>
      </ul>
    </nav>
  );
}

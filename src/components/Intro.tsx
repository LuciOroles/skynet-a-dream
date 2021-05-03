import React, { ReactElement } from 'react';
import { Header } from 'semantic-ui-react';

export default function Intro(): ReactElement {
  return (
    <div>
      <div className="introHeader">
        <Header as="h2">Welcome to Skynet Map Builder</Header>
      </div>
      <div>Please login in order to be able to access the app!</div>
    </div>
  );
}

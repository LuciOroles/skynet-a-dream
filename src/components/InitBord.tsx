import React, { ReactElement } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import InitGraph from './InitGraph';
import Connect from './Connect';

const panes = [
  { menuItem: 'Init Graph', render: () => <InitGraph /> },
  {
    menuItem: 'Connect to Graph',
    render: () => <Connect />,
  },
];

export default function InitBord(): ReactElement {
  return (
    <Container>
      <Tab panes={panes} />
    </Container>
  );
}

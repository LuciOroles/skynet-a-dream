import React, { ReactElement } from 'react';
import {
  Container,
  Form,
  Grid,
  Button,
  Tab,
  Dimmer,
  Loader,
  Segment,
} from 'semantic-ui-react';

interface Props {}
const MyTab2 = () => <div>Test X</div>;
const panes = [
  { menuItem: 'Init Graph', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  {
    menuItem: 'Connect to Graph',
    render: () => (
      <Tab.Pane>
        <MyTab2 />
      </Tab.Pane>
    ),
  },
];

export default function InitBord({}: Props): ReactElement {
  return (
    <Container>
      <Tab panes={panes} />
    </Container>
  );
}

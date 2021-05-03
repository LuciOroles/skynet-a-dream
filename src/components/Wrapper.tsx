import React, { ReactElement } from 'react';
import Intro from './Intro';

import { Container, Grid } from 'semantic-ui-react';
import { useAppContext } from '../context/index';
import { GraphProvider } from '../context/GraphContext';

interface Props {
  col1: ReactElement;
  col2: ReactElement;
}

export default function Wrapper({ col1, col2 }: Props): ReactElement {
  const { state } = useAppContext();
  const { logged } = state;
  if (!state) {
    return <div>Unable to init the app!</div>;
  }

  if (!logged) {
    return (
      <Container>
        <Intro />
      </Container>
    );
  }

  return (
    <GraphProvider>
      <Container>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={6}>{col1}</Grid.Column>
            <Grid.Column width={10}>{col2}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </GraphProvider>
  );
}

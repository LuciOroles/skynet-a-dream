import React, { ReactComponentElement, ReactElement } from 'react';

import { Container, Grid } from 'semantic-ui-react';

interface Props {
  col1: ReactElement;
  col2?: ReactElement;
}

export default function Wrapper({ col1, col2 }: Props): ReactElement {
  return (
    <Container>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>{col1}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>{col2}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Container, Form, Grid, Button } from 'semantic-ui-react';

export default function Main(): ReactElement {
  const [userId, setUserId] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');

  const handleInputChange = (fn: Function) => {
    return (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement;
      fn(target.value);
    };
  };

  const handleUserChange = handleInputChange(setUserId);
  const handleGameIdChange = handleInputChange(setGameId);
  const validInput = userId && gameId;

  return (
    <Container>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Partner public ID:</label>
                <input
                  value={userId}
                  placeholder="public id"
                  onChange={handleUserChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Game name</label>
                <input
                  value={gameId}
                  placeholder="Game name"
                  onChange={handleGameIdChange}
                />
              </Form.Field>
              <Button type="button" disabled={!validInput} primary>
                Deploy
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

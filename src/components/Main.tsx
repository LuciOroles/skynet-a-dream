import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react';
import { Container, Form, Grid, Button, Select } from 'semantic-ui-react';

const Options = [
  { key: 'b', value: 'builder', text: 'Bulider' },
  { key: 'c', value: 'connect', text: 'Connector' },
];

export default function Main(): ReactElement {
  const [userId, setUserId] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleInputChange = (fn: Function) => {
    return (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement;
      fn(target.value);
    };
  };

  const handleUserChange = handleInputChange(setUserId);
  const handleGameIdChange = handleInputChange(setGameId);
  const validInput = userId && gameId && role;

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
              <Form.Field>
                <label>Select your role:</label>
                <Select
                  placeholder="role"
                  options={Options}
                  value={role}
                  onChange={(e: SyntheticEvent) => {
                    const t = e.target as HTMLSelectElement;
                    setRole(t.value);
                  }}
                />
              </Form.Field>
              <Button type="button" disabled={!validInput} primary>
                Start game
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

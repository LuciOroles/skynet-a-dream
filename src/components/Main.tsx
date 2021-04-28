import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react';
import { Container, Form, Grid, Button, Select } from 'semantic-ui-react';
import useCreateGame from '../context/useCreateGame';

export type Roles = 'build' | 'connect';

export default function Main(): ReactElement {
  const [userId, setUserId] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [role, setRole] = useState<Roles | string>('');
  const createGame = useCreateGame();

  const handleInputChange = (fn: Function) => {
    return (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement;
      fn(target.value);
    };
  };
  const Options = [
    { key: 'b', value: 'build', text: 'Bulider' },
    { key: 'c', value: 'connect', text: 'Connector' },
  ];

  const handleUserChange = handleInputChange(setUserId);
  const handleGameIdChange = handleInputChange(setGameId);
  const validInput = userId && gameId && role;
  console.log(userId, gameId, role);
  const handleStartGame = async () => {
    if (userId && gameId && ['build', 'connect'].indexOf(role) > -1) {
      const r = await createGame({
        userId,
        gameId,
        role: role as Roles,
      });
      console.log(r);
    }
  };

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
                <select
                  value={role}
                  onChange={(e: SyntheticEvent) => {
                    const t = e.target as HTMLSelectElement;
                    debugger;
                    setRole(t.value);
                  }}
                >
                  {Options.map((o) => {
                    return (
                      <option value={o.value} key={o.key}>
                        {o.text}
                      </option>
                    );
                  })}
                </select>
              </Form.Field>
              <Button
                type="button"
                disabled={!validInput}
                primary
                onClick={handleStartGame}
              >
                Start game
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

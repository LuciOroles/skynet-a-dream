import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react';
import {
  Container,
  Form,
  Button,
  Dimmer,
  Loader,
  Segment,
} from 'semantic-ui-react';
import useCreateGame from '../context/useCreateGame';
import { Roles } from '../context/useGraphData';

export default function InitGraph(): ReactElement {
  const [userId, setUserId] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [role, setRole] = useState<Roles | string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const validInput = userId && gameId && role;

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

  const handleGraphInit = async () => {
    setLoading(true);
    try {
      if (userId && gameId && ['build', 'connect'].indexOf(role) > -1) {
        const r = await createGame({
          userId,
          gameId,
          role: role as Roles,
          dots: [],
          edges: [],
        });
        console.log(r);
        debugger;
      }
    } catch (error) {
      console.error('Unable to create game!');
      setError(error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Dimmer.Dimmable as={Segment} dimmed={loading}>
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
            <label>Graph name</label>
            <input
              value={gameId}
              placeholder="Graph name"
              onChange={handleGameIdChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Select your role:</label>
            <select
              value={role}
              onChange={(e: SyntheticEvent) => {
                const t = e.target as HTMLSelectElement;
                setRole(t.value);
              }}
            >
              <option value="">Pick one</option>
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
            onClick={handleGraphInit}
          >
            Init new graph
          </Button>
        </Form>

        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Dimmer active={Boolean(error)}>
          <h2>Unable to connect!</h2>
        </Dimmer>
      </Dimmer.Dimmable>
    </Container>
  );
}

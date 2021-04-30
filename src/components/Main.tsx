import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react';
import { Container, Form, Grid, Button } from 'semantic-ui-react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import useCreateGame from '../context/useCreateGame';
import useGraphData, { Dot, Edge } from '../context/useGraphData';
import GraphContainer from './GraphContainer';

export type Roles = 'build' | 'connect';

export default function Main(): ReactElement {
  const [userId, setUserId] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [role, setRole] = useState<Roles | string>('');
  const [userRole, setUserRole] = useState<Roles | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [authorId, setAuthorId] = useState<string>('');

  const validInput = userId && gameId && role;
  const validGraph = Boolean(userRole) && Boolean(authorId);

  const createGame = useCreateGame();
  const getGraphData = useGraphData();

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

  const handleStartGame = async () => {
    setLoading(true);
    try {
      if (userId && gameId && ['build', 'connect'].indexOf(role) > -1) {
        const r = await createGame({
          userId,
          gameId,
          role: role as Roles,
        });
        console.log(r);
      }
    } catch (error) {
      console.error('Unable to create game!');
      alert('Unable to create game!');
    }
    setLoading(false);
  };

  const handleGetData = async () => {
    setLoading(true);
    const result = await getGraphData(`${gameId}.json`);
    if (result.error === null) {
      setDots(result.dots);
      setEdges(result.edges);
      setUserRole(result.role);
      setAuthorId(result.userId);
      debugger;
    } else {
      setError(result);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
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
                  onClick={handleStartGame}
                >
                  Start game
                </Button>

                <Button
                  type="button"
                  disabled={!gameId}
                  primary
                  onClick={handleGetData}
                >
                  Connect to game
                </Button>
              </Form>

              <Dimmer active={loading}>
                <Loader />
              </Dimmer>
              <Dimmer active={Boolean(error)}>
                <h2>Unable to connect!</h2>
              </Dimmer>
            </Dimmer.Dimmable>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {validGraph && (
            <GraphContainer edges={edges} dots={dots} role={role} />
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react';
import {
  Container,
  Form,
  Grid,
  Button,
  Dimmer,
  Loader,
  Segment,
} from 'semantic-ui-react';
import useCreateGame from '../context/useCreateGame';
import useGraphData, {
  Dot,
  Edge,
  UnparsedData,
  Roles,
  ParsedData,
} from '../context/useGraphData';
import GraphGenerator from './GraphGenerator';
import Intro from './Intro';
import useSkyStatus from '../context/useSkyStatus';
import { useAppContext } from '../context/index';
import InitBord from './InitBord';

export default function Main(): ReactElement {
  const [userId, setUserId] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [role, setRole] = useState<Roles | string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [authorId, setAuthorId] = useState<string>('');

  const [userRole, setUserRole] = useState<Roles | ''>('');
  const { client } = useSkyStatus();
  const { state } = useAppContext();
  const { logged } = state;

  const validInput = userId && gameId && role;
  const validGraph =
    Boolean(userRole) &&
    Boolean(authorId) &&
    ['build', 'connect'].indexOf(userRole) > -1;

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
          dots,
          edges,
        });
        console.log(r);
      }
    } catch (error) {
      console.error('Unable to create game!');
      alert('Unable to create game!');
    }
    setLoading(false);
  };
  const getForSecondUser = async (
    authorId: string,
    gameId: string,
    role: string
  ) => {
    try {
      const { data } = await client.file.getJSON(
        authorId,
        `${state.domain}/${gameId}.json`
      );
      const parsedData: ParsedData = JSON.parse((data as UnparsedData).data);
      if (role === 'connect') {
        setDots(parsedData.dots);
      } else {
        setEdges(parsedData.edges);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleGetData = async () => {
    setLoading(true);
    const result = await getGraphData(`${gameId}.json`);
    if (result.error === null) {
      setDots(result.dots);
      setEdges(result.edges);
      setUserRole(result.role);
      setAuthorId(result.userId);
      getForSecondUser(result.userId, gameId, result.role);
    } else {
      setError(result);
    }
    setLoading(false);
  };

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
            onClick={handleStartGame}
          >
            Init new graph
          </Button>

          <Button
            type="button"
            disabled={!gameId}
            primary
            onClick={handleGetData}
          >
            Connect to Graph
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

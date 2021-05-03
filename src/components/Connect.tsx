import React, { ReactElement, useState, ChangeEvent } from 'react';
import {
  Container,
  Form,
  Button,
  Dimmer,
  Loader,
  Segment,
} from 'semantic-ui-react';
import useSkyStatus from '../context/useSkyStatus';
import useGraphData, {
  UnparsedData,
  ParsedData,
} from '../context/useGraphData';
import { useAppContext } from '../context/index';
import { useGraphContext } from '../context/GraphContext';

export default function Connect(): ReactElement {
  const { client } = useSkyStatus();
  const getGraphData = useGraphData();
  const { state } = useAppContext();
  const { dispatch } = useGraphContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  const handleInputChange = (fn: Function) => {
    return (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement;
      fn(target.value);
    };
  };
  const handleGameIdChange = handleInputChange(setGameId);

  const handleGetData = async () => {
    setLoading(true);
    const result = await getGraphData(`${gameId}.json`);
    if (result.error === null) {
      dispatch({ type: 'set-dots', payload: { dots: result.dots } });
      dispatch({ type: 'set-edges', payload: { edges: result.edges } });
      dispatch({ type: 'set-role', payload: result.role });
      dispatch({ type: 'set-author-id', payload: result.userId });
      dispatch({ type: 'set-game-id', payload: gameId });

      getForSecondUser(result.userId, gameId, result.role);
    } else {
      setError(result);
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
        dispatch({ type: 'set-dots', payload: { dots: parsedData.dots } });
      } else {
        dispatch({ type: 'set-edges', payload: { edges: parsedData.edges } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Dimmer.Dimmable as={Segment} dimmed={loading}>
        <Form>
          <Form.Field>
            <label>Graph name</label>
            <input
              value={gameId}
              placeholder="Graph name"
              onChange={handleGameIdChange}
            />
          </Form.Field>
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

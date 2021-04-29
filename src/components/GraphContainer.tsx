import React, { ReactElement, useState } from 'react';
import useGraphData from '../context/useGraphData';
import useDataServices from '../context/useDataServices';
import GraphGenerator from './GraphGenerator';
import { Button } from 'semantic-ui-react';

export default function GraphContainer(): ReactElement {
  const [connect, setConnect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setJson } = useDataServices('sky1a.json');
  const getDots = useGraphData();

  const handleGetData = async () => {
    setLoading(true);
    const { role, dots, edges, error } = await getDots('game1.json');
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleGetData}>Get Data</Button>
      <label>
        Connect Dots
        <input
          type="checkbox"
          defaultChecked={connect}
          onChange={() => setConnect(!connect)}
        />
      </label>
      {/* <GraphGenerator
        intialDots={dots}
        intialEdges={edges}
        connect={connect}
        setJson={setJson}
        loadingDots={loadingDots}
        error={error}
      /> */}
    </React.Fragment>
  );
}

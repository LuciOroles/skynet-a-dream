import React, { ReactElement, useState } from 'react';
import useDots from '../context/useGraphData';
import useDataServices from '../context/useDataServices';
import GraphGenerator from './GraphGenerator';

export default function GraphContainer(): ReactElement {
  const [connect, setConnect] = useState<boolean>(false);
  const { setJson } = useDataServices('sky1a.json');
  const { dots, edges, loading: loadingDots, error } = useDots('sky1a.json');

  return (
    <React.Fragment>
      <label>
        Connect
        <input
          type="checkbox"
          defaultChecked={connect}
          onChange={() => setConnect(!connect)}
        />
      </label>
      <GraphGenerator
        intialDots={dots}
        intialEdges={edges}
        connect={connect}
        setJson={setJson}
        loadingDots={loadingDots}
        error={error}
      />
    </React.Fragment>
  );
}

import React, { ReactElement, useState } from 'react';
import { Dot, Edge } from '../context/useGraphData';

import { Button } from 'semantic-ui-react';

type Props = {
  role: string;

  dots?: Dot[];
  edges?: Edge[];
};

export default function GraphContainer({
  role,
  dots,
  edges,
}: Props): ReactElement {
  const [connect, setConnect] = useState<boolean>(false);

  // const { setJson } = useDataServices('sky1a.json');

  return (
    <React.Fragment>
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

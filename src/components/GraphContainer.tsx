import React, { ReactElement, useState } from 'react';

import GraphGenerator from './GraphGenerator';

export default function GraphContainer(): ReactElement {
  const [connect, setConnect] = useState<boolean>(false);

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
      <GraphGenerator path="sky1a.json" connect={connect} />
    </React.Fragment>
  );
}

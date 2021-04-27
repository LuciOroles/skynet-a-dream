import React, { ReactElement } from 'react';

import GraphGenerator from './GraphGenerator';

export default function GraphContainer(): ReactElement {
  return (
    <React.Fragment>
      <GraphGenerator path="sky1a.json" />
    </React.Fragment>
  );
}

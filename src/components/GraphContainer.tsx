import React, { ReactElement } from 'react';

import GraphGenerator from './GraphGenerator';

export default function GraphContainer(): ReactElement {
  return (
    <div>
      <GraphGenerator path="sky1a.json" />
    </div>
  );
}

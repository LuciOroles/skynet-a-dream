import React, { ReactElement, useState } from 'react';
import { Dot, Edge } from '../context/useGraphData';
import GraphGenerator from './GraphGenerator';

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
  // const { setJson } = useDataServices('sky1a.json');

  return (
    <GraphGenerator
      intialDots={dots}
      intialEdges={edges}
      connect={role === 'connect'}
      setJson={() => {}}
    />
  );
}

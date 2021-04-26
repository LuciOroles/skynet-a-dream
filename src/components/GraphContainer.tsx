import React, { ReactElement } from 'react';
import EdgeConnector from './EdgeConnector';
import VertexCreator from './VertexCreator';

const useGraphType = () => {
  return Math.random() < 0.5 ? 'vertex' : 'edge';
};

export default function GraphContainer(): ReactElement {
  const graphType = useGraphType();

  if (graphType === 'edge') {
    return <EdgeConnector />;
  }
  if (graphType === 'vertex') {
    return <VertexCreator />;
  }
  return <div>No operation to show</div>;
}

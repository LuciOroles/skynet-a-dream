import React, { ReactElement } from 'react';
import { Draw } from '../context/useCanvas';
import GraphGenerator from './GraphGenerator';

export default function GraphContainer(): ReactElement {
  const draw: Draw = (ctx, frameCount) => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
      ctx.fill();
    }
  };

  return (
    <div>
      <GraphGenerator draw={draw} width={500} height={500} />
    </div>
  );
}

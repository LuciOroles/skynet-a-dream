import React, { MouseEventHandler, ReactElement } from 'react';
import useCanvas, { Draw } from '../context/useCanvas';

interface Props {
  draw: Draw;
  width: number;
  height: number;
}

export default function GraphGenerator({
  draw,
  width,
  height,
  ...rest
}: Props): ReactElement {
  const canvasRef = useCanvas(draw);
  const handlClick: MouseEventHandler<HTMLCanvasElement> = (e) => {
    console.log(e);
  };
  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handlClick}
      {...rest}
    />
  );
}

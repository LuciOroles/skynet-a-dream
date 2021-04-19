import React, {
  ReactElement,
  createRef,
  useEffect,
  useState,
  RefObject,
} from 'react';
import { SVG } from '@svgdotjs/svg.js';

export type Coords = {
  x: number;
  y: number;
};

type CircleConfig = {
  radius: number;
  color: string;
  startPos: Coords;
};

function createCircle(draw: any, circleConfig: CircleConfig) {
  const { startPos } = circleConfig;

  var circle = draw
    .circle(circleConfig.radius * 2)
    .attr({ fill: circleConfig.color });
  circle.move(startPos.x, startPos.y);

  return circle;
}

const useSVGContext = (canvasRef: RefObject<HTMLDivElement>) => {
  const [drawCtx, setDrawContext] = useState<any>(null);
  useEffect(() => {
    if (canvasRef.current && !drawCtx) {
      setDrawContext(SVG().addTo('#canvas').size(600, 600));
    }
  }, [canvasRef, drawCtx]);

  return drawCtx;
};

type Dot = {
  radius: number;
  color: string;
};

const useSvgDotsOnClick = (drawCtx: CanvasRenderingContext2D, dot: Dot) => {
  const [svg, setSvg] = useState<SVGElement>();
  useEffect(() => {
    const svgS = document.querySelector('#canvas>svg') as SVGElement;
    if (svgS && !svg) setSvg(svgS);
    if (svg) {
      svg.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as SVGElement;
        var rect = target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        createCircle(drawCtx, {
          ...dot,
          startPos: {
            x,
            y,
          },
        });
      });
    }
  }, [drawCtx, svg, dot]);
};

export default function GraphGenerator(): ReactElement {
  const canvasRef = createRef<HTMLDivElement>();
  const drawCtx = useSVGContext(canvasRef);
  useSvgDotsOnClick(drawCtx, { radius: 7, color: '#ae2aea' });

  return <div id="canvas" ref={canvasRef} />;
}

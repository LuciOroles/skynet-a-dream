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

type DotConfig = {
  radius: number;
  color: string;
};
interface AddDot {
  (d: Coords): void;
}

const useSvgDotsOnClick = (
  drawCtx: CanvasRenderingContext2D,
  dot: DotConfig,
  onAddDot: AddDot
) => {
  const [svg, setSvg] = useState<SVGElement>();
  const [listener, setListener] = useState<number>(0);

  useEffect(() => {
    const svgS = document.querySelector('#canvas>svg') as SVGElement;
    if (svgS && !svg) setSvg(svgS);
    if (svg && listener === 0) {
      setListener(listener + 1);
      svg.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as SVGElement;
        var rect = target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        const coords: Coords = {
          x,
          y,
        };
        createCircle(drawCtx, {
          ...dot,
          startPos: {
            ...coords,
          },
        });
        onAddDot(coords);
      });
    }
  }, [drawCtx, svg, dot, onAddDot, listener]);
};

export default function GraphGenerator(): ReactElement {
  const canvasRef = createRef<HTMLDivElement>();
  const drawCtx = useSVGContext(canvasRef);
  const [dotCollection, setDotCollection] = useState<Coords[]>([]);
  const handleAddCoords = (c: Coords) => {
    setDotCollection((d) => {
      return [...d, c];
    });
  };
  useSvgDotsOnClick(drawCtx, { radius: 7, color: '#542aea' }, handleAddCoords);

  return (
    <div>
      <div id="canvas" ref={canvasRef} />
      <span>{JSON.stringify(dotCollection)}</span>
    </div>
  );
}

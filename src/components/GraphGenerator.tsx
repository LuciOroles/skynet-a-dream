import React, { ReactElement, createRef, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Circle } from '@svgdotjs/svg.js';

import useDataServices from '../context/useDataServices';
import { createCircle } from '../context/useSvgDotsOnClick';
import useSVGContext from '../context/useSVGContext';
import useDots, { Dot, Edge } from '../context/useGraphData';

type Coords = {
  x: number;
  y: number;
};

interface Props {
  path: string;
  connect: boolean;
}

const drawConfig = {
  color: '#542aea',
  radius: 7,
};

export default function GraphGenerator({ path, connect }: Props): ReactElement {
  const canvasRef = createRef<HTMLDivElement>();
  const drawCtx = useSVGContext(canvasRef);
  const { dots, edges, loading: loadingDots, error } = useDots(path);
  const [dotCollection, setDotCollection] = useState<Dot[]>([]);
  const [activeDots, setActiveDots] = useState<Dot[]>([]);
  const [activeEdges, setActiveEdges] = useState<Edge[]>([]);
  const [initDots, setInitDots] = useState<boolean>(false);
  const [initEdges, setInitEdges] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [eraser, setEraser] = useState<boolean>(false);

  const [svg, setSvg] = useState<SVGElement>();
  const [listener, setListener] = useState<number>(0);

  const { setJson } = useDataServices(path);
  const dataLoading = loading || loadingDots;

  const removeDotById = (dotId: string) => {
    setDotCollection((d) => d.filter((dot) => dot.id !== dotId));
  };

  useEffect(() => {
    if (!initDots && Array.isArray(dots)) {
      if (dots.length) {
        setInitDots(true);
        setDotCollection(dots);
      }
    }
    if (!initEdges && Array.isArray(edges)) {
      if (edges.length) {
        setInitEdges(true);
        setActiveEdges(edges);
      }
    }
  }, [initEdges, edges, dots, setInitDots, initDots]);

  useEffect(() => {
    const handleDotClick = (e: MouseEvent) => {
      e.stopPropagation();
      const id = (e.target as Circle).id;
      if (typeof id === 'string') {
        if (connect) {
          const selDot = dotCollection.find((dot) => dot.id === id);
          if (selDot) {
            if (!activeDots.find((d) => d.id === id)) {
              setActiveDots((d) => [...d, selDot]);
            } // prevent re-selecting the same node;
          }
        } else if (eraser) {
          removeDotById(id);
        }
      }
    };

    const drawEdgeTuple = (drawCtx: any, segement: Dot[]) => {
      const [d1, d2] = segement;
      const r = drawConfig.radius;
      const line = drawCtx.line(d1.x + r, d1.y + r, d2.x + r, d2.y + r);
      line.stroke({ color: drawConfig.color, width: 3, linecap: 'round' });
      line.click((event: MouseEvent) => {
        event.stopImmediatePropagation();
        if (eraser) {
          setActiveEdges((edges) => {
            return edges.filter((edge) => {
              const [de1, de2] = edge;
              const found =
                (de1 === d1 || de2 === d1) && (de1 === d2 || de2 === d2);
              return !found;
            });
          });
        }
      });
    };

    if (dotCollection.length || activeEdges.length) {
      drawCtx.clear();
      activeEdges.forEach((eTuple) => {
        drawEdgeTuple(drawCtx, eTuple);
      });
      dotCollection.forEach((dot) => {
        createCircle(
          drawCtx,
          {
            ...drawConfig,
            startPos: { ...dot },
            id: dot.id,
          },
          handleDotClick
        );
      });
    }
  }, [activeDots, connect, dotCollection, dots, drawCtx, activeEdges, eraser]);

  useEffect(() => {
    if (activeDots.length === 2) {
      const [d1, d2] = activeDots;
      setActiveEdges((e) => [...e, [d1, d2]]);
      setActiveDots([]);
    }
  }, [drawCtx, activeDots]);

  useEffect(() => {
    const handleAddingDots = (c: Coords) => {
      const newDot = {
        ...c,
        id: nanoid(),
      };
      setDotCollection((d) => {
        return [...d, newDot];
      });
    };

    const svgS = document.querySelector('#canvas>svg') as SVGElement;
    if (svgS && !svg) setSvg(svgS);
    if (svg && listener === 0) {
      setListener(listener + 1);
      svg.addEventListener('click', (e: MouseEvent) => {
        if (connect) return;
        const target = e.target as SVGElement;
        var rect = target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        const coords: Coords = {
          x,
          y,
        };

        handleAddingDots(coords);
      });
    }
  }, [connect, listener, setDotCollection, svg]);

  const handleSendGraphData = async () => {
    setLoading(true);
    try {
      const coords = {
        dots: dotCollection,
        edges: activeEdges,
      };
      await setJson(coords);
      setLoading(false);
    } catch (error) {
      console.error(`unable to set the graph dots coors  ${error}`);
      setLoading(false);
    }
  };

  if (error) {
    return <div>Unable to get data!</div>;
  }

  return (
    <div>
      {dataLoading && <div>Loading...</div>}
      {
        <div
          id="canvas"
          ref={canvasRef}
          style={{ display: dataLoading ? 'none' : 'block' }}
        />
      }
      <div className="button-group">
        <button
          type="button"
          onClick={handleSendGraphData}
          className="spaced-button"
          disabled={loading}
        >
          Send dots
        </button>

        <label>
          Eraser
          <input
            type="checkbox"
            defaultChecked={eraser}
            onChange={() => setEraser(!eraser)}
          />
        </label>
      </div>
    </div>
  );
}

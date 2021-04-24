import React, { ReactElement, createRef, useState, useEffect } from 'react';

import useDataServices from '../context/useDataServices';
import useSvgDotsOnClick, { createCircle } from '../context/useSvgDotsOnClick';
import useSVGContext from '../context/useSVGContext';
import useGetDots, { Dot } from '../context/useGetDots';
import { nanoid } from 'nanoid';
import { Circle } from '@svgdotjs/svg.js';

type Coords = {
  x: number;
  y: number;
};

interface Props {
  path: string;
  dots?: Dot[];
}

const drawConfig = {
  color: '#542aea',
  radius: 7,
};

type Edge = [Dot, Dot];

const drawEdgeTuple = (drawCtx: any, segement: Dot[]) => {
  const [d1, d2] = segement;
  const r = drawConfig.radius;
  const line = drawCtx.line(d1.x + r, d1.y + r, d2.x + r, d2.y + r);
  line.stroke({ color: drawConfig.color, width: 3, linecap: 'round' });
  line.click((event: MouseEvent) => {
    event.stopImmediatePropagation();
  });
};

export default function GraphGenerator({ path }: Props): ReactElement {
  const canvasRef = createRef<HTMLDivElement>();
  const drawCtx = useSVGContext(canvasRef);
  const { dots, loading: loadingDots } = useGetDots(path);
  const [dotCollection, setDotCollection] = useState<Dot[]>(dots);
  const [activeDots, setActiveDots] = useState<Dot[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [eraser, setEraser] = useState<boolean>(false);
  const [connect, setConnect] = useState<boolean>(false);

  const { setJson } = useDataServices(path);
  const dataLoading = loading || loadingDots;

  const removeDotById = (dotId: string) => {
    setDotCollection((d) => d.filter((dot) => dot.id !== dotId));
  };

  useEffect(() => {
    if (dots.length) {
      setDotCollection(dots);
    }
  }, [dots]);

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

    if (dotCollection.length || edges.length) {
      drawCtx.clear();
      edges.forEach((eTuple) => {
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
  }, [activeDots, connect, dotCollection, drawCtx, edges, eraser]);

  useEffect(() => {
    if (activeDots.length === 2) {
      const [d1, d2] = activeDots;
      setEdges((e) => [...e, [d1, d2]]);
      setActiveDots([]);
    }
  }, [drawCtx, activeDots]);

  const handleAddCoords = (c: Coords) => {
    const newDot = {
      ...c,
      id: nanoid(),
    };
    setDotCollection((d) => {
      return [...d, newDot];
    });
  };

  useSvgDotsOnClick(drawCtx, drawConfig, handleAddCoords);

  const handleSendData = async () => {
    setLoading(true);
    try {
      const coords = {
        dots: dotCollection,
      };
      await setJson(JSON.stringify(coords));
      setLoading(false);
    } catch (error) {
      console.error(`unable to set the graph dots coors  ${error}`);
      setLoading(false);
    }
  };

  const tempRender = (dot: Dot, i: number) => {
    return <span key={i}>{JSON.stringify(dot)}</span>;
  };

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
          onClick={handleSendData}
          className="spaced-button"
          disabled={loading}
        >
          Send data
        </button>
        <label>
          Eraser
          <input
            type="checkbox"
            defaultChecked={eraser}
            onChange={() => setEraser(!eraser)}
          />
        </label>
        <label>
          Connect
          <input
            type="checkbox"
            defaultChecked={connect}
            onChange={() => setConnect(!connect)}
          />
        </label>
      </div>
      <code>
        <h4>Dot collection:</h4>
        {dotCollection.map(tempRender)}

        <h4>Active dots</h4>
        {activeDots.map(tempRender)}
      </code>
    </div>
  );
}

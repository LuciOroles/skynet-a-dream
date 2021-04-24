import React, { ReactElement, createRef, useState, useEffect } from 'react';

import useDataServices from '../context/useDataServices';
import useSvgDotsOnClick, { createCircle } from '../context/useSvgDotsOnClick';
import useSVGContext from '../context/useSVGContext';
import useGetDots, { Dot } from '../context/useGetDots';
import { nanoid } from 'nanoid';

type Coords = {
  x: number;
  y: number;
};

interface Props {
  path: string;
  dots?: Dot[];
}

export default function GraphGenerator({ path }: Props): ReactElement {
  const canvasRef = createRef<HTMLDivElement>();
  const drawCtx = useSVGContext(canvasRef);
  const dots = useGetDots(path);
  const [dotCollection, setDotCollection] = useState<Dot[]>(dots);
  const [loading, setLoading] = useState<boolean>(false);
  const { setJson } = useDataServices(path);

  useEffect(() => {
    if (dots.length) {
      setDotCollection(dots);
    }
  }, [dots]);

  useEffect(() => {
    if (dotCollection.length) {
      drawCtx.clear();
      dotCollection.forEach((dot) => {
        createCircle(drawCtx, {
          radius: 7,
          color: '#542aea',
          startPos: { ...dot },
          id: dot.id,
        });
      });
    }
  }, [dotCollection, drawCtx]);

  const handleAddCoords = (c: Coords) => {
    const newDot = {
      ...c,
      id: nanoid(),
    };
    setDotCollection((d) => {
      return [...d, newDot];
    });
  };

  useSvgDotsOnClick(drawCtx, { radius: 7, color: '#542aea' }, handleAddCoords);

  const handleSendData = async () => {
    setLoading(true);
    try {
      const coords = {
        dots: dotCollection,
      };
      await setJson(JSON.stringify(coords));
    } catch (error) {
      console.error(`unable to set the graph dots coors  ${error}`);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && <div id="canvas" ref={canvasRef} />}
      <div className="button-group">
        <button
          type="button"
          onClick={handleSendData}
          className="spaced-button"
          disabled={loading}
        >
          Send data
        </button>
      </div>
      <code>
        <h4>Dot collection:</h4>
        {dotCollection.map((dot, i) => {
          return <span key={i}>{JSON.stringify(dot)}</span>;
        })}
      </code>
    </div>
  );
}

import React, {
  ReactElement,
  createRef,
  useEffect,
  useState,
  RefObject,
} from 'react';
import { SVG } from '@svgdotjs/svg.js';
import useDataServices from '../context/useDataServices';
import useSvgDotsOnClick, { createCircle } from '../context/useSvgDotsOnClick';

type Coords = {
  x: number;
  y: number;
};

const useSVGContext = (canvasRef: RefObject<HTMLDivElement>) => {
  const [drawCtx, setDrawContext] = useState<any>(null);
  useEffect(() => {
    if (canvasRef.current && !drawCtx) {
      setDrawContext(SVG().addTo('#canvas').size(600, 600));
    }
  }, [canvasRef, drawCtx]);

  return drawCtx;
};

interface Props {
  path: string;
}

export default function GraphGenerator({ path }: Props): ReactElement {
  const canvasRef = createRef<HTMLDivElement>();
  const drawCtx = useSVGContext(canvasRef);
  const [dotCollection, setDotCollection] = useState<Coords[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { setJson, getJson } = useDataServices(path);
  const handleAddCoords = (c: Coords) => {
    setDotCollection((d) => {
      return [...d, c];
    });
  };

  useSvgDotsOnClick(drawCtx, { radius: 7, color: '#542aea' }, handleAddCoords);

  const handleSendData = async () => {
    setLoading(true);
    try {
      const coords = {
        dots: dotCollection,
      };
      const result = await setJson(JSON.stringify(coords));

      console.log(result);
    } catch (error) {
      console.error(`unable to set the graph dots coors  ${error}`);
    }
    setLoading(false);
  };

  const handleGetData = async () => {
    try {
      const { data } = await getJson(path);
      debugger;
      const d = JSON.parse(data.data);
      const d1 = JSON.parse(d);
      if (d1.dots) {
        setDotCollection(d1.dots);
      }
    } catch (error) {
      console.error(`unable to get the dots: ${error}`);
    }
  };
  const handleDrawDots = () => {
    if (dotCollection.length) {
      drawDots();
    } else {
      alert('No data dots');
    }
  };
  const drawDots = () => {
    dotCollection.map((dot) => {
      createCircle(drawCtx, {
        radius: 7,
        color: '#542aea',
        startPos: { ...dot },
      });
    });
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

        <button type="button" className="spaced-button" onClick={handleGetData}>
          Get Dots
        </button>
        <button
          type="button"
          className="spaced-button"
          onClick={handleDrawDots}
        >
          Draw Dots
        </button>
      </div>
      <div>
        <h4>Dot collection:</h4>
        {dotCollection.map((dot, i) => {
          return <span key={i}>{JSON.stringify(dot)}</span>;
        })}
      </div>
    </div>
  );
}

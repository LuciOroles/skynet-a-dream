import React, { ReactElement, createRef, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Circle } from '@svgdotjs/svg.js';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import { createCircle } from '../context/useSvgDotsOnClick';
import useSVGContext from '../context/useSVGContext';
import useCreateGame from '../context/useCreateGame';
import { Dot, Edge, Roles } from '../context/useGraphData';
import { Button } from 'semantic-ui-react';

type Coords = {
  x: number;
  y: number;
};

interface Props {
  role: Roles;
  intialDots?: Dot[];
  intialEdges?: Edge[];
  userId: string;
  gameId: string;
}

const drawConfig = {
  color: '#542aea',
  radius: 7,
};

export default function GraphGenerator({
  role,
  intialDots,
  intialEdges,
  userId,
  gameId,
}: Props): ReactElement {
  const canvasRef = createRef<HTMLDivElement>();
  const drawCtx = useSVGContext(canvasRef);
  const updateGame = useCreateGame();

  const [dotCollection, setDotCollection] = useState<Dot[]>(intialDots || []);
  const [activeDots, setActiveDots] = useState<Dot[]>([]);
  const [activeEdges, setActiveEdges] = useState<Edge[]>(intialEdges || []);

  const [loading, setLoading] = useState<boolean>(false);
  const [eraser, setEraser] = useState<boolean>(false);

  const [svg, setSvg] = useState<SVGElement>();
  const [listener, setListener] = useState<number>(0);
  const connect = role === 'connect';

  useEffect(() => {
    if (intialDots) {
      setDotCollection(intialDots);
    }
    if (intialEdges) {
      setActiveEdges(intialEdges);
    }
    return () => {
      setDotCollection([]);
      setActiveEdges([]);
    };
  }, [intialDots, intialEdges]);

  const removeDotById = (dotId: string) => {
    setDotCollection((d) => d.filter((dot) => dot.id !== dotId));
  };

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

    if ((dotCollection.length || activeEdges.length) && drawCtx) {
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
  }, [activeDots, connect, dotCollection, drawCtx, activeEdges, eraser]);

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
      const newData = {
        userId,
        role: (connect ? 'connect' : 'build') as Roles,
        dots: dotCollection,
        edges: activeEdges,
        gameId,
      };
      await updateGame(newData);
      setLoading(false);
    } catch (error) {
      console.error(`unable to set the graph dots coors  ${error}`);
      setLoading(false);
    }
  };

  return (
    <Dimmer.Dimmable as={Segment} dimmed={loading}>
      <React.Fragment>
        {
          <div
            id="canvas"
            ref={canvasRef}
            style={{ display: loading ? 'none' : 'block' }}
          />
        }
        <div className="button-group">
          <Button
            type="button"
            onClick={handleSendGraphData}
            primary
            disabled={loading}
          >
            Update Graph
          </Button>

          <label>
            Eraser
            <input
              type="checkbox"
              defaultChecked={eraser}
              onChange={() => setEraser(!eraser)}
            />
          </label>
        </div>
      </React.Fragment>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
}

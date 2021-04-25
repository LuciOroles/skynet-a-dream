import { useEffect, useState } from 'react';

type Coords = {
    x: number;
    y: number;
};

type DotConfig = {
    radius: number;
    color: string;
};

interface AddDot {
    (d: Coords): void;
};

type CircleConfig = {
    radius: number;
    color: string;
    startPos: Coords;
    id: string;
};

interface clickHandlerFn {
    (e: MouseEvent): void
}

export function createCircle(drawCtx: any, circleConfig: CircleConfig, clickHandler: clickHandlerFn) {
    const { startPos } = circleConfig;

    var circle = drawCtx
        .circle(circleConfig.radius * 2)
        .attr({ fill: circleConfig.color, id: circleConfig.id });

    circle.move(startPos.x, startPos.y);
    circle.click(clickHandler);

    return circle;
}

const useSvgDotsOnClick = (
    drawCtx: CanvasRenderingContext2D,
    dot: DotConfig,
    onAddDot: AddDot,

) => {
    const [svg, setSvg] = useState<SVGElement | null>();
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

                onAddDot(coords);
            });
        }

        return () => {
            setSvg(null);
            setListener(0);
        }
    }, [drawCtx, svg, dot, onAddDot, listener,]);
};

export default useSvgDotsOnClick;
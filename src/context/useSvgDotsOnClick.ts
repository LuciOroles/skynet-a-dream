

type Coords = {
    x: number;
    y: number;
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

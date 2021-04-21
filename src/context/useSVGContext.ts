
import { useState, useEffect, RefObject } from 'react';
import { SVG } from '@svgdotjs/svg.js';

const useSVGContext = (canvasRef: RefObject<HTMLDivElement>) => {
    const [drawCtx, setDrawContext] = useState<any>(null);
    useEffect(() => {
        if (canvasRef.current && !drawCtx) {
            setDrawContext(SVG().addTo('#canvas').size(600, 600));
        }
    }, [canvasRef, drawCtx]);

    return drawCtx;
};


export default useSVGContext;
import { useRef, useEffect } from 'react';

export interface Draw {
    (context: CanvasRenderingContext2D | null, frameCount: number): void
}

const useCanvas = (draw: Draw) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        let frameCount = 0;
        let animationFrameId: number = 0;

        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        }

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw]);

    return canvasRef;
}

export default useCanvas;
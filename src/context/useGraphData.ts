import { useState, useEffect } from 'react';
import useSkyStatus from './useSkyStatus';
import { useAppContext } from './index';


type UnparsedData = {
    data: string;
};
export type Dot = {
    x: number;
    y: number;
    id: string;
}
export type Edge = [Dot, Dot];

const useDots = (path: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [dots, setDots] = useState<Dot[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const { state } = useAppContext();
    const { domain } = state;

    const { mySky } = useSkyStatus();

    useEffect(() => {
        const getDots = async () => {
            setLoading(true);
            try {
                const { data } = await mySky.getJSON(`${domain}/${path}`);
                const parsedData = JSON.parse((data as UnparsedData).data);
                debugger;

                if (parsedData?.dots) {
                    setDots(parsedData.dots);
                }
                if (parsedData?.edges) {
                    setEdges(parsedData.edges);
                }
            } catch (error) {
                console.error(`Unable to get the json data ${error}`);
                setError(error);
            }
            setLoading(false);
        };
        if (mySky) {
            getDots();
        }
        return () => { };
    }, [domain, path, mySky]);

    return {
        dots,
        edges,
        loading,
        error,
    };
};


export default useDots;
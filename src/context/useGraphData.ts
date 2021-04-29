import { useState } from 'react';
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

export type ParsedData = {
    role: string,
    userId: string,
    dots?: Dot[],
    edges?: Edge[],
}
type Roles = 'build' | 'connect';

const useGraphData = () => {

    const [error, setError] = useState<Error | null>(null);
    const [dots, setDots] = useState<Dot[]>([]);
    const [role, setRole] = useState<Roles | string>('');

    const [edges, setEdges] = useState<Edge[]>([]);
    const { state } = useAppContext();
    const { domain } = state;

    const { mySky } = useSkyStatus();

    return async (path: string) => {
        try {
            const { data } = await mySky.getJSON(`${domain}/${path}`);
            const parsedData: ParsedData = JSON.parse((data as UnparsedData).data);
            debugger;

            if (parsedData?.dots) {
                setDots(parsedData.dots);
            }
            if (parsedData?.edges) {
                setEdges(parsedData.edges);
            }
            setRole(parsedData.role);
        } catch (error) {
            console.error(`Unable to get the json data ${error}`);
            setError(error);
        }
        return {
            dots,
            edges,
            role,
            error,
        };

    }


};


export default useGraphData;
import useSkyStatus from './useSkyStatus';
import { useAppContext } from './index';


export type UnparsedData = {
    data: string;
};
export type Dot = {
    x: number;
    y: number;
    id: string;
}
export type Edge = [Dot, Dot];
export type Roles = 'build' | 'connect';
export type ParsedData = {
    role: Roles,
    userId: string,
    dots: Dot[],
    edges: Edge[],
}


const useGraphData = () => {


    const { state } = useAppContext();
    const { domain } = state;

    const { mySky } = useSkyStatus();

    return async (path: string) => {
        try {
            const { data } = await mySky.getJSON(`${domain}/${path}`);
            const parsedData: ParsedData = JSON.parse((data as UnparsedData).data);


            return {
                dots: parsedData.dots as Dot[],
                edges: parsedData.edges as Edge[],
                role: parsedData.role,
                userId: parsedData.userId,
                error: null
            };

        } catch (error) {
            console.error(`Unable to get the json data ${error}`);
            return error;

        }

    }


};


export default useGraphData;
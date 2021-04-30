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
type Roles = 'build' | 'connect';
export type ParsedData = {
    role: Roles,
    userId: string,
    dots?: Dot[],
    edges?: Edge[],
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
                edges: parsedData?.edges as Edge[],
                role: parsedData.role,
                error: null
            };

        } catch (error) {
            console.error(`Unable to get the json data ${error}`);
            return {
                dots: null,
                edges: null,
                role: null,
                error,
            }
        }

    }


};


export default useGraphData;
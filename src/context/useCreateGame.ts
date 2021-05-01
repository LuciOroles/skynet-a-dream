
import { useState } from 'react';
import useSkyStatus from './useSkyStatus';
import { Roles, Dot, Edge } from './useGraphData';

type GameSetup = {
    userId: string,
    gameId: string,
    role: Roles,
    dots: Dot[],
    edges: Edge[],
}


const useCreateGame = () => {
    const domain = window.location.hostname === 'localhost' ? 'localhost' : 'gdleibaoji.hns';
    const { mySky } = useSkyStatus();
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);

    return async (gs: GameSetup) => {
        setLoading(true);
        debugger;
        try {
            const { data } = await mySky.setJSON(`${domain}/${gs.gameId}.json`, {
                data: JSON.stringify(gs),
            });

            setResponse(data);

        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);

        return {
            response,
            loading
        }
    }


}

export default useCreateGame;
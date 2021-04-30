
import { useState } from 'react';
import useSkyStatus from './useSkyStatus';
import { Roles } from '../components/Main';

type GameSetup = {
    userId: string,
    gameId: string,
    role: Roles,
}


const useCreateGame = () => {
    const domain = window.location.hostname === 'localhost' ? 'localhost' : 'gdleibaoji.hns';
    const { mySky } = useSkyStatus();

    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);



    return async (gs: GameSetup) => {



        setLoading(true);
        try {
            const { data } = await mySky.setJSON(`${domain}/${gs.gameId}.json`, {
                data: JSON.stringify({
                    userId: gs.userId,
                    role: gs.role,
                    dots: [],
                    edges: []

                }),
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
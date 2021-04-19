import { useState, useEffect, useCallback } from 'react';
import useSkyStatus from './useSkyStatus';

const useSkylinkUrl = (skylink: string) => {
    const { client } = useSkyStatus();
    const [skylinkUrl, setSkylinkUrl] = useState<string | null>(null);
    const getLink = useCallback(
        async () => {
            try {
                const skyUrl = await client.getSkylinkUrl(skylink);
                setSkylinkUrl(skyUrl);
            }
            catch (error) {
                return error;
            }
        },
        [client, skylink],
    );

    useEffect(() => {
        if (skylink) {
            getLink();
        }
    }, [getLink, skylink]);

    return skylinkUrl;

}

export default useSkylinkUrl;
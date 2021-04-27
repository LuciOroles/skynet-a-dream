import { useState, useEffect } from 'react';
import useSkyStatus from './useSkyStatus';


type UnparsedData = {
    data: string;
};
export type Dot = {
    x: number;
    y: number;
    id: string;
}

const useDots = (path: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [dots, setDots] = useState<Dot[]>([]);
    const domain =
        window.location.hostname === 'localhost' ? 'localhost' : 'gdleibaoji.hns';

    const { mySky } = useSkyStatus();

    useEffect(() => {
        const getDots = async () => {
            setLoading(true);
            try {
                const { data } = await mySky.getJSON(`${domain}/${path}`);
                const parsedData = JSON.parse((data as UnparsedData).data);
                if (parsedData?.dots) {
                    setDots(parsedData.dots);
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
        loading,
        error,
    };
};


export default useDots;
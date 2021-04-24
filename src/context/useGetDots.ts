
import { useEffect, useState } from 'react';
import useDataServices from './useDataServices';

export type Dot = {
    x: number;
    y: number;
    id: string;
}

const useGetDots = (path: string) => {
    const { getJson } = useDataServices(path);
    const [dots, setDots] = useState<Dot[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const { data } = await getJson(path);
                const d = data ? JSON.parse(data.data) : null;
                if (d) {
                    const d1 = JSON.parse(d);
                    if (d1.dots) {
                        setDots(d1.dots);
                    }
                }
            } catch (error) {
                setDots([]);
                console.error(`unable to get the dots: ${error}`);
            }
            setLoading(false);
        };
        if (dots.length === 0) {

            getData();
        }
    }, [dots.length, getJson, path]);

    return {
        dots,
        loading
    };
};

export default useGetDots;
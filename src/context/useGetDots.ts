
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


    useEffect(() => {
        const getData = async () => {
            try {
                console.log(' run get data');
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
        };
        if (dots.length === 0) {

            getData();
        }
    }, [dots.length, getJson, path]);

    return dots;
};

export default useGetDots;
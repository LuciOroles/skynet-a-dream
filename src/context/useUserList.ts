import { useState, useEffect } from 'react'


export interface SiaUser {
    id: string;
}

export type SiaUsers = {
    siaUsers: SiaUser[];
}

const useUserList = (endpoint: string) => {

    const [userList, setUserList] = useState<SiaUsers | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const req = new Request(endpoint, {
            method: 'GET',
            mode: 'cors',

        });
        setLoading(true);

        fetch(req).then((data) => data.json()).then((data) => {
            setUserList(data);

        }).catch((error) => {
            setError(error);

        }).finally(() => setLoading(false))


    }, [endpoint])


    return {
        data: userList,
        error,
        loading,
    }


}


export default useUserList;
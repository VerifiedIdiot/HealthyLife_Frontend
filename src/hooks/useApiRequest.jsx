import { useState, useEffect } from 'react';

export const useApiRequestParams = (apiFunc, params) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiFunc(params);
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiFunc, params]);

    return { data, loading, error };
};



export const useApiRequest = (apiFunc) => {
    const [reponse, setResponse] = useState(null);
    const [responseLoading, setResponsLoading] = useState(true);
    const [responsError, setResponseError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiFunc();
                setResponse(result);
            } catch (error) {
                setResponseError(error);
            } finally {
                setResponsLoading(false);
            }
        };

        fetchData();
    }, [apiFunc]);

    return { reponse, responseLoading, responsError };
};



import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { toast } from "react-toastify";

interface FetchResult<T> {
//     loading: boolean;
    error: string | null;
}

export const appFetch = (endpoint: string | URL | Request, init?: RequestInit | undefined): Promise<Response>  => {
    return fetch(endpoint, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
        method: "GET",
        ...init,
    });
};

export function useFetch<T>(endpoint: string, setter: Dispatch<SetStateAction<T>>, runAfterTrue: boolean[] = []): FetchResult<T> {
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (runAfterTrue.includes(false)) return;
        (async () => {
            // setLoading(true);
            setError(null);
            
            try {
                const res = await appFetch(endpoint);
                const response = await res.json();

                if (!res.ok) throw new Error(response.message || "Error fetching data");
                //@ts-ignore
                setter(response.data as T | null);
            } catch (err: any) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                // setLoading(false);
            }
        })();

    }, [...runAfterTrue]);

    return { error };
}


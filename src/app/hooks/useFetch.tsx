import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { toast } from "react-toastify";
import { ExpressResponse_Migration } from "../lib/definitions";

interface FetchResult<T> {
    //     loading: boolean;
    error: string | null;
}

export const appFetch = async (endpoint: string | URL | Request, init?: RequestInit | undefined) => {
    const res = await fetch(endpoint, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
        method: "GET",
        ...init,
    });
    //@ts-ignore
    const response = (await res.json()) as ExpressResponse_Migration<T>;
    console.log(response)
    return response;
};

export function useFetchForGet<T>(endpoint: string, setter: Dispatch<SetStateAction<T>>, runAfterTrue: boolean[] = []): FetchResult<T> {
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (runAfterTrue.includes(false)) return;
        (async () => {
            // setLoading(true);
            setError(null);

            try {
                const response = await appFetch(endpoint);

                if (!response.success) throw new Error(response.message || "Error fetching data");
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

import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { toast } from "react-toastify";

const BASE_URL = "https://tp-dsw-back.onrender.com/";

interface FetchResult<T> {
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(endpoint: string, setter: Dispatch<SetStateAction<T>>, runAfterTrue: boolean[] = []): FetchResult<T> {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (runAfterTrue.includes(false)) return;
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(endpoint, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    cache: "no-store",
                });

                const response = await res.json();

                if (!res.ok) throw new Error(response.message || "Error fetching data");
                //@ts-ignore
                setter(response.data as T | null);
            } catch (err: any) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [...runAfterTrue]);

    return { loading, error };
}

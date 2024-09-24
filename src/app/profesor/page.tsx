"use client";

import { Input } from "@/components/ui/input";
import GridProfesor from "./components/gridProfesor";
import { Profesor } from "../lib/definitions";
import { useEffect, useState } from "react";

export default function Page() {
    const [data, setData] = useState<Profesor[]>([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://tp-dsw-back.onrender.com/api/profesor/conBorrado", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
    }, []);

    if (!data) return <p>No profile data</p>;

    const profesores = data ?? [];

    const filtrados = profesores.filter((p) => {
        return (p.nombre + p.apellido).toLowerCase().startsWith(filter.replace(/\s+/g, "").toLowerCase());
    });

    return (
        <>
            <header className="flex justify-between items-center py-4 px-6 bg-background">
                <h1 className="text-4xl font-normal text-gray-700">Profesores</h1>
                <div className="relative w-64">
                    <Input
                        type="text"
                        placeholder="Buscar Profesor"
                        name="input filtrado"
                        className="pl-10 pr-4 py-2 w-full bg-gray-100 border-none rounded-md"
                        onChange={(event) => setFilter(event.target.value)}
                    />
                </div>
            </header>
            <GridProfesor profesores={filtrados} />
        </>
    );
}

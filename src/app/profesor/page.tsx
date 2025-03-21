"use client";

import { Input } from "@/components/ui/input";
import GridProfesor from "../components/gridProfesor";
import { Profesor } from "../lib/definitions";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LinkBack from "../components/LinkBack";
import { appFetch } from "../hooks/useFetch";

export default function Page() {
    const [data, setData] = useState<Profesor[]>([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        appFetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor`).then((data) => {
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
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
                        <Spinner as="span" animation="grow" variant="dark" role="status" aria-hidden="true" />
                    </motion.div>
                )}

                {!isLoading && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto p-6 max-w-4xl">
                        <LinkBack route="/"></LinkBack>
                        <header className="flex justify-between items-center py-4 bg-background">
                            <h1 className="text-4xl font-semibold text-gray-800 ">Profesores</h1>
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
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
}

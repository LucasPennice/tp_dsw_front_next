"use client";

import { Input } from "@/components/ui/input";
import { Profesor } from "../../../lib/definitions";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GridProfMateria from "@/app/components/GridProfMateria";
import { useParams } from "next/navigation";
import LinkBack from "@/app/components/LinkBack";
import { useFetch } from "@/app/hooks/useFetch";

export default function Page() {
    const [data, setData] = useState<Profesor[] | null>(null);
    const [filter, setFilter] = useState("");
    const [isLoading, setLoading] = useState(true);

    const params = useParams();
    const idAno = params.idAno as string;
    const idMateria = params.idMateria as string;

    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/porMateriaYAno/${idAno}/${idMateria}`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data.data);
    //             setLoading(false);
    //         });
    // }, []);

    useFetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/porMateriaYAno/${idAno}/${idMateria}`, setData);

    useEffect(() => {
        if (data) setLoading(false);
    }
    , [data]);
    

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

                {!isLoading && data!.length != 0 && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto p-6 max-w-4xl">
                        <LinkBack route={`/ano/${idAno}/`} />
                        <header className="flex justify-between items-center py-4 bg-background">
                            <h1 className="text-4xl font-normal text-gray-800">Profesores</h1>
                        </header>
                        <GridProfMateria profesores={filtrados} idAnio={idAno} idMateria={idMateria} />
                    </motion.section>
                )}
                {!isLoading && data!.length == 0 && (
                    <motion.div className="max-w-4xl text-center mx-auto p-6">
                        <p className="text-xl font-semibold text-gray-800 mb-1 mt-5">No Existen Materias Cargadas</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

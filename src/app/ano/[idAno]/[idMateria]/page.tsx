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
import { URI } from "@/app/lib/utils";

export default function Page() {
    const [data, setData] = useState<Profesor[]>([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setLoading] = useState(true);

    const params = useParams();
    const idAno = params.idAno as string;
    const idMateria = params.idMateria as string;

    useEffect(() => {
        fetch(`${URI}/api/profesor/porMateriaYAno/${idAno}/${idMateria}`, {
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

    const profesores = data ?? [];

    if (!data)
        return (
            <div className="mx-auto p-6 max-w-4xl">
                <p className=" text-xl text-center">No profile data</p>
            </div>
        );

    const filtrados = profesores.filter((p) => {
        return (p.nombre + p.apellido).toLowerCase().startsWith(filter.replace(/\s+/g, "").toLowerCase());
    });

    if (!data) return <p>No profile data</p>;

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
                        <Link
                            href={`/ano/${idAno}`}
                            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Volver Atrás
                        </Link>
                        <header className="flex justify-between items-center py-4 bg-background">
                            <h1 className="text-4xl font-normal text-gray-800">Profesores</h1>
                        </header>
                        <GridProfMateria profesores={filtrados} idAnio={idAno} idMateria={idMateria} />
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
}

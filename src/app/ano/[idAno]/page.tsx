"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Materia } from "@/app/lib/definitions";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import { URI } from "@/app/lib/utils";

const BookIcon = () => (
    <svg
        className="w-12 h-12 mb-2 text-gray-600 opacity-50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
    </svg>
);

export default function SubjectsLayout() {
    const [data, setData] = useState<Materia[]>([]);
    const [isLoading, setLoading] = useState(true);

    const params = useParams();
    const idAno = params.idAno as string;

    useEffect(() => {
        fetch(`${URI}/api/materia/porAno/${idAno[0]}`, {
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

    const materia = data ?? [];

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
                    <motion.div className="max-w-4xl mx-auto p-6">
                        <nav className="flex items-center justify-between mb-6">
                            <Link href="/ano" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Volver Atrás
                            </Link>
                            <span className="text-gray-600">{idAno} Año</span>
                        </nav>

                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Materias de {idAno} Año</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {materia.map((subject, index) => (
                                <Link
                                    href={`/ano/${idAno}/${subject.id}`}
                                    key={index}
                                    className={`bg-green-100 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                                    <BookIcon />
                                    <h2 className="text-xl font-semibold text-gray-800 mb-1">{subject.nombre}</h2>
                                    <p className="text-sm text-gray-600">{subject.area.nombre}</p>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

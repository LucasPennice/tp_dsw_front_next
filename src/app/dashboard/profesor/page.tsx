"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ProfesorCard from "../../components/ProfesorCard";
import { Profesor } from "../../lib/definitions";
import { URI } from "@/app/lib/utils";
import { ArrowLeft, Plus } from "lucide-react";

export default function Page() {
    const [data, setData] = useState<Profesor[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${URI}/api/profesor/conBorrado`, {
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

    const deleteProfesor = async (_id: string) => {
        setLoading(true);

        await fetch(`${URI}/api/profesor/${_id}`, {
            method: "Delete",
        });

        toast.success("Profesor borrado exitosamente", {
            autoClose: 6000,
        });

        fetch(`${URI}/api/profesor/conBorrado`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mb-14 space-y-6">
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            width: "100vw",
                            maxWidth: "56rem",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}>
                        <Spinner as="span" animation="grow" variant="dark" role="status" aria-hidden="true" />
                    </motion.div>
                )}

                {!isLoading && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex flex-row justify-between">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Volver Atrás
                            </Link>
                            <div className="button-container">
                                <Link
                                    href={`/dashboard/profesor/add`}
                                    className="btn bg-blue-500 text-slate-50 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-102 hover:text-stale-800 hover:shadow-sm hover:border-slate-200">
                                    <Plus />
                                    Nuevo Profesor
                                </Link>
                            </div>
                        </div>

                        <Table className="table mt-4" borderless hover>
                            <thead>
                                <tr>
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Fecha Nac</th>
                                    {/* <th scope="col">DNI</th> */}
                                    {/* <th scope="col">Puntuacion General</th> */}
                                    {/* <th scope="col">Sexo</th> */}
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {profesores.map((profesor, idx) => (
                                    <ProfesorCard profesor={profesor} key={profesor.id} idx={idx} deleteProfesor={deleteProfesor} />
                                ))}
                            </tbody>
                        </Table>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

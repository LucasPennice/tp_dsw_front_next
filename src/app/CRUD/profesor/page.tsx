"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ProfesorCard from "../../components/ProfesorCard";
import { Profesor } from "../../lib/definitions";
import { URI } from "@/app/lib/utils";

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
        await fetch(`${URI}/api/profesor/${_id}`, {
            method: "Delete",
        });

        toast.success("Profesor borrado exitosamente");

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
        <div className="max-w-12xl mx-auto p-6 mb-14 space-y-6">
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
                        <Link href="/CRUD" className="btn btn-primary p-b">
                            Volver
                        </Link>

                        <Table className="table" borderless hover>
                            <thead>
                                <tr>
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Fecha Nac</th>
                                    <th scope="col">DNI</th>
                                    <th scope="col">Puntuacion General</th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {profesores.map((profesor, idx) => (
                                    <ProfesorCard profesor={profesor} key={profesor.id} idx={idx} deleteProfesor={deleteProfesor} />
                                ))}
                            </tbody>
                        </Table>
                        <div className="button-container">
                            <Link href={`/CRUD/profesor/add`} className="btn btn-primary">
                                Add
                            </Link>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

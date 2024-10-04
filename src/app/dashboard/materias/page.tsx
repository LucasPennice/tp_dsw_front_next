"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Materia } from "../../lib/definitions";
import { URI } from "@/app/lib/utils";

export default function Page() {
    const [data, setData] = useState<Materia[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${URI}/api/materia/conBorrado`, {
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

    if (!data) return <p>No hay materias</p>;

    const materias = data ?? [];

    const deleteMateria = async (_id: string) => {
        await fetch(`${URI}/api/materia/${_id}`, {
            method: "Delete",
        });

        toast.success("Materia borrada exitosamente");

        fetch(`${URI}/api/materia/conBorrado`, {
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
                        <Link href="/dashboard" className="btn btn-primary p-b">
                            Volver
                        </Link>

                        <Table className="table mt-4" borderless hover>
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Area</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {materias.map((materia, idx) => (
                                    <MateriaCard materia={materia} key={materia.id} idx={idx} deleteMateria={deleteMateria} />
                                ))}
                            </tbody>
                        </Table>
                        <div className="button-container">
                            <Link href={`materias/add`} className="btn btn-primary">
                                Add
                            </Link>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

function MateriaCard({ materia, deleteMateria, idx }: { materia: Materia; deleteMateria: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td style={{ color: materia.borradoLogico ? "red" : "black" }}>{materia.id}</td>
            <td style={{ color: materia.borradoLogico ? "red" : "black" }}>{materia.nombre}</td>
            <td style={{ color: materia.borradoLogico ? "red" : "black" }}>{materia.area.nombre}</td>
            <td>
                <Link
                    href={{
                        pathname: `/dashboard/materias/edit/${materia.id}`,
                        query: {
                            id: materia.id,
                            nombre: materia.nombre,
                        },
                    }}
                    className="btn btn-outline-dark cus-mr-10">
                    Edit
                </Link>
                {
                    <motion.div
                        animate={{ width: isLoading ? 50 : 85 }}
                        className={`btn cus-mr-10 transition-all ${materia.borradoLogico == false ? "btn-outline-danger" : "bg-gray-200 text-gray-300"} `}
                        onClick={async () => {
                            if (materia.borradoLogico == true) return;
                            if (isLoading) return;

                            setLoading(true);
                            await deleteMateria(materia.id);
                        }}>
                        {isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Spinner animation="border" size="sm" />
                            </motion.div>
                        )}
                        {!isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Delete
                            </motion.div>
                        )}
                    </motion.div>
                }
            </td>
        </motion.tr>
    );
}

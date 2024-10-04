"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Cursado } from "../../lib/definitions";
import { URI } from "@/app/lib/utils";

export default function Page() {
    const [data, setData] = useState<Cursado[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${URI}/api/cursado/conBorrado`, {
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

    if (!data) return <p>No hay cursados</p>;

    const cursados = data ?? [];

    const deleteCursado = async (_id: string) => {
        await fetch(`${URI}/api/cursado/${_id}`, {
            method: "Delete",
        });

        toast.success("Cursado borrado exitosamente");

        fetch(`${URI}/api/cursado/conBorrado`, {
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
        <div className="mx-auto p-6 mb-14 space-y-6">
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
                                    <th scope="col">Dia Cursado</th>
                                    <th scope="col">Hora Inicio</th>
                                    <th scope="col">Hora Fin</th>
                                    <th scope="col">Comision</th>
                                    <th scope="col">Turno</th>
                                    <th scope="col">Año</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Materia</th>
                                    <th scope="col">Profesor</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {cursados.map((cursado, idx) => (
                                    <CursadoCard cursado={cursado} key={cursado.id} idx={idx} deleteCursado={deleteCursado} />
                                ))}
                            </tbody>
                        </Table>
                        <div className="button-container">
                            <Link href={`/dashboard/cursado/add`} className="btn btn-primary">
                                Add
                            </Link>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

function CursadoCard({ cursado, deleteCursado, idx }: { cursado: Cursado; deleteCursado: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.id}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.diaCursado}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.horaInicio}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.horaFin}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.comision}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.turno}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.año}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.tipoCursado}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.materia.nombre}</td>
            <td style={{ color: cursado.borradoLogico ? "red" : "black" }}>{cursado.profesor.nombre + ", " + cursado.profesor.apellido}</td>
            <td>
                <Link
                    href={{
                        pathname: `/dashboard/cursado/edit/${cursado.id}`,
                        query: {
                            id: cursado.id,
                            diaCursado: cursado.diaCursado,
                            horaInicio: cursado.horaInicio,
                            horaFin: cursado.horaFin,
                            comision: cursado.comision,
                            turno: cursado.turno,
                            año: cursado.año,
                            tipoCursado: cursado.tipoCursado,
                            materia: cursado.materia.id,
                            profesor: cursado.profesor.id,
                        },
                    }}
                    className="btn btn-outline-dark cus-mr-10">
                    Edit
                </Link>
                {
                    <motion.div
                        animate={{ width: isLoading ? 50 : 85 }}
                        className={`btn cus-mr-10 transition-all ${cursado.borradoLogico == false ? "btn-outline-danger" : "bg-gray-200 text-gray-300"} `}
                        onClick={async () => {
                            if (cursado.borradoLogico == true) return;
                            if (isLoading) return;

                            setLoading(true);
                            await deleteCursado(cursado.id);
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

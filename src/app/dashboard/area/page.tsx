"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Area } from "../../lib/definitions";
import AreaCard from "@/app/components/AreaCard";
import { URI } from "@/app/lib/utils";

export default function Page() {
    const [data, setData] = useState<Area[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${URI}/api/area/conBorrado`, {
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

    const areas = data ?? [];

    const deleteArea = async (_id: string) => {
        await fetch(`${URI}/api/area/${_id}`, {
            method: "Delete",
        });

        toast.success("Area borrada exitosamente");

        fetch("${URI}/api/area/conBorrado", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setData(data.data);
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
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {areas.map((area, idx) => (
                                    <AreaCard area={area} key={area.id} idx={idx} deleteArea={deleteArea} />
                                ))}
                            </tbody>
                        </Table>
                        <div className="button-container">
                            <Link href={`/dashboard/area/add`} className="btn btn-primary">
                                Add
                            </Link>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

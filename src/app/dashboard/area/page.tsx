"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Area } from "../../lib/definitions";
import AreaCard from "@/app/components/AreaCard";
import { URI } from "@/app/lib/utils";
import { ArrowLeft, Plus } from "lucide-react";

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
        setLoading(true);

        await fetch(`${URI}/api/area/${_id}`, {
            method: "Delete",
        });

        toast.success("Area borrada exitosamente", {
            autoClose: 6000,
        });

        fetch(`${URI}/api/area/conBorrado`, {
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
                        <div className="flex flex-col items-start md:flex-row  justify-start md:justify-between">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Volver Atrás
                            </Link>
                            <div className="button-container">
                                <Link
                                    href={`area/add`}
                                    className="btn bg-blue-400 text-slate-50 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-sm hover:text-slate-700 hover:border-slate-200">
                                    <Plus />
                                    Nueva Area
                                </Link>
                            </div>
                        </div>
                        <Table className="table mt-4" borderless hover>
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {areas.map((area, idx) => (
                                    <AreaCard area={area} key={area.id} idx={idx} deleteArea={deleteArea} />
                                ))}
                            </tbody>
                        </Table>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

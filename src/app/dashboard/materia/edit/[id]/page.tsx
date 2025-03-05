"use client";

import LinkBack from "@/app/components/LinkBack";
import { appFetch } from "@/app/hooks/useFetch";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Page() {
    const searchParams = useSearchParams();
    let materiaNombre = searchParams.get("nombre");
    let materiaId = searchParams.get("id")!;

    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState(materiaNombre!);

    const router = useRouter();

    const editMateria = async (id: string): Promise<void> => {
        try {
            setLoading(true);

            const response = await appFetch(`${process.env.NEXT_PUBLIC_URI}/api/materia/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    nombre: nombre,
                }),
            });

            if (response.success) {
                toast.success(response.message, {
                    autoClose: 6000,
                });
                router.push("/dashboard/materia");
            } else {
                //@ts-ignore
                response.error.map((err) => {
                    //@ts-ignore
                    toast.error(err.message, {
                        autoClose: 6000,
                    });
                });
            }
        } catch (error) {
            toast.error(`Ocurrió un error inesperado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mb-14 space-y-6">
            <div className="container">
                <LinkBack route="/dashboard/materia"></LinkBack>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        editMateria(materiaId);
                    }}>
                    <div className="form-group mb-5 pt-5">
                        <label htmlFor="formGroupExampleInput">Nombre</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="formGroupExampleInput"
                            placeholder="Example input"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <motion.button type="submit" className="btn btn-primary cus-mr-10" animate={{ width: loading ? 50 : 85 }}>
                        {loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Spinner animation="border" size="sm" />
                            </motion.div>
                        )}
                        {!loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Aceptar
                            </motion.div>
                        )}
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

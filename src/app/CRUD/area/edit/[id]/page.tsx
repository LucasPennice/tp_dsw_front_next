"use client";

import { motion } from "framer-motion";
import Link from "next/link.js";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Page() {
    const params = useParams();
    const searchParams = useSearchParams();

    let property1 = searchParams.get("name");

    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState(property1 ?? "");

    const router = useRouter();

    const id = params.id as string;

    const editArea = async (id: string): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(`https://tp-dsw-back.onrender.com/api/area/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre,
                }),
            });

            if (response.ok) {
                toast.success("Area modificado correctamente");
                router.push("/CRUD/area");
            } else {
                toast.error("Error al modificar el area");
                router.push("CRUD/area");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Ocurrió un error inesperado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <Link href={`/CRUD/area`} className="btn btn-primary">
                    Volver
                </Link>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        editArea(id);
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

                    <motion.button type="submit" className="btn btn-primary cus-mr-10" disabled={nombre == ""} animate={{ width: loading ? 50 : 85 }}>
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
        </>
    );
}

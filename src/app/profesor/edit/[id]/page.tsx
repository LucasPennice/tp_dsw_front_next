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
    let property2 = searchParams.get("apellido");

    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState(property1 ?? "");
    const [apellido, setApellido] = useState(property2 ?? "");

    const router = useRouter();

    const id = params.id as string;

    const editProfesor = async (id: string): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(`https://tp-dsw-back.onrender.com/api/profesor/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                }),
            });

            if (response.ok) {
                toast.success("Profesor modificado correctamente");
                router.push("/profesor");
            } else {
                toast.error("Error al modificar el profesor");
                router.push("/profesor");
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
                <Link href={`/profesor`} className="btn btn-primary">
                    Volver
                </Link>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        editProfesor(id);
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
                    <div className="form-group mb-5">
                        <label htmlFor="formGroupExampleInput2">Apellido</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="formGroupExampleInput2"
                            placeholder="Another input"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="btn btn-primary cus-mr-10"
                        disabled={nombre == "" || apellido == ""}
                        animate={{ width: loading ? 50 : 85 }}>
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

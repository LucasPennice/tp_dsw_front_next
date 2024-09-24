"use client";

import { motion } from "framer-motion";
import Link from "next/link.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Page() {
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState("");

    const router = useRouter();

    const addArea = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(`https://tp-dsw-back.onrender.com/api/area/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    nombre: nombre,
                }),
            });

            if (response.ok) {
                toast.success("Area agregado correctamente");
                router.push("/CRUD/area");
            } else {
                toast.error("Error al agregar el area");
                router.push("/CRUD/area");
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
                <Link href={`/area`} className="btn btn-primary">
                    Volver
                </Link>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addArea();
                    }}>
                    <div className="form-group mb-2 pt-5">
                        <label htmlFor="formGroupExampleInput">Nombre</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="formGroupExampleInput"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary cus-mr-10"
                        disabled={nombre == "" || loading}
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
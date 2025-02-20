"use client";

import LinkBack from "@/app/components/LinkBack";
import { appFetch } from "@/app/hooks/useFetch";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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

            const response = await appFetch(`${process.env.NEXT_PUBLIC_URI}/api/area/`, 
                {method: "POST", body: JSON.stringify({
                    nombre: nombre,
                })
            }) 
            // const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/area/`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     credentials: "include",
            //     body: JSON.stringify({
            //         nombre: nombre,
            //     }),
            // });
            if (response.ok) {
                toast.success("Area agregada correctamente", {
                    autoClose: 6000,
                });
                router.push("/dashboard/area");
            } else {
                const error = await response.json();
                toast.error(error.errors[0].message, {
                    autoClose: 6000,
                });
            }
        } catch (error) {
            toast.error(`Ocurrió un error inesperado. ${error}`, {
                autoClose: 6000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <LinkBack route={`/dashboard/area`}></LinkBack>

                <form
                    onSubmit={(e) => {
                        // if (nombre != "") {
                        // //     e.preventDefault();
                        //     addArea();
                        // }
                        e.preventDefault();
                        addArea();
                    }}>
                    <div className="form-group mb-3 pt-5">
                        <label htmlFor="formGroupExampleInput">Nombre</label>
                        <input
                            data-cy="area-name-input"
                            type="text"
                            className="form-control mt-3"
                            id="formGroupExampleInput"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary cus-mr-10 mt-3"
                        // disabled={nombre == "" || loading}
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

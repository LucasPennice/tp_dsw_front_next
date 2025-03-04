"use client";

import LinkBack from "@/app/components/LinkBack";
import { appFetch, useFetchForGet } from "@/app/hooks/useFetch";
import { Area } from "@/app/lib/definitions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { toast } from "react-toastify";

export default function Page() {
    const [loading, setLoading] = useState(true);

    const [nombre, setNombre] = useState("");
    const [areaId, setAreaId] = useState<string>("");
    const [areas, setAreas] = useState<Area[]>([]);

    useFetchForGet(`${process.env.NEXT_PUBLIC_URI}/api/area`, setAreas);

    useEffect(() => {
        if (areas) setLoading(false);
    }, [areas]);

    const router = useRouter();

    const addMateria = async (): Promise<void> => {
        try {
            setLoading(true);

            if (areaId === null) {
                throw "Area ID null";
            }

            const response = await appFetch(`${process.env.NEXT_PUBLIC_URI}/api/materia/`, {
                method: "POST",
                body: JSON.stringify({
                    nombre: nombre,
                    areaId: areaId,
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
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            <AnimatePresence>
                {loading && (
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

                {!loading && areas!.length != 0 && (
                    <div className="container">
                        <LinkBack route="/dashboard/materia"></LinkBack>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addMateria();
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

                            <div className="grid grid-cols-4 gap-2 pt-5">
                                <label htmlFor="formGroupExampleInput" className="col-span-4">
                                    Area
                                </label>
                                <div className="col-span-4">
                                    <Select onValueChange={(v) => setAreaId(v)} value={areaId}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Seleccionar un Area" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {areas.map((area) => {
                                                return (
                                                    <SelectItem key={area.id} value={area.id}>
                                                        {area.nombre}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <motion.button type="submit" className="btn btn-primary cus-mr-10 mt-5" animate={{ width: loading ? 50 : 85 }}>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    Aceptar
                                </motion.div>
                            </motion.button>
                        </form>
                    </div>
                )}
                {!loading && areas!.length == 0 && (
                    <motion.div className="max-w-4xl text-center mx-auto p-6">
                        <p className="text-xl font-semibold text-gray-800 mb-1 mt-5">No Existen Areas Cargadas</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

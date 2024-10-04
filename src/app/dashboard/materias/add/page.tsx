"use client";

import { Area } from "@/app/lib/definitions";
import { URI } from "@/app/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link.js";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { toast } from "react-toastify";

export default function Page() {
    const [loading, setLoading] = useState(true);

    const [nombre, setNombre] = useState("");
    const [areaId, setAreaId] = useState<string>("");
    const [areas, setAreas] = useState<Area[]>([]);

    useEffect(() => {
        fetch(`${URI}/api/area`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAreas(data.data);
                setLoading(false);
            });
    }, []);

    if (!areas) return <p>No hay Areas, insertar area primero</p>;

    const router = useRouter();

    const addMateria = async (): Promise<void> => {
        try {
            setLoading(true);

            if (areaId === null) {
                throw "Area ID null";
            }

            const response = await fetch(`${URI}/api/materia/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    nombre: nombre,
                    areaId: areaId,
                }),
            });

            if (response.ok) {
                toast.success("Materia agregada correctamente");
                router.push("/dashboard/materias");
            } else {
                toast.error("Error al agregar la materia");
                router.push("/dashboard/materias");
            }
        } catch (error) {
            console.error("Error:", error);
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

                <div className="container">
                    <Link href={`/dashboard/materias`} className="btn btn-primary">
                        Volver
                    </Link>

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

                        {/* <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {areaId == null ? "Seleccionar Area" : areas.filter((a) => a.id == areaId)[0].nombre}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {areas.map((area, idx) => {
                                    return (
                                        <Dropdown.Item key={area.id} href={`#/action-${idx + 1}`} onClick={() => setAreaId(area.id)}>
                                            {area.nombre}
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown> */}
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

                        <motion.button
                            type="submit"
                            className="btn btn-primary cus-mr-10 mt-5"
                            disabled={nombre == "" || areaId == "" || loading}
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
            </AnimatePresence>
        </div>
    );
}

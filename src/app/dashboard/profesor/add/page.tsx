"use client";

import { Sexo } from "@/app/lib/definitions";
import { dateFromString } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import { toast, ToastContentProps } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LinkBack from "@/app/components/LinkBack";
import { appFetch } from "@/app/hooks/useFetch";

export default function Page() {
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");
    const [sexo, setSexo] = useState("");

    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [year, setYear] = useState("");

    const intInputLimiter = (n: number, old: string, newS: string) => {
        let input = newS.replace(/[^0-9]/g, "");

        if (input.length > n) {
            return old;
        } else {
            return input;
        }
    };

    const router = useRouter();

    const addProfesor = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = await appFetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/`, {
                method: "POST",
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    fechaNacimiento: dateFromString(`${dia}/${mes}/${year}`),
                    dni: Number(dni),
                    puntuacionGeneral: 0,
                    sexo: sexo,
                }),
            });

            if (response.success) {
                toast.success(response.message, {
                    autoClose: 6000,
                });
                router.push("/dashboard/profesor");
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
            toast.error(`Ocurrió un error inesperado. ${error}`, {
                autoClose: 6000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            <div className="container">
                <LinkBack route="/dashboard/profesor"></LinkBack>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addProfesor();
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
                    <div className="form-group mb-2 mt-3">
                        <label htmlFor="formGroupExampleInput2">Apellido</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="formGroupExampleInput2"
                            placeholder="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="formGroupExampleInput2">Fecha Nacimiento</label>

                        <InputGroup className="mt-2">
                            {/* <InputGroup.Text>Fecha Nac.</InputGroup.Text> */}
                            <Form.Control
                                placeholder="DD"
                                value={dia}
                                onChange={(t) => {
                                    setDia((p) => {
                                        return intInputLimiter(2, p, t.target.value);
                                    });
                                }}
                            />
                            <Form.Control
                                placeholder="MM"
                                value={mes}
                                onChange={(t) => {
                                    setMes((p) => {
                                        return intInputLimiter(2, p, t.target.value);
                                    });
                                }}
                            />
                            <Form.Control
                                placeholder="AAAA"
                                value={year}
                                onChange={(t) => {
                                    setYear((p) => {
                                        return intInputLimiter(4, p, t.target.value);
                                    });
                                }}
                            />
                        </InputGroup>
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="formGroupExampleInput2">DNI</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="formGroupExampleInput2"
                            placeholder="DNI"
                            value={dni}
                            onChange={(e) =>
                                setDni((p) => {
                                    return intInputLimiter(15, p, e.target.value);
                                })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-2 pb-4 pt-3">
                        <label htmlFor="formGroupExampleInput" className="col-span-4">
                            Sexo
                        </label>
                        <div className="col-span-4">
                            <Select onValueChange={(v) => setSexo(v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar Sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={Sexo.Hombre}>Hombre</SelectItem>
                                    <SelectItem value={Sexo.Mujer}>Mujer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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

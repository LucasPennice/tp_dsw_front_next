"use client";

import { Sexo } from "@/app/lib/definitions";
import { URI, validarDni } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link.js";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

export default function Page() {
    const params = useParams();
    const searchParams = useSearchParams();
    let nombreParam = searchParams.get("nombre") as string;
    let apellidoParam = searchParams.get("apellido") as string;
    let dniParam = searchParams.get("dni") as string;
    let sexoParam = searchParams.get("sexo") as string;
    let diaParam = searchParams.get("dia") as string;
    let mesParam = searchParams.get("mes") as string;
    let yearParam = searchParams.get("year") as string;
    const id = params.id as string;

    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState(nombreParam);
    const [apellido, setApellido] = useState(apellidoParam);
    const [dni, setDni] = useState(dniParam);
    const [sexo, setSexo] = useState(sexoParam);
    const [dia, setDia] = useState(diaParam);
    const [mes, setMes] = useState(mesParam);
    const [year, setYear] = useState(yearParam);

    const intInputLimiter = (n: number, old: string, newS: string) => {
        let input = newS.replace(/[^0-9]/g, "");

        if (input.length > n) {
            return old;
        } else {
            return input;
        }
    };

    const router = useRouter();

    const editProfesor = async (id: string): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(`${URI}/api/profesor/${id}`, {
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
                toast.success("Profesor modificado correctamente", {
                    autoClose: 6000,
                });
                router.push("/profesor");
            } else {
                toast.error("Error al modificar el profesor", {
                    autoClose: 6000,
                });
                router.push("/profesor");
            }
        } catch (error) {
            console.error("Error:", error);
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
                <Link
                    href={`/dashboard/profesor`}
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Volver Atrás
                </Link>
                {/* <h2 className="text-2xl">Añadir Nuevo Profesor</h2> */}

                <form
                    onSubmit={(e) => {
                        if (
                            sexo != "" &&
                            nombre != "" &&
                            apellido != "" &&
                            dni != "" &&
                            dia.length === 2 &&
                            mes.length === 2 &&
                            year.length === 4 &&
                            validarDni(dni)
                        ) {
                            e.preventDefault();
                            editProfesor(id);
                        }
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
                    <div className="form-group mb-2">
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
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="d-block sm:d-none">Fecha Nac.</InputGroup.Text>
                        <br />
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

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {sexo == "" ? "Sexo" : sexo}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={() => setSexo(Sexo.Hombre)}>
                                Hombre
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={() => setSexo(Sexo.Mujer)}>
                                Mujer
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <motion.button
                        type="submit"
                        className="btn btn-primary cus-mr-10"
                        disabled={
                            sexo == "" ||
                            nombre == "" ||
                            apellido == "" ||
                            dni == "" ||
                            dia.length !== 2 ||
                            mes.length !== 2 ||
                            year.length !== 4 ||
                            !validarDni(dni) ||
                            loading
                        }
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
        </div>
    );
}

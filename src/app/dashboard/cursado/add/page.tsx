"use client";

import { Materia, Profesor, TiposDocente } from "@/app/lib/definitions";
import { URI, validarAnio, validarComision, validarDiaSemana, validarHora } from "@/app/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

export default function CursadoForm() {
    const [loadingProfesores, setLoadingProfesores] = useState(true);
    const [loadingMaterias, setLoadingMaterias] = useState(true);
    const [diaCursado, setDiaCursado] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [comision, setComision] = useState("");
    const [turno, setTurno] = useState("");
    const [tipoCursado, setTipoCursado] = useState("");
    const [ano, setAno] = useState("");

    const [materiaId, setMateriaId] = useState<string>("");
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [profesorId, setProfesorId] = useState<string>("");
    const [profesores, setProfesores] = useState<Profesor[]>([]);

    const tipos: TiposDocente[] = [TiposDocente.Teoria, TiposDocente.Practica];

    const router = useRouter();

    useEffect(() => {
        (async () => {
            setLoadingMaterias(true);

            let res = await fetch(`${URI}/api/materia`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            let response = await res.json();

            if (res.ok) {
                setMaterias(response.data);
                setLoadingMaterias(false);
            } else {
                toast.error(response.message, {
                    autoClose: 5000,
                });
                console.error("Error fetching materias:", response.message);
                setLoadingMaterias(false);
            }

            fetch(`${URI}/api/profesor`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Profesor data:", data);
                    setProfesores(data.data);
                    setLoadingProfesores(false);
                })
                .catch((error) => {
                    //@ts-ignore
                    toast.error(data.message, {
                        autoClose: 5000,
                    });
                    console.error("Error fetching profesores:", error);
                    setLoadingProfesores(false);
                });
        })();
    }, []);

    // const validaCampos = async () => {
    //     if (
    //         validarDiaSemana(diaCursado) &&
    //         validarComision(comision) &&
    //         tipoCursado &&
    //         validarAnio(ano) &&
    //         materiaId != "" &&
    //         profesorId != "" &&
    //         validarHora(horaInicio) &&
    //         validarHora(horaFin) &&
    //         horaFin > horaInicio
    //     ) {
    //         addCursado();
    //         console.log()
    //     }
    // }

    const addCursado = async () => {
        try {
            setLoadingProfesores(true);
            setLoadingMaterias(true);

            if (materiaId === null) {
                throw new Error("Materia ID null");
            }

            if (profesorId === null) {
                throw new Error("Profesor ID null");
            }

            const response = await fetch(`${URI}/api/cursado`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    diaCursado: diaCursado,
                    horaInicio: horaInicio,
                    horaFin: horaFin,
                    comision: Number(comision),
                    turno: turno,
                    año: Number(ano),
                    tipoCursado: tipoCursado,
                    materiaId: materiaId,
                    profesorId: profesorId,
                }),
            });
            //@ts-ignore
            if (response.ok) {
                toast.success("Cursado agregado exitosamente", {
                    autoClose: 5000,
                });
                router.push("/dashboard/cursado");
            } else {
                const error = await response.json();
                error.errors.map((err: { message: string }) => {
                    toast.error(err.message, {
                        autoClose: 6000,
                    });
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Ocurrió un error inesperado. ${error}`, {
                autoClose: 5000,
            });
        } finally {
            setLoadingProfesores(false);
            setLoadingMaterias(false);
        }
    };

    if (loadingProfesores || loadingMaterias) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            <Link
                href={`/dashboard/cursado`}
                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver Atrás
            </Link>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addCursado();
                }}
                className="space-y-4">
                <div className="form-group">
                    <label htmlFor="diaCursado">Dia Cursado</label>
                    <input
                        type="text"
                        className="form-control"
                        id="diaCursado"
                        placeholder="lunes, martes, etc"
                        value={diaCursado}
                        onChange={(e) => setDiaCursado(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="horaInicio">Hora Inicio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="horaInicio"
                        placeholder="13:00"
                        value={horaInicio}
                        onChange={(e) => {
                            setHoraInicio(e.target.value);
                            if (e.target.value < "12:00") {
                                setTurno("Mañana");
                            } else if (e.target.value < "18:25") {
                                setTurno("Tarde");
                            } else {
                                setTurno("Noche");
                            }
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="horaFin">Hora Fin</label>
                    <input
                        type="text"
                        className="form-control"
                        id="horaFin"
                        placeholder="18:00"
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="comision">Comision</label>
                    <input
                        type="text"
                        className="form-control"
                        id="comision"
                        placeholder="Comision"
                        value={comision}
                        onChange={(e) => setComision(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ano">Año</label>
                    <input type="text" className="form-control" id="ano" placeholder="2024" value={ano} onChange={(e) => setAno(e.target.value)} />
                </div>

                <div className="grid grid-cols-4 gap-2 ">
                    <label htmlFor="formGroupExampleInput" className="col-span-4">
                        Tipo de Cursado
                    </label>
                    <div className="col-span-4">
                        <Select onValueChange={(v) => setTipoCursado(v)} value={tipoCursado}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar un Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {tipos.map((tipo) => {
                                    return (
                                        <SelectItem key={tipo} value={tipo}>
                                            {tipo}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 ">
                    <label htmlFor="formGroupExampleInput" className="col-span-4">
                        Materia
                    </label>
                    <div className="col-span-4">
                        <Select onValueChange={(v) => setMateriaId(v)} value={materiaId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar una Materia" />
                            </SelectTrigger>
                            <SelectContent>
                                {materias.map((materia) => {
                                    return (
                                        <SelectItem key={materia.id} value={materia.id}>
                                            {materia.nombre}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 ">
                    <label htmlFor="formGroupExampleInput" className="col-span-4">
                        Profesor
                    </label>
                    <div className="col-span-4">
                        <Select onValueChange={(v) => setProfesorId(v)} value={profesorId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar un Profesor" />
                            </SelectTrigger>
                            <SelectContent>
                                {profesores.map((profesor) => {
                                    return (
                                        <SelectItem key={profesor.id} value={profesor.id}>
                                            {profesor.nombre + " " + profesor.apellido}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <motion.button
                    type="submit"
                    className="btn btn-primary mt-5"
                    // disabled={
                    //     !validarDiaSemana(diaCursado) ||
                    //     !validarComision(comision) ||
                    //     !tipoCursado ||
                    //     !validarAnio(ano) ||
                    //     materiaId == "" ||
                    //     profesorId == "" ||
                    //     !validarHora(horaInicio) ||
                    //     !validarHora(horaFin) ||
                    //     horaFin <= horaInicio
                    // }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Aceptar
                </motion.button>
            </form>
        </div>
    );
}

"use client";

import { Materia, Profesor, TiposDocente } from "@/app/lib/definitions";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import LinkBack from "@/app/components/LinkBack";
import { appFetch, useFetchForGet } from "@/app/hooks/useFetch";

export default function CursadoForm() {
    const [loading, setLoading] = useState(true);
    const [diaCursado, setDiaCursado] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [comision, setComision] = useState("");
    const [turno, setTurno] = useState("");
    const [tipoCursado, setTipoCursado] = useState("");
    const [ano, setAno] = useState("");

    const [materiaId, setMateriaId] = useState<string>("");
    const [materiasData, setMateriasData] = useState<Materia[] | null>(null);
    const [profesorId, setProfesorId] = useState<string>("");
    const [profesoresData, setProfesoresData] = useState<Profesor[] | null>(null);

    const tipos: TiposDocente[] = [TiposDocente.Teoria, TiposDocente.Practica];

     const dias = [
        { id: "lunes", nombre: "Lunes" },
        { id: "martes", nombre: "Martes" },
        { id: "miércoles", nombre: "Miércoles" },
        { id: "jueves", nombre: "Jueves" },
        { id: "viernes", nombre: "Viernes" },
        { id: "sábado", nombre: "Sábado" },
    ]

    const router = useRouter();
    useFetchForGet(`${process.env.NEXT_PUBLIC_URI}/api/materia`, setMateriasData);
    useFetchForGet(`${process.env.NEXT_PUBLIC_URI}/api/profesor`, setProfesoresData);

    useEffect(() => {
        if (materiasData && profesoresData) setLoading(false);
    }, [materiasData, profesoresData]);

    const materias = materiasData ?? [];
    const profesores = profesoresData ?? [];

    const addCursado = async () => {
        try {
            if (materiaId === null) {
                throw new Error("Materia ID null");
            }

            if (profesorId === null) {
                throw new Error("Profesor ID null");
            }

            const response = await appFetch(`${process.env.NEXT_PUBLIC_URI}/api/cursado`, {
                method: "POST",
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

            if (response.success) {
                toast.success(response.message, {
                    autoClose: 6000,
                });
                router.push("/dashboard/cursado");
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
                autoClose: 5000,
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            <LinkBack route="/dashboard/cursado"></LinkBack>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addCursado();
                }}
                className="space-y-4">


                <div className="grid grid-cols-4 gap-2">
                    <label htmlFor="diaCursado" className="col-span-4">
                        Dia Cursado
                    </label>
                    <div className="col-span-4">
                        <Select onValueChange={(v) => setDiaCursado(v)} value={diaCursado}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar un día" />
                        </SelectTrigger>
                        <SelectContent>
                            {dias.map((dia) => (
                            <SelectItem key={dia.id} value={dia.id}>
                                {dia.nombre}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
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
                                            {profesor.nombre + " " + profesor.apellido + " - DNI: " + profesor.dni}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <motion.button type="submit" className="btn btn-primary mt-5" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Aceptar
                </motion.button>
            </form>
        </div>
    );
}

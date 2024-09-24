"use client";

import { Materia, Profesor, TiposDocente, Turnos } from "@/app/lib/definitions";
import { validarAnio, validarComision, validarDiaSemana, validarHora, validarTurno } from "@/app/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

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

    const [materiaId, setMateriaId] = useState<string | null>(null);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [profesorId, setProfesorId] = useState<string | null>(null);
    const [profesores, setProfesores] = useState<Profesor[]>([]);

    const turnos: Turnos[] = [Turnos.Manana, Turnos.Tarde, Turnos.Noche];
    const tipos: TiposDocente[] = [TiposDocente.Teoria, TiposDocente.Practica];

    const router = useRouter();

    useEffect(() => {
        fetch("https://tp-dsw-back.onrender.com/api/materia", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Materias data:", data);
                setMaterias(data.data);
                setLoadingMaterias(false);
            })
            .catch((error) => {
                console.error("Error fetching materias:", error);
                setLoadingMaterias(false);
            });

        fetch("https://tp-dsw-back.onrender.com/api/profesor", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Profesor data:", data);
                setProfesores(data.data);
                setLoadingProfesores(false);
            })
            .catch((error) => {
                console.error("Error fetching profesores:", error);
                setLoadingProfesores(false);
            });
    }, []);

    const addCursado = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoadingProfesores(true);
            setLoadingMaterias(true);

            if (materiaId === null) {
                throw new Error("Materia ID null");
            }

            if (profesorId === null) {
                throw new Error("Profesor ID null");
            }

            const response = await fetch(`https://tp-dsw-back.onrender.com/api/cursado`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    diaCursado: diaCursado,
                    horaInicio: horaInicio,
                    horaFin: horaFin,
                    comision: comision,
                    turno: turno,
                    año: ano,
                    tipoCursado: tipoCursado,
                    materiaId: materiaId,
                    profesorId: profesorId,
                }),
            });
            if (response.ok) {
                toast.success("Cursado agregado correctamente");
                router.push("/CRUD/cursado");
            } else {
                toast.error("Error al agregar el cursado");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Ocurrió un error inesperado. ${error}`);
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
            <Link href={`/CRUD/materias`} className="btn btn-primary">
                Volver
            </Link>

            <form onSubmit={addCursado} className="space-y-4">
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
                        onChange={(e) => setHoraInicio(e.target.value)}
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

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-turno">
                        {turno || "Seleccionar Turno"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {turnos.map((t) => (
                            <Dropdown.Item key={t} onClick={() => setTurno(t)}>
                                {t}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="form-group">
                    <label htmlFor="ano">Año</label>
                    <input type="text" className="form-control" id="ano" placeholder="Año" value={ano} onChange={(e) => setAno(e.target.value)} />
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-tipo">
                        {tipoCursado || "Seleccionar Tipo de Cursado"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {tipos.map((tipo) => (
                            <Dropdown.Item key={tipo} onClick={() => setTipoCursado(tipo)}>
                                {tipo}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-materia">
                        {materiaId ? materias.find((m) => m.id === materiaId)?.nombre || "Materia no encontrada" : "Seleccionar Materia"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {materias.map((materia) => (
                            <Dropdown.Item key={materia.id} onClick={() => setMateriaId(materia.id)}>
                                {materia.nombre}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-profesor">
                        {profesorId != null
                            ? `${profesores.find((p) => p.id === profesorId)!.nombre} ${profesores.find((p) => p.id === profesorId)!.apellido}`
                            : "Seleccionar Profesor"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {profesores.map((profesor) => (
                            <Dropdown.Item key={profesor.id} onClick={() => setProfesorId(profesor.id)}>
                                {`${profesor.nombre} ${profesor.apellido}`}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                        !validarDiaSemana(diaCursado) ||
                        !validarComision(comision) ||
                        !validarTurno(turno, horaInicio, horaFin) ||
                        !tipoCursado ||
                        !validarAnio(ano) ||
                        !materiaId ||
                        !profesorId ||
                        !validarHora(horaInicio) ||
                        !validarHora(horaFin) ||
                        horaFin <= horaInicio
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Aceptar
                </motion.button>
            </form>
        </div>
    );
}

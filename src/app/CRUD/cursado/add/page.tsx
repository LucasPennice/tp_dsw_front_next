"use client";

import { Materia, Profesor } from "@/app/lib/definitions";
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

    const turnos = ["Mañana", "Tarde", "Noche"];
    const tipos = ["Teoria", "Practica"];

    const router = useRouter();

    useEffect(() => {
        fetch("https://tp-dsw-back.onrender.com/api/materia/ConBorrado", {
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
    }, []);

    useEffect(() => {
        fetch("https://tp-dsw-back.onrender.com/api/profesor/ConBorrado", {
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
                        placeholder="Dia Cursado"
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
                        placeholder="Hora Inicio"
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
                        placeholder="Hora Fin"
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
                        {profesorId ? profesores.find((p) => p.id === profesorId)?.nombre || "Profesor no encontrado" : "Seleccionar Profesor"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {profesores.map((profesor) => (
                            <Dropdown.Item key={profesor.id} onClick={() => setProfesorId(profesor.id)}>
                                {profesor.nombre}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!diaCursado || !horaInicio || !horaFin || !comision || !turno || !tipoCursado || !ano || !materiaId || !profesorId}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Aceptar
                </motion.button>
            </form>
        </div>
    );
}

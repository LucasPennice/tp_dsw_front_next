"use client";

import { TiposDocente } from "@/app/lib/definitions";
import { validarAnio, validarComision, validarDiaSemana, validarHora } from "@/app/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import LinkBack from "@/app/components/LinkBack";

export default function Page() {
    const searchParams = useSearchParams();

    let cursadoId = searchParams.get("id")!;
    let dia = searchParams.get("diaCursado")!;
    let hd = searchParams.get("horaInicio")!;
    let hh = searchParams.get("horaFin")!;
    let com = searchParams.get("comision")!;
    let tur = searchParams.get("turno")!;
    let año = searchParams.get("año")!;
    let tipo = searchParams.get("tipoCursado")!;

    const [loading, setLoading] = useState(false);

    const [diaCursado, setDiaCursado] = useState(dia);
    const [horaInicio, setHoraInicio] = useState(hd);
    const [horaFin, setHoraFin] = useState(hh);
    const [comision, setComision] = useState(com);
    const [turno, setTurno] = useState(tur);
    const [tipoCursado, setTipoCursado] = useState(tipo);
    const [ano, setAno] = useState(año);

    const tipos: TiposDocente[] = [TiposDocente.Teoria, TiposDocente.Practica];

    const router = useRouter();

    const editCursado = async (id: string): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/cursado/${id}`, {
                method: "PATCH",
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
                }),
            });

            if (response.ok) {
                toast.success("Cursado Modificado correctamente", {
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
            toast.error(`Ocurrió un error inesperado. ${error}`, {
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mb-14 space-y-6">
            <div className="container">
                <LinkBack route="/dashboard/cursado"></LinkBack>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        editCursado(cursadoId);
                    }}>
                    <div className="form-group mt-3">
                        <label htmlFor="diaCursado">Dia Cursado</label>
                        <input
                            type="text"
                            className="form-control"
                            id="diaCursado"
                            placeholder={diaCursado}
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
                            placeholder={horaInicio}
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
                            placeholder={horaFin}
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
                            placeholder={comision}
                            value={comision}
                            onChange={(e) => setComision(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ano">Año</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ano"
                            placeholder="2024"
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                        />
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

                    <motion.button type="submit" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Aceptar
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

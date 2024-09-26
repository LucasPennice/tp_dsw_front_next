"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { Plus, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Materia, Profesor, years } from "../lib/definitions";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { URI } from "../lib/utils";

export default function Navbar({ reviewModalOpen, setReviewModalOpen }: { reviewModalOpen: boolean; setReviewModalOpen: (v: boolean) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [year, setYear] = useState<string>();
    const [materiaId, setMateriaId] = useState<string>("");
    const [profesorId, setProfesorId] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const [puntuacion, setPuntuacion] = useState(0);

    const [materiasPorAno, setMateriasPorAno] = useState<Materia[]>([]);
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [loadingMaterias, setLoadingMaterias] = useState(false);
    const [loadingProfesores, setLoadingProfesores] = useState(false);
    const [sendingReview, setSendingReview] = useState(false);

    const resetReviewModalState = () => {
        setYear(undefined);
        setMateriaId("");
        setProfesorId("");
        setReview("");
        setMateriasPorAno([]);
        setProfesores([]);
    };

    const MockUserId = "213123-123-123-123-123";

    const sendReview = async (e: any): Promise<void> => {
        try {
            e.preventDefault();
            setSendingReview(true);

            const response = await fetch(`${URI}/api/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    descripcion: review,
                    puntuacion,
                    usuarioId: MockUserId,
                    anio: year![0],
                    profesorId,
                    materiaId,
                }),
            });

            if (response.ok) {
                toast.success("Review creada correctamente");
                setReviewModalOpen(false);
            } else {
                toast.error("Error al crear review");
                setReviewModalOpen(false);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Ocurrió un error inesperado. ${error}`);
        } finally {
            setSendingReview(false);
        }
    };

    const isLog = true;

    useEffect(() => {
        if (!year) return;

        setLoadingMaterias(true);

        fetch(`${URI}/api/materia/porAno/${year}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setMateriasPorAno(data.data);
                setLoadingMaterias(false);
            })
            .catch((error) => {
                console.error("Error fetching materias:", error);
                setLoadingMaterias(false);
            });
    }, [year]);

    useEffect(() => {
        console.log;
        if (!year) return;
        if (!materiaId) return;

        setLoadingProfesores(true);

        fetch(`${URI}/api/profesor/porMateriaYAno/${year[0]}/${materiaId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProfesores(data.data);
                setLoadingProfesores(false);
            })
            .catch((error) => {
                console.error("Error fetching materias:", error);
                setLoadingProfesores(false);
            });
    }, [materiaId]);

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-28">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src="/assets/logo.png" className="w-36" />
                        </Link>
                    </div>
                    {isLog ? (
                        <div className="flex items-center space-x-4">
                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 ">
                                        Mi Cuenta
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 mt-4">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Perfil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Configuración</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Cerrar sesión</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Dialog
                                open={reviewModalOpen}
                                onOpenChange={(open) => {
                                    setReviewModalOpen(open);
                                    if (!open) resetReviewModalState();
                                }}>
                                <DialogTrigger className="hidden md:flex items-center gap-3 px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-700 rounded-full cus-shadow hover:scale-[1.05] transition-all duration-200">
                                    <Plus size={20} strokeWidth={2} />
                                    <p className="text-md font-medium">Nueva Review</p>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Nueva Review</DialogTitle>
                                        <DialogDescription>Recuerda no escribir insultos o mensajes ofensivos</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={sendReview}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label className="text-right">Año</Label>
                                                <div className="w-[280px]">
                                                    <Select onValueChange={(v) => setYear(v)} value={year}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecciona un año" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {years.map((year) => (
                                                                <SelectItem key={year.id} value={year.id}>
                                                                    {year.type}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label className="text-right">Materia</Label>
                                                <div className="w-[280px]">
                                                    <Select
                                                        onValueChange={(v) => setMateriaId(v)}
                                                        value={materiaId}
                                                        disabled={loadingMaterias || materiasPorAno.length == 0}>
                                                        <SelectTrigger className="w-full">
                                                            {loadingMaterias ? (
                                                                <Spinner size="sm" />
                                                            ) : (
                                                                <SelectValue placeholder="Seleccionar una materia" />
                                                            )}
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {materiasPorAno.map((materia) => {
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
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label className="text-right">Profesor</Label>
                                                <div className="w-[280px]">
                                                    <Select
                                                        disabled={loadingProfesores || profesores.length == 0}
                                                        onValueChange={(v) => setProfesorId(v)}
                                                        value={profesorId}>
                                                        <SelectTrigger className="w-full">
                                                            {loadingProfesores ? (
                                                                <Spinner size="sm" />
                                                            ) : (
                                                                <SelectValue placeholder="Seleccionar un profesor" />
                                                            )}
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {profesores.map((profesor) => {
                                                                return (
                                                                    <SelectItem key={profesor.id} value={profesor.id}>
                                                                        {`${profesor.nombre} ${profesor.apellido}`}
                                                                    </SelectItem>
                                                                );
                                                            })}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <StarSelector onChange={(n) => setPuntuacion(n)} />
                                        <Textarea
                                            onChange={(e) => setReview(e.target.value)}
                                            value={review}
                                            disabled={profesores.length == 0 || materiasPorAno.length == 0}
                                            placeholder="Tu review aquí"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Caracteres:{" "}
                                            <span className={`${review.length < 5 ? "text-red-600" : "text-muted-foreground"}`}>{review.length}</span>
                                        </p>
                                        <DialogFooter className="pt-4">
                                            <Button disabled={review.length < 5 || sendingReview == true || puntuacion == 0} type="submit">
                                                {!sendingReview ? "Save changes" : <Spinner size="sm" />}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" className="flex items-center gap-2 ">
                                Iniciar sesion
                            </Button>
                            <Button variant="default" className="flex items-center gap-2 ">
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function StarSelector({ onChange }: { onChange: (rating: number) => void }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (value: number) => {
        setRating(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className="grid grid-cols-4 items-center gap-4 pb-4">
            <Label className="text-right">Puntuacion</Label>
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star, i) => (
                    <button
                        key={star}
                        type="button"
                        className={cn(
                            "transition-all duration-100 ease-in-out",
                            hover >= star || rating >= star ? "text-orange-400 scale-110" : "text-gray-300",
                            "hover:scale-125"
                        )}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}>
                        <Star fill={i < rating ? "orange" : "black"} className={`w-5 h-5`} color="#2563eb00" />
                    </button>
                ))}
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut, Plus, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getSession, logout } from "../../authlib";
import { Materia, Profesor, years } from "../lib/definitions";
import { URI } from "../lib/utils";
import { UserInfoContext, usuarioEnMemoriaDefault } from "../layout";

export default function Navbar({ reviewModalOpen, setReviewModalOpen }: { reviewModalOpen: boolean; setReviewModalOpen: (v: boolean) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [year, setYear] = useState<string>();
    const [anoEnElQueSeCurso, setAnoEnElQueSeCurso] = useState<number>(new Date().getFullYear());
    const [materiaId, setMateriaId] = useState<string>("");
    const [profesorId, setProfesorId] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const [puntuacion, setPuntuacion] = useState(0);

    const { userInfo, setUserInfo } = useContext(UserInfoContext);

    const [materiasPorAno, setMateriasPorAno] = useState<Materia[]>([]);
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [loadingMaterias, setLoadingMaterias] = useState(false);
    const [loadingProfesores, setLoadingProfesores] = useState(false);
    const [sendingReview, setSendingReview] = useState(false);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const session = await getSession();

            if (session == null) {
                return setUserInfo({ auth: false, user: usuarioEnMemoriaDefault });
            }

            setUserInfo({ auth: true, user: session.user });
        })();
    }, []);

    const resetReviewModalState = (evento?: "añoDeCursado" | "añoDeMateria" | "materia") => {
        /// Se resetean siempre
        setReview("");
        setPuntuacion(0);

        if (evento == "añoDeCursado") {
            setAnoEnElQueSeCurso(new Date().getFullYear());
            setYear("");
            setMateriaId("");
            setProfesorId("");
            setMateriasPorAno([]);
            setProfesores([]);
        }

        if (evento == "añoDeMateria") {
            setYear("");
            setMateriaId("");
            setMateriasPorAno([]);
            setProfesorId("");
            setProfesores([]);
        }

        if (evento == "materia") {
            setProfesorId("");
            setProfesores([]);
        }
    };

    const sendReview = async (e: any): Promise<void> => {
        try {
            e.preventDefault();
            setSendingReview(true);

            const response = await fetch(`${URI}/api/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    descripcion: review,
                    puntuacion,
                    usuarioId: userInfo.user.id,
                    anio: year![0],
                    profesorId,
                    materiaId,
                    anoCursado: anoEnElQueSeCurso,
                }),
            });

            let res = await response.json();

            if (response.ok) {
                toast.success(res.message);
                setReviewModalOpen(false);
            } else {
                toast.error(res.message);
                setReviewModalOpen(false);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Ocurrió un error inesperado. ${error}`);
        } finally {
            setSendingReview(false);
        }
    };

    useEffect(() => {
        (async () => {
            if (!year) return;

            setLoadingMaterias(true);

            let res = await fetch(`${URI}/api/materia/porAno/${year}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            let response = await res.json();

            if (res.ok) {
                toast.success(response.message);
                setMateriasPorAno(response.data);
                setLoadingMaterias(false);
            } else {
                toast.error(response.message);
                console.error("Error fetching materias:", response.message);
                setLoadingMaterias(false);
            }
        })();
    }, [year]);

    useEffect(() => {
        (async () => {
            if (!year) return;
            if (!materiaId) return;

            setLoadingProfesores(true);

            let res = await fetch(`${URI}/api/profesor/porMateriaYAno/${year[0]}/${materiaId}/${anoEnElQueSeCurso}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            let response = await res.json();

            if (res.ok) {
                setProfesores(response.data);
                setLoadingProfesores(false);
                toast.success(response.message);
            } else {
                //@ts-ignore
                console.error("Error fetching materias:", res.message);
                setLoadingProfesores(false);
                toast.error(response.message);
            }
        })();
    }, [materiaId]);

    const logoutAndResetState = async () => {
        setUserInfo({ auth: false, user: usuarioEnMemoriaDefault });

        await logout();

        router.push("/");
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-28">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src="/assets/logo.png" className="w-36" />
                        </Link>
                    </div>
                    {userInfo.auth ? (
                        <div className="flex items-center space-x-4">
                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 ">
                                        Mi Cuenta
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 mt-4">
                                    {/* <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Perfil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Configuración</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator /> */}
                                    {userInfo.user.rol === "Administrador" ? (
                                        <DropdownMenuItem>
                                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                                <button className="flex items-center">
                                                    <Grid className="mr-2 h-4 w-4" />

                                                    <span>Dashboard </span>
                                                </button>
                                            </Link>
                                        </DropdownMenuItem>
                                    ) : (
                                        <></>
                                    )}
                                    <DropdownMenuItem>
                                        <button className="flex items-center" onClick={logoutAndResetState}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Cerrar sesión </span>
                                        </button>
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
                                                <Label className="text-right">Año Cursado</Label>
                                                <div className="w-[280px]">
                                                    <Select
                                                        onValueChange={(v) => {
                                                            resetReviewModalState("añoDeCursado");
                                                            setAnoEnElQueSeCurso(parseInt(v));
                                                        }}
                                                        value={`${anoEnElQueSeCurso}`}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecciona un año" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[2020, 2021, 2022, 2023, 2024].map((year) => (
                                                                <SelectItem key={year} value={`${year}`}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label className="text-right">Año Materia</Label>
                                                <div className="w-[280px]">
                                                    <Select
                                                        onValueChange={(v) => {
                                                            resetReviewModalState("añoDeMateria");
                                                            setYear(v);
                                                        }}
                                                        value={year}>
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
                                                        onValueChange={(v) => {
                                                            resetReviewModalState("materia");
                                                            setMateriaId(v);
                                                        }}
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
                                                        onValueChange={(v) => {
                                                            resetReviewModalState();
                                                            setProfesorId(v);
                                                        }}
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
                            <Link href="/auth/login">
                                <Button variant="ghost" className="flex items-center gap-2 ">
                                    Iniciar sesion
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button variant="default" className="flex items-center gap-2 ">
                                    Sign Up
                                </Button>
                            </Link>
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

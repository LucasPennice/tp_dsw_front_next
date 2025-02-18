"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, EyeIcon, EyeOffIcon } from "lucide-react";
// import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sexo, UsuarioEnMemoria } from "@/app/lib/definitions";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import { validarLegajo, validarNombreOApellido } from "@/app/lib/utils";
import { login } from "@/authlib";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserInfoContext } from "@/app/layout";

interface FormData {
    nombre: string;
    legajo: string;
    apellido: string;
    username: string;
    fechaNacimiento: Date | undefined;
    sexo: Sexo;
    password: string;
}

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [formData, setFormData] = useState<FormData>({
        nombre: "",
        legajo: "",
        apellido: "",
        username: "",
        fechaNacimiento: new Date("2001/03/19"),
        sexo: Sexo.Hombre,
        password: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        setFormData((prevData) => ({
            ...prevData,
            fechaNacimiento: date,
        }));
    };

    const handleSexoChange = (value: Sexo) => {
        setFormData((prevData) => ({
            ...prevData,
            sexo: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/usuario`, {
                // const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    fechaNacimiento: `${formData.fechaNacimiento!.getFullYear()}/${formData.fechaNacimiento!.getMonth() < 10 ? "0" : ""}${formData.fechaNacimiento!.getMonth()}/${formData.fechaNacimiento!.getDay() < 10 ? "0" : ""}${formData.fechaNacimiento!.getDay()}`,
                }),
                credentials: "include",
            });

            let res = await response.json();

            if (response.ok) {
                setUserInfo({ auth: true, user: res.data as UsuarioEnMemoria });

                await setLocalCookies(res.data);

                toast.success(res.message);

                router.push("/");
            } else {
                res.errors.map((err: { message: string }) => {
                    toast.error(err.message, {
                        autoClose: 6000,
                    });
                });
            }
        } catch (error) {
            toast.error(`Ocurrió un error inesperado. ${error}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Crea tu cuenta</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="apellido">Apellido</Label>
                            <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="legajo">Legajo</Label>
                            <Input id="legajo" name="legajo" placeholder="50977" value={formData.legajo} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha de Nacimiento</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!formData.fechaNacimiento && "text-muted-foreground"}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.fechaNacimiento ? formData.fechaNacimiento.toDateString() : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={formData.fechaNacimiento} onSelect={handleDateChange} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Sexo</Label>
                            <RadioGroup value={formData.sexo} onValueChange={handleSexoChange}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={Sexo.Hombre} id="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={Sexo.Mujer} id="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent w-auto"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}>
                                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            {loading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Spinner animation="border" size="sm" />
                                </motion.div>
                            )}
                            {!loading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    Ingresar
                                </motion.div>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { login } from "../../../authlib";
import { Usuario, UsuarioEnMemoria } from "@/app/lib/definitions";
import { UserInfoContext } from "@/app/layout";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const router = useRouter();
    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const attemptLogin = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: user,
                    password: pass,
                }),
                credentials: "include",
            });

            let res = await response.json();

            if (response.ok) {
                setUserInfo({ auth: true, user: res.data as UsuarioEnMemoria });
                await login(res.data as UsuarioEnMemoria);
                toast.success(res.message);
                router.push("/");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(`Ocurrió un error inesperado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-fit p-6 mb-14 space-y-6 flex justify-center items-center ">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Usuario</Label>
                                <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="usuario123" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Input
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="contraseña321"
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
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <motion.button
                        className="btn btn-primary cus-mr-10"
                        onClick={attemptLogin}
                        disabled={user == "" || pass == ""}
                        animate={{ width: loading ? 50 : 85 }}>
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
                    </motion.button>
                </CardFooter>
            </Card>
        </div>
    );
}

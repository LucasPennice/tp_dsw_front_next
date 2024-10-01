"use client";

// @ts-ignore
import type { Metadata } from "next";
// @ts-ignore
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileFloatingButton from "./components/MobileFloatingButton";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Sexo, UserRole, UsuarioEnMemoria } from "./lib/definitions";

const inter = Inter({ subsets: ["latin"] });

export const ReviewSheetContext = createContext<{ reviewModalOpen: boolean; setReviewModalOpen: Dispatch<SetStateAction<boolean>> }>({
    reviewModalOpen: false,
    setReviewModalOpen: () => {},
});

export type UserInfo = { auth: boolean; user: UsuarioEnMemoria };

export const usuarioEnMemoriaDefault: UsuarioEnMemoria = {
    id: "",
    legajo: "",
    nombre: "Usuario",
    apellido: "",
    username: "Usuario",
    fechaNacimiento: "",
    sexo: Sexo.Hombre,
    rol: UserRole.Regular,
};

export const UserInfoContext = createContext<{ userInfo: UserInfo; setUserInfo: Dispatch<SetStateAction<UserInfo>> }>({
    userInfo: { auth: false, user: usuarioEnMemoriaDefault },
    setUserInfo: () => {},
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({ auth: false, user: usuarioEnMemoriaDefault });

    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <ReviewSheetContext.Provider value={{ reviewModalOpen, setReviewModalOpen }}>
                    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
                        <Navbar reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen} />
                        <main>
                            <ToastProvider>{children}</ToastProvider>
                        </main>
                        <Footer />
                        <MobileFloatingButton />
                    </UserInfoContext.Provider>
                </ReviewSheetContext.Provider>
            </body>
        </html>
    );
}

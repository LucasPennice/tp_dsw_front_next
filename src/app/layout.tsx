"use client";
// @ts-ignore
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { cookies } from "next/headers";
// @ts-ignore
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import { Dispatch, SetStateAction, createContext, useEffect } from "react";
import "./globals.css";
import { Sexo, UserRole, UsuarioEnMemoria } from "./lib/definitions";

import { useState } from "react";
import Footer from "./components/Footer";
import MobileFloatingButton from "./components/MobileFloatingButton";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ToastProvider";
import "./globals.css";

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

export const SessionCookiesContext = createContext<string | undefined>(undefined);

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({ auth: false, user: usuarioEnMemoriaDefault });

    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen w-screen overflow-x-hidden`}>
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
                );
            </body>
        </html>
    );
}

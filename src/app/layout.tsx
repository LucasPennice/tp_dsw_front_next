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

const inter = Inter({ subsets: ["latin"] });

export const ReviewSheetContext = createContext<{ reviewModalOpen: boolean; setReviewModalOpen: Dispatch<SetStateAction<boolean>> }>({
    reviewModalOpen: false,
    setReviewModalOpen: () => {},
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <ReviewSheetContext.Provider value={{ reviewModalOpen, setReviewModalOpen }}>
                    <Navbar reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen} />
                    <main>
                        <ToastProvider>{children}</ToastProvider>
                    </main>
                    <Footer />
                    <MobileFloatingButton />
                </ReviewSheetContext.Provider>
            </body>
        </html>
    );
}

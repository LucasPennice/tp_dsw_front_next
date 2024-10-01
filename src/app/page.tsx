"use client";
import Link from "next/link";
import { useContext } from "react";
import { ReviewSheetContext, UserInfoContext } from "./layout";
import { useRouter } from "next/navigation";

export default function Home() {
    const { userInfo } = useContext(UserInfoContext);
    const { setReviewModalOpen } = useContext(ReviewSheetContext);
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            {/* <a href={"/profesor"}>Ir a lista profesores</a> */}
            <p className="text-3xl font-semibold text-gray-800 pt-8 pb-8">Hola {userInfo.user.username}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    className="col-span-full"
                    onClick={() => {
                        if (!userInfo.auth) {
                            router.push("/auth/login");
                        }
                        setReviewModalOpen(true);
                    }}>
                    <div className="relative h-72 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105">
                        {/* <img src="/placeholder.svg?height=192&width=768" alt="Crear Nueva Review" className="w-full h-full object-cover" /> */}
                        <div className="absolute inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center">
                            <h2 className="text-3xl text-center font-bold text-white">Crear Nueva Review</h2>
                        </div>
                    </div>
                </button>
                <Link href="/ano">
                    <div className="relative h-72 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105">
                        {/* <img src="/placeholder.svg?height=192&width=384" alt="Materias" className="w-full h-full object-cover" /> */}
                        <div className="absolute inset-0 bg-slate-400 bg-opacity-75 flex items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Materias</h2>
                        </div>
                    </div>
                </Link>
                <Link href="/profesor">
                    <div className="relative h-72 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105">
                        {/* <img src="/placeholder.svg?height=192&width=384" alt="Profesores" className="w-full h-full object-cover" /> */}
                        <div className="absolute inset-0 bg-slate-400 bg-opacity-75 flex items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Profesores</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

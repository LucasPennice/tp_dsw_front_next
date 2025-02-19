"use client";
import Link from "next/link";
import { useContext } from "react";
import { ReviewSheetContext, UserInfoContext } from "./layout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

export default function Home() {
    const { userInfo } = useContext(UserInfoContext);
    const { setReviewModalOpen } = useContext(ReviewSheetContext);
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            {userInfo.auth ? (
                <p className="text-3xl font-semibold text-gray-800 pt-8 pb-8">Hola {userInfo.user.username}</p>
            ) : (
                <p className="text-3xl font-semibold text-gray-800 pt-8 pb-8">Bienvenido</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    className="col-span-full"
                    onClick={() => {
                        if (!userInfo.auth) {
                            router.push("/auth/login");
                            toast.error(`Primero debes loguearte para ingresar una nueva review.`, {
                                autoClose: 6000,
                            });
                        }
                        setReviewModalOpen(true);
                    }}>
                    <div className="relative h-52 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                        {/* <img src="/placeholder.svg?height=192&width=768" alt="Crear Nueva Review" className="w-full h-full object-cover" /> */}
                        <div className="absolute inset-0 bg-slate-500 bg-opacity-75 flex items-center justify-center">
                            <Plus className="text-white text-2xl font-2xl" size={35} strokeWidth={2} />
                            <h2 className="text-2xl md:text-5xl font-medium text-center text-white">Crear Nueva Review</h2>
                        </div>
                    </div>
                </button>
                <Link href="/ano">
                    <div className="relative h-72 rounded-2xl border-4 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-slate-500">
                        <div className="absolute inset-0 bg-slate-50 rounded-lg p-6 flex items-center justify-center flex-col  ">
                            <p className="text-sm mb-1 text-gray-600">Ver reviews por</p>
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-slate-600 transition-colors duration-300">
                                Materias
                            </h2>
                        </div>
                    </div>
                </Link>
                <Link href="/profesor">
                    <div className="relative h-72 rounded-2xl border-4 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-slate-500">
                        <div className="absolute inset-0 bg-slate-50 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <p className="text-sm mb-1 text-gray-600">Ver reviews por</p>
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-slate-600 transition-colors duration-300">
                                Profesores
                            </h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

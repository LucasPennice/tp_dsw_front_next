"use client";

import { Plus } from "lucide-react";

//no estoy comprobando si el usuario está logueado antes de desplegar este btn en mobile.
// VERIFICAR !!!!!

export default function () {
    return (
        <button
            onClick={() => console.log("Nueva review creada desde botón flotante")}
            className="fixed bottom-4 right-4 flex items-center gap-3 px-3 py-3.5 bg-blue-400 border-solid border-2 border-slate-300 hover:bg-gray-50 text-white rounded-3xl shadow-lg transition-all duration-200 md:hidden"
            aria-label="Nueva Review">
            <Plus size={22} strokeWidth={2.5} />
            <span className="text-md font-medium">Nueva Review</span>
        </button>
    );
}

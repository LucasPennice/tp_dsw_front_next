import { Profesor } from "@/app/lib/definitions";
import { Star, CircleUser } from "lucide-react";
import Link from "next/link";

interface GridProfesor {
    profesores: Profesor[];
}

export default function GridProfesor({ profesores }: GridProfesor) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 py-4">
            {profesores.map((profesor) => (
                <Link
                    href={{
                        pathname: `/profesor/${profesor.id}`,
                    }}
                    className="transition-all duration-300 hover:shadow-lg hover:scale-105"
                    key={profesor.id}>
                    <div className="relative bg-white border-2 border-gray-200 rounded-lg p-4 text-slate-700 shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold">{profesor.nombre + " " + profesor.apellido}</h2>

                                <div className="flex items-center mt-3">
                                    <span className="mr-1">{parseFloat(profesor.puntuacionGeneral.toFixed(1))}</span>
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                            <div className="w-20 h-20 overflow-hidden rounded-full border-4 bg-transparent border-slate-700 shadow-lg">
                                <CircleUser className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

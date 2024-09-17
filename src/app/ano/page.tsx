"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function YearSelection() {
    // const params = useParams();

    // const idAno = params.idAno as string;

    const years = [
        {
            id: "1er",
            type: "1er Año",
        },
        {
            id: "2do",
            type: "2do Año",
        },
        {
            id: "3er",
            type: "3er Año",
        },
        {
            id: "4to",
            type: "4to Año",
        },
        {
            id: "5to",
            type: "5to Año",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver Atrás
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  gap-6">
                {years.map((year) => (
                    <Link key={year.id} href={`/ano/${year.id}`} className="group">
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 flex items-center justify-center h-32 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-lg group-hover:border-blue-500">
                            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                {year.type}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

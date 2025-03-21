"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { years } from "../lib/definitions";
import LinkBack from "../components/LinkBack";

export default function YearSelection() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <LinkBack route={`/`} />
            
            <div>
                <h2 className="text-4xl font-semibold text-gray-800 mb-8">Seleccione Un Año</h2>
            </div>
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

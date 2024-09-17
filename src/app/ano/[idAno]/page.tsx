"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

const subjects = [
    { name: "Diseño de Sistemas", area: "Área Sistemas", color: "bg-green-200", id: "a87k" },
    { name: "Diseño de Sistemas", area: "Área Sistemas", color: "bg-red-200", id: "a87k" },
    { name: "Diseño de Sistemas", area: "Área Sistemas", color: "bg-blue-200", id: "a87k" },
    { name: "Diseño de Sistemas", area: "Área Sistemas", color: "bg-yellow-200", id: "a87k" },
];

const BookIcon = () => (
    <svg
        className="w-12 h-12 mb-2 text-gray-600 opacity-50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
    </svg>
);

export default function SubjectsLayout() {
    const params = useParams();

    const idAno = params.idAno as string;

    const returnPath = `/ano`;

    const nextPath = ``;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <nav className="flex items-center justify-between mb-6">
                <Link href={returnPath} className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Materias
                </Link>
                <span className="text-gray-600">{idAno} Año</span>
            </nav>

            <h1 className="text-4xl font-bold text-gray-800 mb-8">Materias de {idAno} Año</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.map((subject, index) => (
                    <Link
                        href={`/ano/${idAno}/${subject.id}`}
                        key={index}
                        className={`${subject.color} rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                        <BookIcon />
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">{subject.name}</h2>
                        <p className="text-sm text-gray-600">{subject.area}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

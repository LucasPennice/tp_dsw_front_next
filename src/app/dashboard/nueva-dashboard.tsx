"use client";

import { useEffect, useState } from "react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, StarIcon } from "lucide-react";
//@ts-ignore
import { Profesor, Review } from "@/app/lib/definitions";
import { useParams } from "next/navigation";

enum Orden {
    todos = "Todos",
    mejorPuntuacion = "Mejor Puntuacion",
    peorPuntuacion = "Peor Puntuacion",
}

export default function Component() {
    const params = useParams();
    const idProfesor = params.idProfesor as string;

    const [data, setData] = useState<Review[]>([]);

    const [profesor, setProfesor] = useState<Profesor | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/${idProfesor}/reviews`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            });

        fetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/${idProfesor}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProfesor(data.data);
            });
    }, []);
    const [order, setOrder] = useState<Orden>(Orden.todos);

    const sortedReviews = data.toSorted((reviewA, reviewB) => {
        if (order === Orden.mejorPuntuacion) return reviewB.puntuacion - reviewA.puntuacion;
        if (order === Orden.peorPuntuacion) return reviewA.puntuacion - reviewB.puntuacion;

        return new Date(reviewB.fecha).getTime() - new Date(reviewA.fecha).getTime();
    });

    return (
        <div className="container mx-auto p-6 max-w-4xl px-4 py-8">
            <nav className="flex-col items-center justify-between mb-6">
                <span className="text-gray-600">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/profesor">Profesores</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/profesor/${idProfesor}`}>
                                    {profesor == null ? "Cargando..." : `${profesor.nombre} ${profesor.apellido}`}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </span>
            </nav>

            <h1 className="text-3xl font-bold mt-8 mb-4">
                {profesor == null ? "Cargando..." : `Reviews de ${profesor.nombre} ${profesor.apellido}`}
            </h1>

            <div className="flex gap-4 mb-8 flex-wrap">
                {/* @ts-ignore */}
                <Button variant={order === Orden.todos ? "default" : "outline"} onClick={() => setOrder(Orden.todos)}>
                    {Orden.todos}
                </Button>
                {/* @ts-ignore */}
                <Button variant={order === Orden.mejorPuntuacion ? "default" : "outline"} onClick={() => setOrder(Orden.mejorPuntuacion)}>
                    {Orden.mejorPuntuacion}
                </Button>
                {/* @ts-ignore */}
                <Button variant={order === Orden.peorPuntuacion ? "default" : "outline"} onClick={() => setOrder(Orden.peorPuntuacion)}>
                    {Orden.peorPuntuacion}
                </Button>
            </div>

            <div className="space-y-6">
                {sortedReviews.map((review) => (
                    <Card key={review.id}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold pb-1">{review.usuario.username}</h2>
                                    <h3 className="text-md font-medium opacity-30 pb-2">{review.cursado.materia.nombre}</h3>
                                    <div className="flex">
                                        <div className="flex items-center mt-1 gap-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        fill={i < review.puntuacion ? "orange" : "black"}
                                                        className={`w-5 h-5`}
                                                        color="#2563eb00"
                                                    />
                                                ))}
                                            </div>

                                            <h3 className="text-md font-medium opacity-50">{new Date(review.fecha).toLocaleDateString("es-ES")}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">{review.descripcion}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <Link href="/dashboard/materias">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                Materias
                            </h2>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/profesor">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                Profesores
                            </h2>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/area">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">Areas</h2>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/cursado">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                Cursados
                            </h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, StarIcon } from "lucide-react";
//@ts-ignore
import { Materia, Profesor, Review } from "@/app/lib/definitions";
import { URI } from "@/app/lib/utils";
import { useParams } from "next/navigation";

enum Orden {
    todos = "Todos",
    mejorPuntuacion = "Mejor Puntuacion",
    peorPuntuacion = "Peor Puntuacion",
}

export default function Component() {
    const params = useParams();
    const idAno = params.idAno as string;
    const idMateria = params.idMateria as string;
    const idProfesor = params.idProfesor as string;

    const [order, setOrder] = useState<Orden>(Orden.todos);

    const [data, setData] = useState<Review[]>([]);

    const [profesor, setProfesor] = useState<Profesor | null>(null);
    const [materia, setMateria] = useState<Materia | null>(null);

    useEffect(() => {
        fetch(`${URI}/api/profesor/${idProfesor}/reviewsDeMateria/${idMateria}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            });

        fetch(`${URI}/api/profesor/${idProfesor}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setProfesor(data.data);
            });

        fetch(`${URI}/api/materia/${idMateria}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setMateria(data.data);
            });
    }, []);

    const sortedReviews = data.toSorted((reviewA, reviewB) => {
        if (order === Orden.mejorPuntuacion) return reviewB.puntuacion - reviewA.puntuacion;
        if (order === Orden.peorPuntuacion) return reviewA.puntuacion - reviewB.puntuacion;

        return new Date(reviewB.fecha).getTime() - new Date(reviewA.fecha).getTime();
    });

    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/ano">Años</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/ano/${idAno}`}>Primero</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/ano/${idAno}/${idMateria}`}>{materia == null ? "Cargando..." : `${materia.nombre}`}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/ano/${idAno}/${idMateria}/${idProfesor}`}>
                            {profesor == null ? "Cargando..." : `${profesor.nombre} ${profesor.apellido}`}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> */}

            <nav className="flex items-center justify-between mb-6">
                <Link
                    href={`/ano/${idAno}/${idMateria}`}
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Volver Atrás
                </Link>
                <span className="text-gray-600">{idAno} Año</span>
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
                                    <h3 className="text-md font-medium opacity-30 pb-2">{materia?.nombre}</h3>
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
        </div>
    );
}

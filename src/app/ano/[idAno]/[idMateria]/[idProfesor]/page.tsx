"use client";

import { useState } from "react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    StarIcon,
    //@ts-ignore
} from "lucide-react";
//@ts-ignore
import { useParams, useRouter } from "next/navigation";
import { Cursado, Review, Sexo, UserRole, Usuario } from "@/app/lib/definitions";

const mockUsuario: Usuario = {
    id: " string",
    legajo: "string",
    nombre: "Peter",
    apellido: "Capusoto",
    username: "PeterCapusoto1029",
    fechaNacimiento: "19/01/1991",
    sexo: Sexo.Hombre,
    rol: UserRole.Regular,
    //@ts-ignore
    reviews: [],
    //@ts-ignore
    cursados: [],
};

const mockCursado = {
    id: "string",
    diaCursado: "string",
    horaCursado: "string",
    comision: 2,
    turno: "string",
    año: 12,
    materia: {
        nombre: "Analisis",
    },
};

// Sample review data
const reviews: [Review] = [
    {
        id: "1",
        usuario: mockUsuario,
        puntuacion: 5,
        //@ts-ignore
        cursado: mockCursado,
        descripcion: "Excellent product! Highly recommended.",
        fecha: new Date(),
    },
    {
        id: "2",
        usuario: mockUsuario,
        puntuacion: 4,
        //@ts-ignore
        cursado: mockCursado,
        descripcion: "Good quality, but a bit pricey.",
        helpful: 28,
        notHelpful: 5,
        fecha: new Date(),
    },
    {
        id: "3",
        usuario: mockUsuario,
        //@ts-ignore
        cursado: mockCursado,
        puntuacion: 3,
        descripcion: "Average product. Does the job.",
        helpful: 15,
        notHelpful: 7,
        fecha: new Date(),
    },
    {
        id: "4",
        usuario: mockUsuario,
        //@ts-ignore
        cursado: mockCursado,
        puntuacion: 5,
        descripcion: "Absolutely love it! Will buy again.",
        fecha: new Date(),
    },
    {
        id: "5",
        usuario: mockUsuario,
        //@ts-ignore
        cursado: mockCursado,
        puntuacion: 2,
        descripcion: "Disappointed. Not worth the price.",
        fecha: new Date(),
    },
];

enum Orden {
    todos = "Todos",
    mejorPuntuacion = "Mejor Puntuacion",
    peorPuntuacion = "Peor Puntuacion",
}

export default function Component() {
    const params = useParams();
    const router = useRouter();
    const idAno = params.idAno as string;
    const idMateria = params.idMateria as string;
    const idProfesor = params.idProfesor as string;

    const [order, setOrder] = useState<Orden>(Orden.todos);

    const sortedReviews = reviews.toSorted((reviewA, reviewB) => {
        if (order === Orden.mejorPuntuacion) return reviewB.puntuacion - reviewA.puntuacion;
        if (order === Orden.peorPuntuacion) return reviewA.puntuacion - reviewB.puntuacion;

        return reviewB.fecha.getTime() - reviewA.fecha.getTime();
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb>
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
                        <BreadcrumbLink href={`/ano/${idAno}/${idMateria}`}>Analisis Numerico</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/ano/${idAno}/${idMateria}/${idProfesor}`}>Sergio Quaroni</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-3xl font-bold mt-8 mb-4">Reviews de Sergio</h1>

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
                                    <h2 className="text-xl font-semibold pb-1">{mockUsuario.username}</h2>
                                    <h3 className="text-md font-medium opacity-30 pb-2">Analisis Numerico</h3>
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

                                            <h3 className="text-md font-medium opacity-50">19/02/1992</h3>
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

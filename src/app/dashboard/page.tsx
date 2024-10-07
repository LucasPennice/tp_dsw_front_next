"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { URI } from "@/app/lib/utils";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import ReviewCard from "../components/ReviewCard";
import { Review } from "../lib/definitions";

export default function Component() {
    const [data, setData] = useState<Review[] | []>([]);
    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch(`${URI}/api/review`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
                console.log(data.data);
            });
    }, []);

    if (!data) return <p>No hay reviews disponibles.</p>;

    const reviews = data ?? [];

    const deleteReview = async (_id: string) => {
        setLoading(true);

        await fetch(`${URI}/api/review/${_id}`, {
            method: "Delete",
        });

        toast.success("Review borrada exitosamente", {
            autoClose: 6000,
        });

        fetch(`${URI}/api/review`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 mb-16 pt-20 space-y-6">
                {/* <AnimatePresence> */}
                <h2 className="text-4xl mb-6 font-semibold">Dashboard</h2>
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
                                <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                    Areas
                                </h2>
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
            <div className="w-full  bg-slate-50 ">
                <div className="max-w-6xl mx-auto p-6 pb-16 space-y-6 bg-slate-20">
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "50vh",
                                width: "100vw",
                                maxWidth: "56rem",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}>
                            <Spinner as="span" animation="grow" variant="dark" role="status" aria-hidden="true" />
                        </motion.div>
                    )}
                    {!isLoading && (
                        <div>
                            <h2 className="text-4xl mb-6  mt-12 font-semibold">Reviews de Alumnos </h2>
                            <div className="space-y-6">
                                {reviews.map((review, idx) => (
                                    <ReviewCard review={review} key={review.id} idx={idx} deleteReview={deleteReview} />
                                ))}
                            </div>
                        </div>
                    )}
                    {/* </AnimatePresence> */}
                </div>
            </div>
        </>
    );
}

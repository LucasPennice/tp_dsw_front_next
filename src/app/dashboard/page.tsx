"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import ReviewCard from "../components/ReviewCard";
import { Review } from "../lib/definitions";

export default function Component() {
    const [data, setData] = useState<Review[] | []>([]);
    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URI}/api/review?page=${pageNumber}&limit=6`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
                setTotalPages(data.totalPages);
            });
    }, [pageNumber]);

    if (!data) return <p>No hay reviews disponibles.</p>;

    const reviews = data ?? [];

    const deleteReview = async (_id: string) => {
        setLoading(true);

        await fetch(`${process.env.NEXT_PUBLIC_URI}/api/review/${_id}`, {
            method: "Delete",
            credentials: "include",
        });

        toast.success("Review borrada exitosamente", {
            autoClose: 6000,
        });

        fetch(`${process.env.NEXT_PUBLIC_URI}/api/review?page=${pageNumber}&limit=6`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
                setTotalPages(data.totalPages);
            });
    };

    const handlePageChange = (page: number) => {
        setPageNumber(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        // consideramos que nunca vamos a tener más de 5 páginas

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}
                        className="hover:cursor-pointer"
                        isActive={pageNumber === i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pageNumbers;
    };

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 mb-16 pt-20 space-y-6">
                {/* <AnimatePresence> */}
                <h2 className="text-4xl mb-6 font-semibold">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <h2 className="text-4xl mb-6  mt-12 font-semibold">Reviews de Alumnos </h2>
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
                            <div className="space-y-6">
                                {reviews.map((review, idx) => (
                                    <ReviewCard review={review} key={review.id} idx={idx} deleteReview={deleteReview} />
                                ))}
                            </div>
                        </div>
                    )}
                    {/* </AnimatePresence> */}
                </div>
                <div className="w-full max-w-4xl mx-auto p-4">
                    <Pagination className="mt-1">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPageNumber((prevPageNumber) => prevPageNumber - 1);
                                    }}
                                    className={pageNumber === 1 ? "pointer-events-none opacity-50" : "hover:cursor-pointer"}
                                />
                            </PaginationItem>
                            {renderPageNumbers()}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => {
                                        // e.preventDefault();
                                        setPageNumber((prevPageNumber) => prevPageNumber + 1);
                                    }}
                                    className={pageNumber === totalPages ? "pointer-events-none opacity-50" : "hover:cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ProfesorCard from "../../components/ProfesorCard";
import { PAGINATION_LIMIT, Profesor } from "../../lib/definitions";
import { ArrowLeft, Plus } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import LinkBack from "@/app/components/LinkBack";

export default function Page() {
    const [data, setData] = useState<Profesor[]>([]);
    const [isLoading, setLoading] = useState(true);

    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/conBorrado?page=${pageNumber}&limit=${PAGINATION_LIMIT}`, {
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

    if (!data) return <p>No profile data</p>;

    const profesores = data ?? [];

    const deleteProfesor = async (_id: string) => {
        setLoading(true);

        await fetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/${_id}`, {
            method: "Delete",
            credentials: "include",
        });

        toast.success("Profesor borrado exitosamente", {
            autoClose: 6000,
        });

        fetch(`${process.env.NEXT_PUBLIC_URI}/api/profesor/conBorrado?page=${pageNumber}&limit=${PAGINATION_LIMIT}`, {
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
        <div className="max-w-6xl mx-auto p-6 mb-14 space-y-6">
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            width: "100vw",
                            maxWidth: "56rem",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}>
                        <Spinner as="span" animation="grow" variant="dark" role="status" aria-hidden="true" />
                    </motion.div>
                )}

                {!isLoading && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex flex-row justify-between">
                            <LinkBack route="/dashboard"></LinkBack>
                            <div className="button-container">
                                <Link
                                    href={`/dashboard/profesor/add`}
                                    className="btn bg-blue-500 text-slate-50 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-102 hover:text-stale-800 hover:shadow-sm hover:border-slate-200">
                                    <Plus />
                                    Nuevo Profesor
                                </Link>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-4xl font-semibold text-gray-800 mb-8">Profesores</h2>
                        </div>

                        <Table className="table mt-4" borderless hover>
                            <thead>
                                <tr>
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Fecha Nac</th>
                                    {/* <th scope="col">DNI</th> */}
                                    {/* <th scope="col">Puntuacion General</th> */}
                                    {/* <th scope="col">Sexo</th> */}
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {profesores.map((profesor, idx) => (
                                    <ProfesorCard profesor={profesor} key={profesor.id} idx={idx} deleteProfesor={deleteProfesor} />
                                ))}
                            </tbody>
                        </Table>

                        <div className="w-full max-w-4xl mx-auto p-4">
                            <Pagination className="mt-4">
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
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

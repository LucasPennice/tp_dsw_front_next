"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Area, PAGINATION_LIMIT } from "../../lib/definitions";
import AreaCard from "@/app/components/AreaCard";
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
import { appFetch, useFetchForGet } from "@/app/hooks/useFetch";

export default function Page() {
    const [data, setData] = useState<Area[]>([]);
    const [isLoading, setLoading] = useState(true);

    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        appFetch(`${process.env.NEXT_PUBLIC_URI}/api/area/conBorrado?page=${pageNumber}&limit=${PAGINATION_LIMIT}`)
            .then((data) => {
                setData(data.data);
                setLoading(false);
                setTotalPages(data.totalPages!);
            });
    }, [pageNumber]);

    if (!data) return <p>No profile data</p>;

    const areas = data ?? [];

    const deleteArea = async (_id: string) => {
        setLoading(true);

        await appFetch(`${process.env.NEXT_PUBLIC_URI}/api/area/${_id}`, {
            method: "Delete",
        });

        toast.success("Area borrada exitosamente", {
            autoClose: 6000,
        });

        appFetch(`${process.env.NEXT_PUBLIC_URI}/api/area/conBorrado?page=${pageNumber}&limit=${PAGINATION_LIMIT}`)
            .then((data) => {
                setLoading(false);
                setData(data.data);
                setTotalPages(data.totalPages!);
            });
    };

    const handlePageChange = (page: number) => {
        setPageNumber(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

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
                        <div className="flex flex-col items-start md:flex-row  justify-start md:justify-between">
                            <LinkBack route="/dashboard"></LinkBack>
                            <div className="button-container">
                                <Link
                                    href={`area/add`}
                                    className="btn bg-blue-400 text-slate-50 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-sm hover:text-slate-700 hover:border-slate-200">
                                    <Plus />
                                    Nueva Area
                                </Link>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-4xl font-semibold text-gray-800 mb-8">Áreas</h2>
                        </div>
                        <Table className="table mt-4" borderless hover>
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {areas.map((area, idx) => (
                                    <AreaCard area={area} key={area.id} idx={idx} deleteArea={deleteArea} />
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

"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Materia } from "../../lib/definitions";
import { URI } from "@/app/lib/utils";
import { ArrowLeft, Plus } from "lucide-react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page() {
    const [data, setData] = useState<Materia[]>([]);
    const [isLoading, setLoading] = useState(true);

    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`${URI}/api/materia/conBorrado?page=${pageNumber}&limit=7`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
                setTotalPages(data.totalPages);
            });
    }, [pageNumber]);

    if (!data) return <p>No hay materias</p>;

    const materias = data ?? [];

    const deleteMateria = async (_id: string) => {
        setLoading(false);

        await fetch(`${URI}/api/materia/${_id}`, {
            method: "Delete",
        });

        toast.success("Materia borrada exitosamente", {
            autoClose: 6000,
        });

        fetch(`${URI}/api/materia/conBorrado`, {
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
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Volver Atrás
                            </Link>
                            <div className="button-container">
                                <Link
                                    href={`materias/add`}
                                    className="btn bg-blue-400 text-slate-50 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-102 hover:text-stale-800 hover:shadow-sm hover:border-slate-200">
                                    <Plus />
                                    Nueva Materia
                                </Link>
                            </div>
                        </div>

                        <Table className="table mt-4" borderless hover>
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Area</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider gap-4">
                                {materias.map((materia, idx) => (
                                    <MateriaCard materia={materia} key={materia.id} idx={idx} deleteMateria={deleteMateria} />
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

function MateriaCard({ materia, deleteMateria, idx }: { materia: Materia; deleteMateria: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    function toggleModal() {
        isModalOpen ? setModalOpen(false) : setModalOpen(true);
    }

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td style={{ color: materia.borradoLogico ? "red" : "black" }}>{materia.nombre}</td>
            <td style={{ color: materia.borradoLogico ? "red" : "black" }}>{materia.area.nombre}</td>
            <td className="text-right">
                <Link
                    href={{
                        pathname: `/dashboard/materias/edit/${materia.id}`,
                        query: {
                            id: materia.id,
                            nombre: materia.nombre,
                        },
                    }}
                    className="btn btn-outline-dark cus-mr-10">
                    Edit
                </Link>
                {
                    <motion.div
                        animate={{ width: isLoading ? 50 : 85 }}
                        className={`btn cus-mr-10 transition-all ${materia.borradoLogico == false ? "btn-outline-danger" : "bg-gray-200 text-gray-300"} `}
                        onClick={async () => {
                            if (materia.borradoLogico == true) {
                                toast.error(`La materia ya fue eliminada`, {
                                    autoClose: 5000,
                                });
                                return;
                            }
                            if (isLoading) return;

                            toggleModal();

                            // setLoading(true);
                            // await deleteMateria(materia.id);
                        }}>
                        {isModalOpen && (
                            <ConfirmDeleteModal itemId={materia.id} itemName={materia.nombre} key={materia.id} idx={idx} deleteItem={deleteMateria} />
                        )}
                        {isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Spinner animation="border" size="sm" />
                            </motion.div>
                        )}
                        {!isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Delete
                            </motion.div>
                        )}
                    </motion.div>
                }
            </td>
        </motion.tr>
    );
}

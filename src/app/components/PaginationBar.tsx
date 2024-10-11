"use client";

import { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

// Datos de ejemplo
const items = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Descripción del item ${i + 1}`,
}));

const itemsPerPage = 10;

export default function NavegadorConPaginacion() {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            isActive={currentPage === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (startPage > 1) {
                pageNumbers.push(
                    <PaginationItem key={1}>
                        <PaginationLink
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(1);
                            }}>
                            1
                        </PaginationLink>
                    </PaginationItem>
                );
                if (startPage > 2) {
                    pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            isActive={currentPage === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pageNumbers.push(<PaginationEllipsis key="ellipsis-end" />);
                }
                pageNumbers.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(totalPages);
                            }}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(Math.max(1, currentPage - 1));
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem>
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(Math.min(totalPages, currentPage + 1));
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

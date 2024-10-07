"use client";
import { motion } from "framer-motion";
import Link from "next/link.js";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Area, Materia } from "../lib/definitions.js";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function ConfirmDeleteModal({
    itemId,
    itemName,
    deleteItem,
    idx,
}: {
    itemId: string;
    itemName: string;
    deleteItem: (_id: string) => Promise<void>;
    idx: number;
}) {
    const [isOpen, setIsOpen] = useState(true);

    const handleYes = async () => {
        await deleteItem(itemId);
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="bottom" className="h-[40%] sm:h-[30%]">
                <SheetHeader>
                    <SheetDescription className="sm:text-xl">Usted está a punto de eliminar {itemName}</SheetDescription>
                    <SheetTitle className="sm:text-2xl">¿Desea continuar?</SheetTitle>
                </SheetHeader>
                <SheetFooter className="sm:flex-row sm:justify-center sm:space-x-2 mt-8">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        No
                    </Button>
                    <Button onClick={handleYes}>Sí</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

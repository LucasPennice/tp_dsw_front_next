import { motion } from "framer-motion";
import Link from "next/link.js";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Area } from "../lib/definitions.js";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { Pencil, Trash2 } from "lucide-react";

function AreaCard({ area, deleteArea, idx }: { area: Area; deleteArea: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    function toggleModal() {
        isModalOpen ? setModalOpen(false) : setModalOpen(true);
    }

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td style={{ color: area.borradoLogico ? "red" : "black" }}>{area.nombre}</td>
            <td className="text-right">
                <Link
                    href={{
                        pathname: `/dashboard/area/edit/${area.id}`,
                        query: {
                            name: area.nombre,
                        },
                    }}
                    className="btn btn-outline-dark mb-2 cus-mr-10">
                    <Pencil className="h-4 w-4" />

                </Link>
                <motion.div
                    animate={{ width: isLoading ? 50 : 45 }}
                    className={`btn cus-mr-10 mb-2 transition-all ${area.borradoLogico == false ? "btn-outline-danger" : "bg-gray-200 text-gray-300"}`}
                    onClick={async () => {
                        if (area.borradoLogico == true) {
                            toast.error(`El área ya fue eliminada anteriormente`, {
                                autoClose: 5000,
                            });
                            return;
                        }
                        if (isLoading) return;
                        toggleModal();
                    }}>
                    {isModalOpen && <ConfirmDeleteModal itemId={area.id} itemName={area.nombre} key={area.id} idx={idx} deleteItem={deleteArea} />}
                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Spinner animation="border" size="sm" />
                        </motion.div>
                    )}
                    {!isLoading && (
                        <motion.div className="d-flex justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Trash2 className="h-4 w-4" />
                        </motion.div>
                    )}
                </motion.div>
            </td>
        </motion.tr>
    );
}

export default AreaCard;

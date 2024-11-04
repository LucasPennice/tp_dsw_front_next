import { motion } from "framer-motion";
import Link from "next/link.js";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Profesor } from "../lib/definitions.js";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function ProfesorCard({ profesor, deleteProfesor, idx }: { profesor: Profesor; deleteProfesor: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    function toggleModal() {
        isModalOpen ? setModalOpen(false) : setModalOpen(true);
    }

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.nombre}</td>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.apellido}</td>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.fechaNacimiento.toString().split("T")[0]}</td>
            {/* <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.dni}</td> */}
            {/* <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{parseFloat(profesor.puntuacionGeneral.toFixed(1))}/5</td> */}
            {/* <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.sexo}</td> */}
            <td>
                <Link
                    href={{
                        pathname: `/dashboard/profesor/edit/${profesor.id}`,
                        query: {
                            nombre: profesor.nombre,
                            apellido: profesor.apellido,
                            dni: profesor.dni,
                            sexo: profesor.sexo,
                            dia: profesor.fechaNacimiento.toString().split("T")[0].split("-")[2],
                            mes: profesor.fechaNacimiento.toString().split("T")[0].split("-")[1],
                            year: profesor.fechaNacimiento.toString().split("T")[0].split("-")[0],
                        },
                    }}
                    className="btn btn-outline-dark mb-2 cus-mr-10">
                    Edit
                </Link>
                <motion.div
                    animate={{ width: isLoading ? 50 : 85 }}
                    className={`btn cus-mr-10 mb-2 transition-all ${profesor.borradoLogico == false ? "btn-outline-danger" : "bg-gray-200 text-gray-300"} `}
                    onClick={async () => {
                        if (profesor.borradoLogico == true) {
                            toast.error(`La profesor ya se encuentra eliminado.`, {
                                autoClose: 5000,
                            });
                            return;
                        }
                        if (isLoading) return;

                        toggleModal();

                        // setLoading(true);
                        // await deleteProfesor(profesor.id);
                    }}>
                    {isModalOpen && (
                        <ConfirmDeleteModal
                            itemId={profesor.id}
                            itemName={`${profesor.nombre} ${profesor.apellido}`}
                            key={profesor.id}
                            idx={idx}
                            deleteItem={deleteProfesor}
                        />
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
            </td>
        </motion.tr>
    );
}

export default ProfesorCard;

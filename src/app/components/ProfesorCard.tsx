import { motion } from "framer-motion";
import Link from "next/link.js";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Profesor } from "../lib/definitions.js";

function ProfesorCard({ profesor, deleteProfesor, idx }: { profesor: Profesor; deleteProfesor: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.nombre}</td>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.apellido}</td>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.fechaNacimiento.toString().split("T")[0]}</td>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.dni}</td>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.puntuacionGeneral}/5</td>
            <td style={{ color: profesor.borradoLogico ? "red" : "black" }}>{profesor.sexo}</td>
            <td>
                <Link
                    href={{
                        pathname: `/CRUD/profesor/edit/${profesor.id}`,
                        query: {
                            name: profesor.nombre,
                            apellido: profesor.apellido,
                        },
                    }}
                    className="btn btn-warning cus-mr-10">
                    Edit
                </Link>
                <motion.div
                    animate={{ width: isLoading ? 50 : 85 }}
                    className={`btn cus-mr-10 transition-all ${profesor.borradoLogico == false ? "btn-danger" : "bg-gray-200 text-gray-300"} `}
                    onClick={async () => {
                        if (profesor.borradoLogico == true) return;

                        if (isLoading) return;

                        setLoading(true);
                        await deleteProfesor(profesor.id);
                    }}>
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

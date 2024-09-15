import { motion } from "framer-motion";
import Link from "next/link.js";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Profesor } from "../lib/definitions.js";

function ProfesorCard({ profesor, deleteProfesor, idx }: { profesor: Profesor; deleteProfesor: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td>{profesor.nombre}</td>
            <td>{profesor.apellido}</td>
            <td>{profesor.fechaNacimiento.toString().split("T")[0]}</td>
            <td>{profesor.dni}</td>
            <td>
                <ul className="remove-points">
                    {profesor.cursados.map((cursado) => (
                        <li key={profesor.id + cursado}>{cursado.materia.nombre}</li>
                    ))}
                </ul>
            </td>
            <td>{profesor.puntuacionGeneral}/5</td>
            <td>{profesor.sexo}</td>
            <td>
                <Link
                    href={{
                        pathname: `/profesor/edit/${profesor.id}`,
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
                    className="btn btn-danger cus-mr-10 transition-all"
                    onClick={async () => {
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

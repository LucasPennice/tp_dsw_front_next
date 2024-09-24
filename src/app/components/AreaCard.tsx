import { motion } from "framer-motion";
import Link from "next/link.js";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Area } from "../lib/definitions.js";

function AreaCard({ area, deleteArea, idx }: { area: Area; deleteArea: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <motion.tr initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx / 15, type: "spring", stiffness: 100 }}>
            <td style={{ color: area.borradoLogico ? "red" : "black" }}>{area.id}</td>
            <td style={{ color: area.borradoLogico ? "red" : "black" }}>{area.nombre}</td>
            <td>
                <Link
                    href={{
                        pathname: `/CRUD/area/edit/${area.id}`,
                        query: {
                            name: area.nombre,
                        },
                    }}
                    className="btn btn-warning cus-mr-10">
                    Edit
                </Link>
                <motion.div
                    animate={{ width: isLoading ? 50 : 85 }}
                    className={`btn cus-mr-10 transition-all ${area.borradoLogico == false ? "btn-danger" : "bg-gray-200 text-gray-300"}`}
                    onClick={async () => {
                        if (area.borradoLogico == true) return;
                        if (isLoading) return;

                        setLoading(true);
                        await deleteArea(area.id);
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

export default AreaCard;

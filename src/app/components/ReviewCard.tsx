import { motion } from "framer-motion";
import Link from "next/link.js";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Area, Review } from "../lib/definitions.js";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

function ReviewCard({ review, deleteReview, idx }: { review: Review; deleteReview: (_id: string) => Promise<void>; idx: number }) {
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    function toggleModal() {
        isModalOpen ? setModalOpen(false) : setModalOpen(true);
    }

    return (
        <Card key={review.id}>
            <CardContent className="p-4 md:p-6 ">
                <div>
                    <div className="flex flex-row justify-between mb-4">
                        <h2 className="text-xl font-semibold pb-1">
                            {review.usuario.username}{" "}
                            <span className="text-gray-400 font-light text-sm">
                                - Review destinada a {review.cursado.profesor.nombre} {review.cursado.profesor.apellido}
                            </span>
                        </h2>
                        <div>
                            <button
                                className="btn  transition-all bg-red-600 text-slate-50 hover:bg-red-300"
                                onClick={async () => {
                                    toggleModal();
                                }}>
                                Eliminar
                            </button>
                        </div>
                        {isModalOpen && (
                            <ConfirmDeleteModal
                                itemId={review.id}
                                itemName={`la review hecha por el usuario ${review.usuario.username}`}
                                key={review.id}
                                idx={idx}
                                deleteItem={deleteReview}
                            />
                        )}
                    </div>
                    <h3 className="text-md font-medium opacity-30 pb-2">{review.cursado.materia.nombre}</h3>
                    <div className="flex">
                        <div className="flex items-center mt-1 gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} fill={i < review.puntuacion ? "orange" : "black"} className={`w-5 h-5`} color="#2563eb00" />
                                ))}
                            </div>

                            <h3 className="text-md font-medium opacity-50">{new Date(review.fecha).toLocaleDateString("es-ES")}</h3>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-gray-600">{review.descripcion}</p>
            </CardContent>
        </Card>
    );
}

export default ReviewCard;

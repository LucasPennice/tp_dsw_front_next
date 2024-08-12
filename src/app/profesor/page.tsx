"use client"
import { useState } from "react";
import { Profesor, Sexo, Response} from "../lib/definitions"
import { FaStar } from "react-icons/fa";

export default async function Page() {
    const [loading, setLoading] = useState(true)

    const res = await fetch("https://tp-dsw-back.onrender.com/api/profesor")
    
    const response = await res.json() as Response<Profesor[]>

    const profesores = response.data ?? []

    return <div className="max-w-5xl flex flex-col items-center justify-center gap-4 p-4">
        {profesores.map((profesor)=>{
            return (
                <div className="bg-gray-900 w-[800px] p-4 rounded-2xl" key={profesor._id}>
                    <div className="flex items-baseline gap-4">
                        <p className="text-2xl">{profesor.nombre} {profesor.apellido}</p>
                        <p>({profesor.sexo === Sexo.Hombre ? "H" : "M"})</p>

                        <div className="flex-1"></div>

                        <p>DNI: {profesor.dni}</p>
                    </div>
                    
                    <div className="flex justify-between">
                        <div className="flex justify-between">
                            <div className="flex">{Array.from(Array(5).keys()).map((i,idx)=>{
                                let color = i < profesor.puntuacionGeneral ?  "gold" : "gray"
                                return <FaStar color={color} key={idx}/>
                            })}</div>
                        </div>

                        <p>{profesor.fechaNacimiento}</p>
                    </div>

                    <div className="flex gap-4 flex-wrap pt-4">    
                        {profesor.cargos.map((cargo,idx) =>{
                            return <p className="text-md bg-gray-700 px-4 py-1 rounded-full" key={idx}>{cargo}</p>
                        })}
                    </div>

                </div>
       ) })}
    </div>
}

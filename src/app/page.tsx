import Image from "next/image";

import { useEffect } from "react";
import { Profesor, Sexo } from "./lib/definitions";
import { FaStar } from "react-icons/fa";
import Link from "next/link.js";




export default function Home() {
  
  const mock1 : Profesor = {
    _id: "qwdqd",
    nombre: "Profesor",
    apellido: "Mariano",
    fechaNacimiento: "12/07/1923",
    dni: 12321123,
    cargos: ["Analisis Numerico I", "Analisis Numerico II"],
    horariosDeClase: [],
    puntuacionGeneral: 2,
    sexo: Sexo.Hombre
}

const mock2 : Profesor = {
    _id: "qwdqdaaa",
    nombre: "Software",
    apellido: "Mariano",
    fechaNacimiento: "22/07/1956",
    dni: 12321123,
    cargos: ["Dev 1", "Algo y DS"],
    horariosDeClase: [],
    puntuacionGeneral: 3,
    sexo: Sexo.Mujer
}

const profesores : Profesor[] = [mock1, mock2]

  return (<div className="max-w-5xl flex flex-col items-center justify-center gap-4 p-4">
    <p className="text-3xl">El servidor de backend tarda aprox 50 segundos en arrancar. El getAll esta hecho en este link pero se ve asi</p>

    <Link href={"/profesor"} >Ir a lista profesores</Link>

    {profesores.map((profesor)=>{
            return <div className="bg-gray-900 w-[800px] p-4 rounded-2xl" key={profesor._id}>
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
        })}
</div>
  );
}

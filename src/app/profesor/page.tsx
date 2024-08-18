'use client'

import Link from "next/link";
import { Profesor, Sexo, Response} from "../lib/definitions"

export default async function Page() {


    const res = await fetch("https://tp-dsw-back.onrender.com/api/profesor", {
        headers: {
            'Content-Type': 'application/json'
          }
    })

    const response = await res.json() as Response<Profesor[]>

    const profesores = response.data ?? []

    console.log(profesores)

    return (
    <section>
       <table className="table">
            <thead>
                <tr>
                    {/* <th scope="col">ID</th> */}
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Fecha Nac</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Cursadas</th>
                    <th scope="col">Puntuacion General</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                
                    {profesores.map((profesor)=>{
                    return( 
                        <>
                            <tr  key={profesor.id}>
                                <td>{profesor.nombre}</td>
                                <td>{profesor.apellido}</td>
                                <td>{profesor.fechaNacimiento.split('T')[0]}</td>
                                <td>{profesor.dni}</td>
                                <td>
                                    <ul className="remove-points">{profesor.cursadas.map((cursada) => <li key={profesor.id + cursada}>{cursada}</li>)}
                                    </ul>
                                </td>
                                <td>{profesor.puntuacionGeneral}/5</td>
                                <td>{profesor.sexo}</td>
                                <td>
                                    <Link href={`/profesor/edit/${profesor.id}`} className="btn btn-warning cus-mr-10">
                                        Edit
                                    </Link>
                                    <Link href={`/profesor/delete/${profesor.id}`} className="btn btn-danger cus-mr-10">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        </>

                    )})}
            </tbody>
            </table>
            <div className="button-container">
                <Link href={`/profesor/add`} className="btn btn-primary">
                    Add
                </Link>
            </div>
        
    </section>)
    // return <div className="max-w-5xl flex flex-col items-center justify-center gap-4 p-4">
    //     {profesores.map((profesor)=>{
    //         return (
    //             <div className="bg-gray-900 w-[800px] p-4 rounded-2xl" key={profesor.id}>
    //                 <div className="flex items-baseline gap-4">
    //                     <p className="text-2xl">{profesor.nombre} {profesor.apellido}</p>
    //                     <p>({profesor.sexo === Sexo.Hombre ? "H" : "M"})</p>

    //                     <div className="flex-1"></div>

    //                     <p>DNI: {profesor.dni}</p>
    //                 </div>
                    
    //                 <div className="flex justify-between">
    //                     <div className="flex justify-between">
    //                         <div className="flex">{Array.from(Array(5).keys()).map((i,idx)=>{
    //                             let color = i < profesor.puntuacionGeneral ?  "gold" : "gray"
    //                             return <FaStar color={color} key={idx}/>
    //                         })}</div>
    //                     </div>

    //                     <p>{profesor.fechaNacimiento}</p>
    //                 </div>

    //                 <div className="flex gap-4 flex-wrap pt-4">    
    //                     {profesor.cargos.map((cargo,idx) =>{
    //                         return <p className="text-md bg-gray-700 px-4 py-1 rounded-full" key={idx}>{cargo}</p>
    //                     })}
    //                 </div>

    //             </div>
    //    ) })}
    // </div>
}

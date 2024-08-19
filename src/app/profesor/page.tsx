"use client";

import Link from "next/link";
import { Profesor, Sexo, Response } from "../lib/definitions";
import { useEffect, useState } from "react";
import React from "react";

export default function Page() {
  const [data, setData] = useState<Profesor[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tp-dsw-back.onrender.com/api/profesor", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  const profesores = data ?? [];

  console.log(profesores);

  const deleteProfesor = async (_id: string) => {
    await fetch(`https://tp-dsw-back.onrender.com/api/profesor/${_id}`, {
      method: "Delete",
    });
    fetch("https://tp-dsw-back.onrender.com/api/profesor", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  };

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
            <th scope="col">Cursados</th>
            <th scope="col">Puntuacion General</th>
            <th scope="col">Sexo</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {profesores.map((profesor) => {
            return (
              <React.Fragment key={profesor.id}>
                <tr>
                  <td>{profesor.nombre}</td>
                  <td>{profesor.apellido}</td>
                  <td>{profesor.fechaNacimiento.toString()}</td>
                  <td>{profesor.dni}</td>
                  <td>
                    <ul className="remove-points">
                      {profesor.cursados.map((cursado) => (
                        <li key={profesor.id + cursado}>
                          {cursado.materia.nombre}
                        </li>
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
                      className="btn btn-warning cus-mr-10"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger cus-mr-10"
                      onClick={() => {
                        deleteProfesor(profesor.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="button-container">
        <Link href={`/profesor/add`} className="btn btn-primary">
          Add
        </Link>
      </div>
    </section>
  );
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

'use client'

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const params = useParams();
  const router = useRouter();

  const _id = params.id as string;


  const editProfesor = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`https://tp-dsw-back.onrender.com/api/profesor/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
        }),
      });

      if (response.ok) {
        alert('Profesor modificado correctamente');
        router.push("/profesor");
      } else {
        alert('Error al modificar el profesor');
        router.push("/profesor");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error inesperado.');
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          editProfesor(_id);
        }}>
          <div className="form-group mb-5 pt-5">
            <label htmlFor="formGroupExampleInput">Nombre</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput" 
              placeholder="Example input" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="formGroupExampleInput2">Apellido</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput2" 
              placeholder="Another input" 
              value={apellido} 
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary cus-mr-10">Aceptar</button>
        </form>
      </div>
    </>
  );
}
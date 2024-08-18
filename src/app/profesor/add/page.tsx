'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [cargos, setCargos] = useState('');
  const [horarios, setHorarios] = useState('');
  const [puntuacion, setPuntuacion] = useState('');
  const [sexo, setSexo] = useState('');

  const router = useRouter();

  const addProfesor = async (): Promise<void> => {
    try {
      const response = await fetch(`https://tp-dsw-back.onrender.com/api/profesor/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },

        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          fechaNacimiento: nacimiento,
          dni: dni,
          cargos: cargos,
          horariosDeClase: horarios,
          puntuacionGeneral: puntuacion,
          sexo: sexo
        }),
      });

      if (response.ok) {
        alert('Profesor agregado correctamente');
        router.push("/profesor");
      } else {
        alert('Error al agregar el profesor');
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
          addProfesor();
        }}>
          <div className="form-group mb-2 pt-5">
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
          <div className="form-group mb-2">
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
          <div className="form-group mb-2">
            <label htmlFor="formGroupExampleInput2">Fecha Nacimiento</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput2" 
              placeholder="Another input" 
              value={nacimiento} 
              onChange={(e) => setNacimiento(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="formGroupExampleInput2">DNI</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput2" 
              placeholder="Another input" 
              value={dni} 
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="formGroupExampleInput2">Cargos</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput2" 
              placeholder="Another input" 
              value={cargos} 
              onChange={(e) => setCargos(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="formGroupExampleInput2">Horarios</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput2" 
              placeholder="Another input" 
              value={horarios} 
              onChange={(e) => setHorarios(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="formGroupExampleInput2">Puntuacion</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput2" 
              placeholder="Another input" 
              value={puntuacion} 
              onChange={(e) => setPuntuacion(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="formGroupExampleInput2">Sexo</label>
            <input 
              type="text" 
              className="form-control mt-2 custom-select" 
              id="formGroupExampleInput2" 
              placeholder="Another input" 
              value={sexo} 
              onChange={(e) => setSexo(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary cus-mr-10">Aceptar</button>
        </form>
      </div>
    </>
  );
}
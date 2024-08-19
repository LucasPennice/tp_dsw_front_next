'use client'

import { Sexo } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';


export default function Page() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [sexo, setSexo] = useState('');

  const [dia,setDia] = useState("")
  const [mes,setMes] = useState("")
  const [year,setYear] = useState("")

const limitTo = (n: number, old:string,newS:string) => {
  if (newS.length > n ){
return old
}else{
return newS
}
}

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
          fechaNacimiento: `${dia}/${mes}/${year}`,
          dni: dni,
          puntuacionGeneral: 0,
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
              placeholder="Nombre" 
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
              placeholder="Apellido" 
              value={apellido} 
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <InputGroup className="mb-3">
            <InputGroup.Text>Fecha Nacimiento</InputGroup.Text>
            <Form.Control placeholder ="DD" value={dia} onChange={t => {setDia((t.target.value))
            }} />
            <Form.Control placeholder ="MM" value={mes} onChange={t => {setMes(t.target.value)}} />
            <Form.Control placeholder ="AAAA" value={year} onChange={t => {setYear(t.target.value)}}/>
          </InputGroup>

          <div className="form-group mb-2">
            <label htmlFor="formGroupExampleInput2">DNI</label>
            <input 
              type="text" 
              className="form-control mt-2" 
              id="formGroupExampleInput2" 
              placeholder="DNI" 
              value={dni} 
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
          
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {sexo == "" ? "Sexo" : sexo}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={()=>setSexo(Sexo.Hombre)}>Hombre</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={()=>setSexo(Sexo.Mujer)}>Mujer</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>


          <button type="submit" className="btn btn-primary cus-mr-10">Aceptar</button>
        </form>
      </div>
    </>
  );
}
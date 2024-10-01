import { Turnos } from "./definitions";

export const dateFromString = (input: string): Date => {
    const [day, month, year] = input.split("/").map(Number);

    // Months are 0-indexed in JavaScript Date object
    return new Date(year, month - 1, day);
};

function validarHora(hora: string): boolean {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(hora);
}

function validarDiaSemana(dia: string): boolean {
    const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    return diasSemana.includes(dia.toLowerCase());
}

function validarAnio(anio: string): boolean {
    const regex = /^(2000|[1-9][0-9]{3})$/;
    return regex.test(anio);
}

function validarComision(cadena: string): boolean {
    const regex = /^\d{3}$/;
    return regex.test(cadena);
}

function validarLegajo(cadena: string): boolean {
    const regex = /^\d{5}$/;
    return regex.test(cadena);
}

function validarNombreOApellido(cadena: string): boolean {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(cadena);
}

function validarTurno(turno: string, horarioInicio: string, horarioFin: string): boolean {
    if (!validarHora(horarioInicio) || !validarHora(horarioFin)) return false;

    if (turno == Turnos.Manana && horarioFin < "12:00") return true;
    if (turno == Turnos.Tarde && horarioInicio >= "12:00" && horarioFin < "18:00") return true;
    if (turno == Turnos.Noche && horarioInicio >= "18:00" && horarioFin < "24:00") return true;

    return false;
}

// const URI = "https://tp-dsw-back.onrender.com";
const URI = "http://localhost:3000";

export { validarAnio, validarComision, validarDiaSemana, validarHora, validarTurno, URI, validarLegajo, validarNombreOApellido };

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
    const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
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

function validarDni(cadena: string): boolean {
    const regex = /^\d{8}$/;
    return regex.test(cadena);
}

function validarNombreOApellido(cadena: string): boolean {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(cadena);
}

//const URI = "https://tp-dsw-back.onrender.com";
const URI = "http://localhost:3000";

export { validarAnio, validarComision, validarDiaSemana, validarHora, URI, validarLegajo, validarNombreOApellido, validarDni };

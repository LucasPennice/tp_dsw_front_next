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
    const regex = /^(1000|[1-9][0-9]{3})$/;
    return regex.test(anio);
}

function validarComision(cadena: string): boolean {
    const regex = /^\d{3}$/;
    return regex.test(cadena);
}

export { validarAnio, validarComision, validarDiaSemana, validarHora };

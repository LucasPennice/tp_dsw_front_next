export enum Sexo {
    Hombre = "Hombre",
    Mujer = "Mujer",
}

export enum UserRole {
    Regular = "Regular",
    Administrador = "Administrador",
}

export enum Turnos {
    Manana = "Mañana",
    Tarde = "Tarde",
    Noche = "Noche",
}

export const years: { id: string; type: string }[] = [
    {
        id: "1er",
        type: "1er Año",
    },
    {
        id: "2do",
        type: "2do Año",
    },
    {
        id: "3er",
        type: "3er Año",
    },
    {
        id: "4to",
        type: "4to Año",
    },
    {
        id: "5to",
        type: "5to Año",
    },
];

export enum TiposDocente {
    Teoria = "Teoria",
    Practica = "Practica",
}

export type Area = {
    borradoLogico: boolean;
    id: string;
    nombre: string;
    materias: [Materia];
};

export type Response<T> = {
    message: String;
    data: T | undefined;
};

export type Cursado = {
    borradoLogico: boolean;
    id: string;
    diaCursado: string;
    horaInicio: string;
    horaFin: string;
    comision: number;
    turno: string;
    tipoCursado: string; // ver
    ano: number;
    materia: Materia;
    profesor: Profesor;
};

export type Materia = {
    id: string;
    nombre: string;
    cursados: [Cursado];
    area: Area;
    borradoLogico: boolean;
};

export type Profesor = {
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    dni: number;
    cursados: [Cursado];
    puntuacionGeneral: number;
    sexo: Sexo;
    borradoLogico: boolean;
};

export type Review = {
    id: string;
    descripcion: string;
    fecha: Date;
    puntuacion: number;
    usuario: Usuario;
    cursado: Cursado;
    censurada: boolean;
};

export type Usuario = {
    id: string;
    legajo: string;
    nombre: string;
    apellido: string;
    username: string;
    fechaNacimiento: string; // "DD/MM/YYY"
    sexo: Sexo;
    rol: UserRole;
    reviews: [Review];
    cursados: [Cursado];
};

export enum Sexo {
    Hombre = "Hombre",
    Mujer = "Mujer",
}

export enum UserRole {
    Regular = "Regular",
    Administrador = "Administrador",
}

export type Area = {
    id: string;
    nombre: string;
    materias: [Materia];
};

export type Response<T> = {
    message: String;
    data: T | undefined;
};

export type Cursado = {
    id: string;
    diaCursado: string;
    horaCursado: string;
    comision: number;
    turno: string;
    año: number;
    materia: Materia;
    profesor: Profesor;
    usuarios: [Usuario];
};

export type Materia = {
    id: string;
    nombre: string;
    cursados: [Cursado];
    area: Area;
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
};

export type Review = {
    id: string;
    descripcion: string;
    puntuacion: number;
    usuario: Usuario;
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

export enum Sexo {
    Hombre = "Hombre",
    Mujer = "Mujer",
}

export type Profesor = {
    id : string
    nombre : string
    apellido : string
    fechaNacimiento : string
    dni: number
    cursadas: Cursado[] // "DIA_SEMANA - HH:MM" formato 24hs
    puntuacionGeneral: number
    sexo: Sexo
}

export type Response<T> = {
    message: String,
    data: T | undefined
}

export type Cursado = {
    id: string;
    diaCursado: string
    horaCursado: string
    comision: number
    turno: string
    año: number
    materia: Materia
    profesor: Profesor
}

export type Materia = {

    id: string;
    nombre: string

}
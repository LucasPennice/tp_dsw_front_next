export enum Sexo {
    Hombre = "Hombre",
    Mujer = "Mujer",
}

export type Profesor = {
    _id : string
    nombre : string
    apellido : string
    fechaNacimiento : Date
    dni: number
    cargos : string[]
    horariosDeClase: string[] // "DIA_SEMANA - HH:MM" formato 24hs
    puntuacionGeneral: number
    sexo: Sexo
}

export type Response<T> = {
    message: String,
    data: T | undefined
}
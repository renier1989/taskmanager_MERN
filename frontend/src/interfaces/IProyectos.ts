
import { IUsuario } from "../../../backend/models/Usuario";
import { IAlertData } from "./IAlertData";
import { TProyecto } from "./ProyectoType";


export interface IFProyecto{
    _id: string,
    nombre: string,
    descripcion: string,
    fechaEntrega: Date,
    cliente: string,
    creador: IUsuario,
    colaboradores: IUsuario[],
}


export interface IProyectosContext {
    proyectos: IFProyecto[],
    alerta: IAlertData,
    mostrarAlerta: (alerta:IAlertData)=>void,
    registrarProyecto: (proyecto:TProyecto)=>void,
    // mostrarAlerta: React.Dispatch<React.SetStateAction<IAlertData>>
}

export interface IProyectosProvider {
    children : JSX.Element | JSX.Element[]
}
import { IAlertData } from "./IAlertData";
import { TProyecto } from "./ProyectoType";

export interface IProyectosContext {
    proyectos: string,
    alerta: IAlertData,
    mostrarAlerta: (alerta:IAlertData)=>void,
    registrarProyecto: (proyecto:TProyecto)=>void,
    // mostrarAlerta: React.Dispatch<React.SetStateAction<IAlertData>>
}

export interface IProyectosProvider {
    children : JSX.Element | JSX.Element[]
}
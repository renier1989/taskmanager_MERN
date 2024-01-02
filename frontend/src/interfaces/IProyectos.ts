import { IProyecto } from "../../../backend/models/Proyecto";
import { IAlertData } from "./IAlertData";
import { TProyecto } from "./ProyectoType";


export interface IProyectosContext {
    proyectos: IProyecto[];
    alerta: IAlertData;
    mostrarAlerta: (alerta:IAlertData)=>void;
    registrarProyecto: (proyecto:TProyecto)=>void;
    obtenerProyecto: (id:string)=>void;
    proyecto : IProyecto;
    cargando: boolean;
    // mostrarAlerta: React.Dispatch<React.SetStateAction<IAlertData>>
}

export interface IProyectosProvider {
    children : JSX.Element | JSX.Element[]
}
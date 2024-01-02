import { IUsuario } from "../../../backend/models/Usuario";
import { IAlertData } from "./IAlertData";
import { TProyecto } from "./ProyectoType";

export interface IFProyecto {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
  creador: IUsuario;
  colaboradores: IUsuario[];
}

export interface IProyectosContext {
  proyectos: IFProyecto[];
  alerta: IAlertData;
  mostrarAlerta: (alerta: IAlertData) => void;
  submitProyecto: (proyecto: TProyecto) => void;
  obtenerProyecto: (id: string) => void;
  proyecto: IFProyecto;
  cargando: boolean;
  eliminarProyecto: (id: string) => void;
  modalFormularioTarea:boolean;
  handleModalTarea: ()=>void;
  // mostrarAlerta: React.Dispatch<React.SetStateAction<IAlertData>>
}

export interface IProyectosProvider {
  children: JSX.Element | JSX.Element[];
}

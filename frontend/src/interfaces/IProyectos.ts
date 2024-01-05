import { IUsuario } from "../../../backend/models/Usuario";
import { IAlertData } from "./IAlertData";
import { TProyecto } from "./ProyectoType";
import { TTarea } from './TareaType';

export interface IFProyecto {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
  creador: IUsuario;
  tareas: TTarea[];
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
  submitTarea: (tarea: TTarea) => void;
  handleModalEtidarTarea: (tarea:TTarea)=>void;
  tarea: TTarea;
  modalEliminarTarea : boolean;
  handleModalEliminarTarea: (tarea:TTarea)=>void;

  // mostrarAlerta: React.Dispatch<React.SetStateAction<IAlertData>>
}

export interface IProyectosProvider {
  children: JSX.Element | JSX.Element[];
}

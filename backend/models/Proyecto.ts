import mongoose, { Model, Types } from "mongoose";
import { IUsuario } from "./Usuario";

export interface IProyecto{
    _id: Types.ObjectId,
    nombre: string,
    descripcion: string,
    fechaEntrega: Date,
    cliente: string,
    creador: IUsuario,
    colaboradores: IUsuario[],
}

type ProyectoModel = Model<IProyecto>

const proyectoSchema = new mongoose.Schema<IProyecto,ProyectoModel>({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    descripcion:{
        type: String,
        required: true,
        trim: true,
    },
    fechaEntrega:{
        type: Date,
        default: new Date(),
    },
    cliente: {
        type: String,
        required: true,
        trim: true,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    colaboradores:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        }
    ]
},
{
    timestamps : true
})

const Proyecto = mongoose.model('Proyecto',proyectoSchema);
export default Proyecto;
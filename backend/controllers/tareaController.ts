import { Request, Response } from "express"
import Tarea from "../models/Tarea";
import Proyecto from "../models/Proyecto";


interface ExpressReqRes{
    (req: Request | any , res: Response):void
}

const agregarTarea:ExpressReqRes = async(req,res)=>{
    const {proyecto} = req.body;
    const ExisteProyecto = await Proyecto.findById(proyecto);

    if(!ExisteProyecto){
        const error = new Error(`El proyecto no Existe.!!!`);
        return res.status(404).json({ msg: error.message });
    }

    // compruebo si la persona autenticada es el creador del proyecto para permitirle agregar tareas a ese proyecto
    if(ExisteProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error(`No puedes agregar tareas a este Proyecto.!!!`);
        return res.status(401).json({ msg: error.message });
    }

    try {
        const tareaNueva = await Tarea.create(req.body);
        res.status(200).json(tareaNueva);
    } catch (error) {
        console.log(error);
    }
    
}
const obtenerTarea:ExpressReqRes = async(req,res)=>{}
const actualizarTarea:ExpressReqRes = async(req,res)=>{}
const eliminarTarea:ExpressReqRes = async(req,res)=>{}
const cambiarEstadoTarea:ExpressReqRes = async(req,res)=>{}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea,
}
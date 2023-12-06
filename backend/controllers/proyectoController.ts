import { Request, Response } from "express";
import Proyecto from "../models/Proyecto";
import mongoose from "mongoose";

interface ExpressReqRes {
    (req: Request | any, res: Response): void;
  }

// OBTENGO LOS PROYECTOS DEL USUARIO AUTENTICADO
const obtenerProyectos:ExpressReqRes = async(req,res)=>{
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
    res.status(200).json(proyectos);
}

// CREO NUEVOS PROYECRO PARA EL USUARIO AUTENTICADO
const nuevoProyecto:ExpressReqRes = async (req,res)=>{
    
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;

    try {
        const proyectoRegistrado = await proyecto.save();
        res.status(200).json(proyectoRegistrado);
    } catch (error) {
        console.log(error);
        
    }
}

// OBTENER UN PROYECTO POR ID
const obtenerProyecto:ExpressReqRes = async (req,res)=>{
    const {id} = req.params;
    try {

        const valid  =  mongoose.Types.ObjectId.isValid(id);

        if(!valid){
            const error = new Error(`Error el id no es valido.!!!`);
            return res.status(404).json({ msg: error.message });
        }

        const proyecto = await Proyecto.findById(id);
        if(!proyecto) {
            const error = new Error(`Proyecto no encontrado.!!!`);
            return res.status(404).json({ msg: error.message });
        }
        
        if(proyecto.creador?.toString() !== req.usuario._id.toString()){            
            const error = new Error(`No puedes ingresar a este proyecto.!!!`);
            return res.status(401).json({ msg: error.message });
        }
        res.status(200).json(proyecto)

    } catch (error) {
        console.log(error);
    }
    
}

const editarProyecto:ExpressReqRes = async (req,res)=>{}

const eliminarProyecto:ExpressReqRes = async (req,res)=>{}

const agregarColaborador:ExpressReqRes = async (req,res)=>{}

const eliminarColaborador:ExpressReqRes = async (req,res)=>{}

const obtenerTareas:ExpressReqRes = async (req,res)=>{}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
}
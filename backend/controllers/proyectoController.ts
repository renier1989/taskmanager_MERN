import { Request, Response } from "express";
import Proyecto from "../models/Proyecto";

interface ExpressReqRes {
    (req: Request | any, res: Response): void;
  }

const obtenerProyectos:ExpressReqRes = async(req,res)=>{}

const nuevoProyecto:ExpressReqRes = async (req,res)=>{
    console.log(req.body);
    console.log(req.usuario);
    
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;

    try {
        const proyectoRegistrado = await proyecto.save();
        res.status(200).json(proyectoRegistrado);
    } catch (error) {
        console.log(error);
        
    }
    
}

const obtenerProyecto:ExpressReqRes = async (req,res)=>{}

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
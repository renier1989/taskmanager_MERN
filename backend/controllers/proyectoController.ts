import { Request, Response } from "express";

interface ExpressReqRes {
    (req: Request | any, res: Response): void;
  }

const obtenerProyectos:ExpressReqRes = (req,res)=>{}

const nuevoProyecto:ExpressReqRes = (req,res)=>{}

const obtenerProyecto:ExpressReqRes = (req,res)=>{}

const editarProyecto:ExpressReqRes = (req,res)=>{}

const eliminarProyecto:ExpressReqRes = (req,res)=>{}

const agregarColaborador:ExpressReqRes = (req,res)=>{}

const eliminarColaborador:ExpressReqRes = (req,res)=>{}

const obtenerTareas:ExpressReqRes = (req,res)=>{}

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
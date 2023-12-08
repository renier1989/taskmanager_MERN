import { Request, Response } from "express"

interface ExpressReqRes{
    (req: Request | any , res: Response):void
}

const agregarTarea:ExpressReqRes = async(req,res)=>{}
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
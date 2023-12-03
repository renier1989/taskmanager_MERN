import { Request, Response } from "express";

interface ExpressReqRes {
    (req: Request,res: Response):void,
}

const registrarUsuario:ExpressReqRes = (req,res)=>{
     res.json({'msg':'hola'})
}

export {registrarUsuario}

// ejemplos de funciton que seran consumidas por las rutas 
// const usuario = (req:Request, res:Response) => {
//     res.json({
//         status: 'ok',
//         msg: 'Obteniendo los usuarios'
//     });
// }
// const crearUsuario = (req:Request, res:Response) => {
//     res.json({
//         status: 'ok',
//         msg: 'Creando los usuarios'
//     });
// }
// export {usuario, crearUsuario};
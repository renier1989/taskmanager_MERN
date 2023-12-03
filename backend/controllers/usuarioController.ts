import { Request, Response } from "express";
import Usuario from "../models/Usuario";

interface ExpressReqRes {
  (req: Request, res: Response): void;
}

const registrarUsuario: ExpressReqRes = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const usuarioUp = await usuario.save();
    res.json(usuarioUp);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export { registrarUsuario };

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

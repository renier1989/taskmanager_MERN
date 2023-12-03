import { Request, Response } from "express";
import Usuario from "../models/Usuario";

interface ExpressReqRes {
  (req: Request, res: Response): void;
}

const registrarUsuario: ExpressReqRes = async (req, res) => {
    // evitar registros con emails duplicados
    const {email} = req.body;
    const usuarioExiste = await Usuario.findOne({email});

    if(usuarioExiste){
        const error = new Error('El usuario ya fue registrado, use otro email!');
        return res.status(400).json({msg: error.message})
    }

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

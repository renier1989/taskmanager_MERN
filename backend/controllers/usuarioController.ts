import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import generarId from "../helpers/generarId";

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
    usuario.token = generarId();
    const usuarioUp = await usuario.save();
    res.json(usuarioUp);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const autenticar:ExpressReqRes = async(req,res)=>{

    const {email,password} = req.body;
    // 1. COMPORBAR SI EL USUARIO EXISTE 
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error(`El usuario no Existe!!!`);
        return res.status(404).json({msg: error.message});
    }  
    // 2. COMPROBAR SI EL USUARIO ESTA CONFIRMADO
    if(!usuario.confirmado){
        const error = new Error(`Tu cuenta no ha sido confirmada.!!!`);
        return res.status(404).json({msg: error.message});
    }
    // 3. COMPROBAR SU PASSWORD
}

export { registrarUsuario, autenticar };














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

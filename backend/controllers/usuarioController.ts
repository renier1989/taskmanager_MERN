import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import generarId from "../helpers/generarId";
import generarJWT from "../helpers/generarJWT";

interface ExpressReqRes {
  (req: Request, res: Response): void;
}

// funcion para registrar usuarios
const registrarUsuario: ExpressReqRes = async (req, res) => {
  // evitar registros con emails duplicados
  const { email } = req.body;
  const usuarioExiste = await Usuario.findOne({ email });

  if (usuarioExiste) {
    const error = new Error("El usuario ya fue registrado, use otro email!");
    return res.status(400).json({ msg: error.message });
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

// funcion para autenticar a los usuarios
const autenticar: ExpressReqRes = async (req, res) => {
  const { email, password } = req.body;
  // 1. COMPORBAR SI EL USUARIO EXISTE
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error(`El usuario no Existe!!!`);
    return res.status(404).json({ msg: error.message });
  }
  // 2. COMPROBAR SI EL USUARIO ESTA CONFIRMADO
  if (!usuario.confirmado) {
    const error = new Error(`Tu cuenta no ha sido confirmada.!!!`);
    return res.status(404).json({ msg: error.message });
  }
  // 3. COMPROBAR SU PASSWORD
  if (await usuario.compararPassword(password)) {
    return res.status(200).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error(`El password es incorrecto.!!!`);
    return res.status(404).json({ msg: error.message });
  }
};

// funcion para confirmar la cuenta de los usuarios con un token dinamico de sus cuentas
const confirmar: ExpressReqRes = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error(`Token no valido.!!!`);
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado= true;
    usuarioConfirmar.token = '';
    await usuarioConfirmar.save(); // se le puno un await porque esto consulta al servidor y espera para su ejecución
    return res.status(200).json({msg: `Cuenta confirmada con exito.!!!`})
  } catch (error) {
    console.log(error); 
  }  
};

// funcion para solicitar un nuevo token para y enviar email para recuperacion del password
const recuperarPassword:ExpressReqRes = async (req, res) => {
  const {email} = req.body;
  console.log(email);
  
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error(`El usuario no Existe!!!`);
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    return res.status(200).json({msg: `Email de recuperacion enviado.!!!`})
  } catch (error) {
    console.log(error);
    
  }
}

const comprobarToken:ExpressReqRes = async (req,res)=>{
  const {token} = req.params;
  const tokenValido = await Usuario.findOne({token});

  if(tokenValido){
    res.status(200).json({msg: `Token valido , el usuario existe`});
  }else{
    const error = new Error(`Token no valido`);
    return res.status(404).json({ msg: error.message });
  }

}





export { registrarUsuario, autenticar, confirmar,recuperarPassword,comprobarToken };

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

import express from 'express';
import { registrarUsuario, autenticar, confirmar, recuperarPassword, comprobarToken } from '../controllers/usuarioController';
// import { crearUsuario, usuario } from '../controllers/usuarioController';
const router = express.Router();

// // ejemplos de funciones definidas en el controlador
// router.get('/', usuario);
// router.post('/', crearUsuario);


// AUTENTICACION, REGISTRO Y CONFIRMACION DE USUARIOS
router.post('/', registrarUsuario)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/recuperar-password', recuperarPassword)
router.get('/recuperar-password/:token', comprobarToken)

export default router
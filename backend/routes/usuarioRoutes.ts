import express from 'express';
import { registrarUsuario, autenticar, confirmar } from '../controllers/usuarioController';
// import { crearUsuario, usuario } from '../controllers/usuarioController';
const router = express.Router();

// // ejemplos de funciones definidas en el controlador
// router.get('/', usuario);
// router.post('/', crearUsuario);


// AUTENTICACION, REGISTRO Y CONFIRMACION DE USUARIOS
router.post('/', registrarUsuario)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)

export default router
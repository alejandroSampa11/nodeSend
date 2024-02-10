import express from 'express'
const router = express.Router();
import { nuevoUsuario } from '../controllers/usuariosController.js';
import { check } from 'express-validator'

router.post('/', [
    check('nombre','El Nombre es Obligatorio').not().isEmpty(),
    check('email','Agrega un email valido').isEmail(),
    check('password','El Password debe ser de al menos 6 caracteres').isLength({min:6})
], nuevoUsuario)

export default router
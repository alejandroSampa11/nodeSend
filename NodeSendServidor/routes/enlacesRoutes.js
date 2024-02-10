import express from "express";
const router = express.Router();
import { nuevoEnlace, obtenerEnlace } from '../controllers/enlacesController.js'
import { eliminarArchivo } from "../controllers/archivosController.js";
import { check } from "express-validator";
import auth from "../middleware/auth.js";

router.post('/',
    [
        check('nombre' ,'Sube un Archivo').not().isEmpty(),
        check('nombre_original' ,'Sube un Archivo').not().isEmpty(),
    ],
    auth,
    nuevoEnlace
)

router.get('/:url',
    obtenerEnlace,
    eliminarArchivo
)

export default router;

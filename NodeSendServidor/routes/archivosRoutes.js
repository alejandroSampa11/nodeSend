import express from "express";
const router = express.Router();
import { subirArchivo, eliminarArchivo } from "../controllers/archivosController.js";
import auth from "../middleware/auth.js";


router.post('/',
    auth,
    subirArchivo
)

export default router;
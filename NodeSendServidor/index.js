import express from "express";
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import usuariosRoutes from './routes/usuariosRoutes.js'
import authRoutes from './routes/authRoutes.js'
import enlacesRoutes from './routes/enlacesRoutes.js'
import archivosRoutes from './routes/archivosRoutes.js'
import cors from 'cors'
    
//CREAR SERVIDOR
const app = express();
//HABILITAR LEER LOS VALORES DE UN BODY
app.use(express.json())
dotenv.config()
conectarDB()

//HABILITAR CORS
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(opcionesCors))

//RUTAS DE LA APP
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/enlaces', enlacesRoutes)
app.use('/api/archivos', archivosRoutes)

//PUERTO DE LA APP
const port = process.env.PORT || 4000;

//HABILITAR CARPETA PUBLICA
app.use(express.static('uploads'));






//ARRANCAR LA APP
app.listen(port,()=>{
    console.log(`El Servidor esta Funcionando en el puerto ${port}`)
})
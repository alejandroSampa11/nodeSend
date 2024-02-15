import Enlace from "../models/Enlace.js"
import shortid from "shortid";
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";

const nuevoEnlace = async(req, res, next)=>{
    //MENSAJES DE ERROR DE EXPRESS VALIDATOR
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(404).json({errores: errores.array()})
    }

    // console.log(req.body)

    //CREAR UN OBJETO
    const {nombre_original, nombre} = req.body

    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original
    
    //SI EL USUARIO ESTA AUTENTICADO
    if(req.usuario){
        const {password, descargas} = req.body

        //ASIGNAR A ENLACE EL NUMERO DE DESCARGAS
        if(descargas){
            enlace.descargas = descargas
        }
        //ASIGNAR UN PASSWORD
        if(password){
            const salt = await bcrypt.genSalt(10) 
            enlace.password = await bcrypt.hash(password,salt)
        }
        //ASIGNAR EL AUTOR
        enlace.autor = req.usuario.id
    }

    //ALMACENAR EN LA BD
    try {
        await enlace.save();
        return res.json({msg: `${enlace.url}`})
        next()
    } catch (error) {
        console.log(error)
    }
}

//OBTENER EL ENLACE
const obtenerEnlace = async(req,res, next)=>{
    const {url} = req.params
    // console.log(url)
    //VERIFICAR SI EXISTE EL ENLACE
    const enlace = await Enlace.findOne({url})
    if(!enlace){
        res.status(404).json({msg: 'Ese Enlace No Existe'})
        return next()
    }

    //SI EL ENLACE EXISTE
    res.json({archivo: enlace.nombre, password:false})
    next()
}

//OBTENER UN LISTADO DE TODOS LOS ENLACES
const todosEnlaces = async(req, res)=>{
    try {
        const enlaces= await Enlace.find({}).select('url -_id');
        res.json({enlaces})
    } catch (error) {
        console.log(error)
    }
}
//RETORNA SI EL ENLACE TIENE PASSWORD O NO
const tienePassword = async (req, res,next)=>{
    const {url} = req.params
    console.log(url)
    //VERIFICAR SI EXISTE EL ENLACE
    const enlace = await Enlace.findOne({url})
    if(!enlace){
        res.status(404).json({msg: 'Ese Enlace No Existe'})
        return next()
    }
    if(enlace.password){
      return res.json({password:true, enlace: enlace.url, archivo: enlace.nombre})
    }
    next();
}

const verificarPassword =async(req, res,next)=>{
    const {url} = req.params
    const {password} = req.body

    //CONSULTAR POR EL ENLACE
    const enlace = await Enlace.findOne({url})
    
    //VERIFICAR PASSWORD
    if(bcrypt.compareSync(password,enlace.password)){
        //PERMITIR DESCARGAR EL ARCHVIO
        next();
    }else{
        return res.status(401).json({msg: 'PASSWORD INCORRECTO'})
    }
}


export {
    nuevoEnlace,
    obtenerEnlace,
    todosEnlaces, 
    tienePassword,
    verificarPassword
}
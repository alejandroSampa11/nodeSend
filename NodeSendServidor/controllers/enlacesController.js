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

    //CREAR UN OBJETO
    const {nombre_original ,password} = req.body

    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
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
    //VERIFICAR SI EXISTE EL ENLACE
    const enlace = await Enlace.findOne({url})
    if(!enlace){
        res.status(404).json({msg: 'Ese Enlace No Existe'})
        return next()
    }

    //SI EL ENLACE EXISTE
    res.json({archivo: enlace.nombre})
    const {descargas, nombre, } = enlace;

    //SI LAS DESCARGAS SON IGUALES A 1 (BORRAR LA ENTRDA Y BORRAR EL ARCHIVO)
    if(descargas === 1){
        //ELIMINAR EL ARCHIVO
        req.archivo = nombre
        
        //ELIMINAR LA ENTRADA DE LA BD
        await Enlace.findOneAndDelete({url:req.params.url})
        next()
    }else{
        //SI LAS DESCARGAS SON > A 1 (RESTAR 1)
        enlace.descargas--;
        await enlace.save()
    }

}

export {
    nuevoEnlace,
    obtenerEnlace
}
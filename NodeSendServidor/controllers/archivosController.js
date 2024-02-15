//SUBIDA DE ARCHIVOS
import multer from "multer";
import shortid from "shortid";
import fs from 'fs'
import Enlace from "../models/Enlace.js";

const subirArchivo = async (req, res, next) => {
    const configuracionMulter = {
        limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`)
            }
            
        })
    }
    const upload = multer(configuracionMulter).single('archivo')
    upload(req, res, async (error) => {
        console.log(req.file)
        if (!error) {
            res.json({ archivo: req.file.filename })
        } else {
            console.log(error)
            return next()
        }
    })
}
const eliminarArchivo = async (req, res) => {
    console.log(req.archivo)
    try {
        fs.unlinkSync(`./uploads/${req.archivo}`)
        console.log('Archivo Eliminado')
    } catch (error) {
        console.log(error)
    }

}

const descargar = async(req, res, next)=>{
    //OBTIENE EL ENLACE
    const {archivo} = req.params;
    console.log('EL ARCHIVO Q LLEGA ',archivo)
    const enlace = await Enlace.findOne({nombre: archivo})
    console.log("SOY EN ENLACE ",enlace)

    const archivoDescarga = './../NodeSendServidor/uploads/'+archivo;
    res.download(archivoDescarga)

    //ELIMINAR EL ARCHIVO Y LA ENTRADA A LA BD
    const {descargas, nombre} = enlace;

    //SI LAS DESCARGAS SON IGUALES A 1 (BORRAR LA ENTRDA Y BORRAR EL ARCHIVO)
    if(descargas === 1){
        //ELIMINAR EL ARCHIVO
        req.archivo = nombre
        
        //ELIMINAR LA ENTRADA DE LA BD
        await Enlace.findOneAndDelete(enlace._id)
        next()
    }else{
        //SI LAS DESCARGAS SON > A 1 (RESTAR 1)
        enlace.descargas--;
        await enlace.save()
    }
}


export {
    subirArchivo,
    eliminarArchivo,
    descargar
}
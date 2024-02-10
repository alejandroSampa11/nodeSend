import Usuario from "../models/Usuario.js"
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"

//NUEVO USUARIO
const nuevoUsuario = async(req, res)=>{

    //MENSAJES DE ERROR DE EXPRESS VALIDATOR
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(404).json({errores: errores.array()})
    }
    //VERIFICAR SI EL USUARIO YA ESTA REGISTRADO
    const {email, password} = req.body;
    let usuarioExiste = await Usuario.findOne({email})
    if(usuarioExiste){
        return res.status(400).json({msg: 'El Usuario Ya Está Registrado'})
    }
    //CREAR NUEVO USUARIO
    const usuario = new Usuario(req.body)
    //HASHEAR EL PASSWORD
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password,salt)

    try {
        await usuario.save()
        res.json({msg: 'USUARIO CREADO CORRECTAMENTE'})
    } catch (error) {
        console.log(error)
    }

}

export{
    nuevoUsuario
}
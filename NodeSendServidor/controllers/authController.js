import Usuario from "../models/Usuario.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator"


const autenticarUsuario = async (req, res, next) => {
    //MENSAJES DE ERROR DE EXPRESS VALIDATOR
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(404).json({ errores: errores.array() })
    }

    //BUSCAR EL USUARIO PARA VER SI ESTA REGISTRADO
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        res.status(401).json({ msg: 'El Usuario No Existe' })
        return next()
    }

    //VERIFICAR EL PASSWORD Y AUTENTICAR EL USUARIO
    if (bcrypt.compareSync(password, usuario.password)) {
        //CREAR JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        },
            process.env.SECRETA,
            {
                expiresIn: '8h'
            }
        );
        res.json({ token })

    } else {
        res.status(401).json({ msg: 'Password Incorrecto' })
        return next()
    }
}
const usuarioAutenticado = async (req, res, next) => {
    req.json({usuario: req.usuario})
}

export {
    autenticarUsuario,
    usuarioAutenticado
}
import mongoose from "mongoose";

const usuariosSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase:true
    },
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required:true,
        trim:true
    },
})

const Usuario = mongoose.model('Usuario', usuariosSchema)
export default Usuario;
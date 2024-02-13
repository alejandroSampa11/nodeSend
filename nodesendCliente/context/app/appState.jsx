import { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer"
import clienteAxios from "../../config/clienteAxios";
import {
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from './../../types'
const AppState = ({ children }) => {

    const initialState = {
        mensaje_archivo: '',
        nombre: '',
        nombre_original: '',
        cargando: null
    }
    //CREAR DISPATCH T STATE
    const [state, dispatch] = useReducer(appReducer, initialState)


    //MUESTRA UNA ALERTA
    const mostrarAlerta = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 4000)
    }

    //SUBIR LOS ARCHIVOS AL SERVIDOR
    const subirArchivo = async (formData, nombreArchivo) => {
        dispatch({
            type: SUBIR_ARCHIVO
        })
        try {
            const resultado = await clienteAxios.post("archivos", formData);
            console.log(resultado.data);
            dispatch({
                type:SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre : resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                mostrarAlerta,
                subirArchivo,
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState
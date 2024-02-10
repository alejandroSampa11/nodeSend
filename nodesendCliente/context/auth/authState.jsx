import authContext from "./authContext";
import { useReducer } from "react";
import authReducer from "./authReducer";
import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA
} from "../../types";
import clienteAxios from "../../config/clienteAxios";

const AuthState = ({ children }) => {
    //DEFINIR UN STATE INICIAL
    const initialState = {
        token: "",
        autenticado: null,
        usuario: null,
        mensaje: null,
    };

    //DEFINIR EL REDUCER
    const [state, dispatch] = useReducer(authReducer, initialState);

    //REGISTRAR NUEVOS USUARIOS
    const registrarUsuarios = async (datos) => {
        try {
            const { data } = await clienteAxios.post("/usuarios", datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: data.msg,
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg,
            });
        }
        //LIMPIAR LA ALERTA DESPUES DE 3 SEG
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 3000)
    };

    //USUARIO AUTENTICADO
    // const usuarioAutenticado = (nombre) => {
    //     dispatch({
    //         type: USUARIO_AUTENTICADO,
    //         payload: nombre
    //     })
    // }
    return (
        <>
            <authContext.Provider
                value={{
                    token: state.token,
                    autenticado: state.autenticado,
                    usuario: state.usuario,
                    mensaje: state.mensaje,
                    // usuarioAutenticado,
                    registrarUsuarios,
                }}
            >
                {children}
            </authContext.Provider>
        </>
    );
};

export default AuthState;

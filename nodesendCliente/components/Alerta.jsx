import { useContext } from "react"
import authContext from "../context/auth/authContext"
import appContext from "../context/app/appContext"

function Alerta() {
  //EXTRAER MENSAJE DE ERROR PARA USUARIOS
    const AuthContext = useContext(authContext)
    const {mensaje} = AuthContext
    //EXTRAER MENSAJE DE ERROR DE ARCHIVOS
    const AppContext = useContext(appContext)
    const {mensaje_archivo} = AppContext
  return (
    <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto rounded-lg uppercase">
        {mensaje || mensaje_archivo}
    </div>
  )
}

export default Alerta
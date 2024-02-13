import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import authContext from '../context/auth/authContext'

function Header() {

    //EXTRAER EL USUARIO AUTENTICADO DEL STORAGE
    const AuthContext = useContext(authContext)
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext


    useEffect(() => {
        usuarioAutenticado()
    }, [])


    return (
        <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
            <Link className='ml-5' href='/'>
                <Image
                    src="/logo.svg"
                    width={300}
                    height={300}
                    alt="NodeSend Logo"
                />
            </Link>
            <div >
                {usuario ? (
                    <div className='flex items-center'>
                        <p className='mr-5'>Hola {usuario.nombre}</p>
                        <button onClick={()=> cerrarSesion()} className='mr-2 bg-black px-5 rounded-md py-3 text-white font-bold uppercase' type='button'>Cerrar Sesión</button>
                    </div>
                ) : (
                    <>
                        <Link className='mr-2 bg-red-500 px-5 rounded-md py-3 text-white font-bold uppercase' href="/login">Iniciar Sesion</Link>
                        <Link className='mr-2 bg-black px-5 rounded-md py-3 text-white font-bold uppercase' href="/crearcuenta">Crear Cuenta</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
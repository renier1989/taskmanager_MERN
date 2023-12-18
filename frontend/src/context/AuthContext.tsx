import {  ReactNode, createContext, useEffect, useState } from "react";
import { TAuth, authValues } from "../interfaces/AuthType";
import AxiosClient from "../config/AxiosClient";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
    cargando: boolean,
    auth: TAuth,
    setAuth: React.Dispatch<React.SetStateAction<TAuth>>
}

const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const navigate = useNavigate();
    const [auth, setAuth] = useState(authValues);
    const [cargando , setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const tokenLS = localStorage.getItem('token');
            if (!tokenLS) {
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenLS}`
                }
            }

            try {
                const { data } = await AxiosClient('/usuarios/perfil', config)
                setAuth(data)
                navigate('/proyectos')
                
            } catch (error) {
                setAuth(authValues)
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [navigate])

    return <AuthContext.Provider value={{
        cargando,
        auth,
        setAuth
    }}>
        {children}
    </AuthContext.Provider>
}

export {
    AuthProvider
}

export default AuthContext
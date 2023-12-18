import {  ReactNode, createContext, useEffect, useState } from "react";
import { TAuth, authValues } from "../interfaces/AuthType";
import AxiosClient from "../config/AxiosClient";

interface IAuthContext {
    auth: TAuth,
    setAuth: React.Dispatch<React.SetStateAction<TAuth>>
}

const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [auth, setAuth] = useState(authValues);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const tokenLS = localStorage.getItem('token');
            if (!tokenLS) {
                console.log('no hay token');
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
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        autenticarUsuario()
    }, [])

    return <AuthContext.Provider value={{
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
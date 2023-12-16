import { ReactNode, createContext, useState } from "react";

interface IAuthContext {
    // hola: string;
}

const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider = ({children}:{children:ReactNode}) =>{


    return <AuthContext.Provider value={{
        
    }}>
        {children}
    </AuthContext.Provider>
}

export{
    AuthProvider
}

export default AuthContext
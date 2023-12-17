import { ReactNode, createContext, useState } from "react";
import { TAuth, authValues } from "../interfaces/AuthType";

interface IAuthContext {
    auth:TAuth,
    setAuth:React.Dispatch<React.SetStateAction<TAuth>>
}

const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider = ({children}:{children:ReactNode}) =>{

    const [auth , setAuth] = useState(authValues);
    
    return <AuthContext.Provider value={{
        auth,
        setAuth
    }}>
        {children}
    </AuthContext.Provider>
}

export{
    AuthProvider
}

export default AuthContext
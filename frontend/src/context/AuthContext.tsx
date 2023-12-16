import { ReactNode, createContext } from "react";

interface IAuthContect {

}



const AuthContext = createContext<IAuthContect | undefined >(undefined);

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
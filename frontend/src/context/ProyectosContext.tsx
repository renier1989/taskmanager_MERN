import { createContext } from "react";
import { IProyectosProvider } from "../interfaces/IProyectos";


const ProyectosContext = createContext({});

const ProyectosProvider = ({children}:IProyectosProvider)=>{
    return (
        <ProyectosContext.Provider value={{}}>
            {children}
        </ProyectosContext.Provider>
    )
}

export {ProyectosProvider}

export default ProyectosContext;
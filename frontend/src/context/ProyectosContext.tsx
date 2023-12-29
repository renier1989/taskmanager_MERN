import { createContext, useState } from 'react';
import { IProyectosProvider } from "../interfaces/IProyectos";

interface IProyectosContext {
    proyectos?: string,
}

const ProyectosContext = createContext<IProyectosContext>({} as IProyectosContext);
const ProyectosProvider = ({children}:IProyectosProvider)=>{

    const [proyectos, setProyectos] = useState('poryecto aqui')
    return (
        <ProyectosContext.Provider value={{
            proyectos,
            
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export {ProyectosProvider}

export default ProyectosContext;
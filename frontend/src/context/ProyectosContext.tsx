import { createContext, useState } from 'react';
import { IProyectosContext, IProyectosProvider } from "../interfaces/IProyectos";
import { IAlertData } from '../interfaces/IAlertData';
import { IProyecto } from '../../../backend/models/Proyecto';
import { TProyecto } from '../interfaces/ProyectoType';

const ProyectosContext = createContext<IProyectosContext>({} as IProyectosContext);
const ProyectosProvider = ({children}:IProyectosProvider)=>{

    const [proyectos, setProyectos] = useState('poryecto aqui')
    const [alerta, setAlerta] = useState<IAlertData>({} as IAlertData)

    const mostrarAlerta = (alerta:IAlertData) =>{
        setAlerta(alerta);
        setTimeout(() => {
            setAlerta({} as IAlertData)
        }, 4000);
    }

    const registrarProyecto = async (proyecto:TProyecto) =>{
        console.log(proyecto);
    }


    return (
        <ProyectosContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            registrarProyecto,
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export {ProyectosProvider}

export default ProyectosContext;
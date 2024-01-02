import { createContext, useEffect, useState } from 'react';
import { IProyectosContext, IProyectosProvider } from '../interfaces/IProyectos';
import { IAlertData } from '../interfaces/IAlertData';
import { TProyecto } from '../interfaces/ProyectoType';
import AxiosClient from '../config/AxiosClient';
import {  useNavigate } from 'react-router-dom';
import { IProyecto } from '../../../backend/models/Proyecto';

const ProyectosContext = createContext<IProyectosContext>({} as IProyectosContext);
const ProyectosProvider = ({ children }: IProyectosProvider) => {

    const [proyectos, setProyectos] = useState<IProyecto[]>({} as IProyecto[] )
    const [alerta, setAlerta] = useState<IAlertData>({} as IAlertData)
    const [proyecto, setProyecto] = useState<IProyecto>({} as IProyecto)
    const [cargando, setCargando] = useState<boolean>(false)
    const navigate = useNavigate()

    // para llamar los poryectos que el usuario logeado ha creado.
    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const tokenLS = localStorage.getItem('token');
                if (!tokenLS) {
                    console.log('no hay token!');
                    return
                }
                const configUrl = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenLS}`
                    }
                }
                const {data} = await AxiosClient('/proyectos', configUrl);
                // console.log(data);
                setProyectos(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos()
    }, [])

    const mostrarAlerta = (alerta: IAlertData) => {
        setAlerta(alerta);
        setTimeout(() => {
            setAlerta({} as IAlertData)
        }, 4000);
    }
    const registrarProyecto = async (proyecto: TProyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            // registro el nuevo proyecto en la BD
            const {data} = await AxiosClient.post('/proyectos', proyecto, config);

            setProyectos([...proyectos, data])
            // muestro una alerta del pryecto crado
            setAlerta({
                msg: 'Proyecto creado correctamente.!',
                error: false
            })
            // aqui redirecciono a la vista de los proyectos
            setTimeout(() => {
                navigate('/proyectos')
            }, 3000);

            

        } catch (error) {
            console.log(error);
        }
    }

    const obtenerProyecto = async (id:string) =>{
        // console.log(id);
        setCargando(true)
        try {
            const tokenLS = localStorage.getItem('token');
                if (!tokenLS) {
                    console.log('no hay token!');
                    return
                }
                const configUrl = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenLS}`
                    }
                }
                const {data} = await AxiosClient(`/proyectos/${id}`, configUrl);
                setProyecto(data.proyecto);
                
        } catch (error) {
            console.log(error);
        }finally{
            setCargando(false)
        }
    }

    return (
        <ProyectosContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            registrarProyecto,
            obtenerProyecto,
            proyecto,
            cargando
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;
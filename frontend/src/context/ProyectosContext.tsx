import { createContext, useEffect, useState } from 'react';
import { IFProyecto, IProyectosContext, IProyectosProvider } from '../interfaces/IProyectos';
import { IAlertData } from '../interfaces/IAlertData';
import { TProyecto } from '../interfaces/ProyectoType';
import AxiosClient from '../config/AxiosClient';
import { useNavigate } from 'react-router-dom';
import { TTarea } from '../interfaces/TareaType';

const ProyectosContext = createContext<IProyectosContext>({} as IProyectosContext);
const ProyectosProvider = ({ children }: IProyectosProvider) => {

    const [proyectos, setProyectos] = useState<IFProyecto[]>({} as IFProyecto[])
    const [alerta, setAlerta] = useState<IAlertData>({} as IAlertData)
    const [proyecto, setProyecto] = useState<IFProyecto>({} as IFProyecto)
    const [cargando, setCargando] = useState<boolean>(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState<boolean>(false)
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
                const { data } = await AxiosClient('/proyectos', configUrl);
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
    const submitProyecto = async (proyecto: TProyecto) => {
        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await crearProyecto(proyecto)
        }
    }

    const crearProyecto = async (proyecto: TProyecto) => {
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
            const { data } = await AxiosClient.post('/proyectos', proyecto, config);

            setProyectos([...proyectos, data])
            // muestro una alerta del pryecto crado
            setAlerta({
                msg: 'Proyecto creado correctamente.!',
                error: false
            })
            // aqui redirecciono a la vista de los proyectos
            setTimeout(() => {
                setAlerta({} as IAlertData)
                navigate('/proyectos')
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    const editarProyecto = async (proyecto: TProyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            // actualizo el  proyecto en la BD, y retorno el proyecto que fue actualizado
            const { data } = await AxiosClient.put(`/proyectos/${proyecto.id}`, proyecto, config);

            // aqui hago una sincronización de los proyectos con el proyecto que fue acrualizado.
            // al hacerl el map a los proyectos lo que hago es retornar un nuevo arreglo pero sustitulo el editado 
            const proyectosActualizado = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);
            setProyectos(proyectosActualizado);

            // muestro una alerta del pryecto crado
            setAlerta({
                msg: 'Proyecto actualizado correctamente.!',
                error: false
            })
            // aqui redirecciono a la vista de los proyectos
            setTimeout(() => {
                setAlerta({} as IAlertData)
                navigate('/proyectos')
            }, 2000);



        } catch (error) {
            console.log(error);
        }

    }

    const obtenerProyecto = async (id: string) => {
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
            const { data } = await AxiosClient(`/proyectos/${id}`, configUrl);
            setProyecto(data.proyecto);

        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async (id:string)=>{
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
            const { data } = await AxiosClient.delete(`/proyectos/${id}`, config);
            const proyectosActuales = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActuales)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({} as IAlertData)
                navigate('/proyectos')
            }, 2000);

            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
    }

    const submitTarea = async (tarea:TTarea) => {
        console.log(tarea);
        
    }

    return (
        <ProyectosContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            modalFormularioTarea,
            handleModalTarea,
            submitTarea,
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;
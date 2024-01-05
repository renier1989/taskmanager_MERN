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
    const [modalEliminarTarea, setModalEliminarTarea] = useState<boolean>(false)
    const [tarea, setTarea] = useState<TTarea>({} as TTarea)
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
            setProyecto({} as IFProyecto)
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async (id: string) => {
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
        setTarea({} as TTarea)
    }
    
    const submitTarea = async (tarea: TTarea) => {
        if (tarea?._id) {
            await editarTarea(tarea);
        } else {
            await crearTarea(tarea);
        }
    }

    const crearTarea = async (tarea: TTarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.post('/tareas', tarea, config)
            // creo una nueva const con el proyecto actual para poder cargarle las tareas
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            // cargo al state de proyecto , el proyectoActualizado con las tareas
            setProyecto(proyectoActualizado)
            setModalFormularioTarea(false)

        } catch (error) {
            console.log(error);
        }

    }

    const editarTarea = async (tarea: TTarea) => {
        const token = localStorage.getItem('token');
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await AxiosClient.put(`/tareas/${tarea._id}`, tarea, config)
        
        const proyectoActualizado = {...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState);
        setProyecto(proyectoActualizado)

        setAlerta({} as IAlertData)
        setModalFormularioTarea(false)

    }

    const handleModalEtidarTarea = (tarea: TTarea) => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }
    const handleModalEliminarTarea = (tarea: TTarea) => {
        setModalEliminarTarea(!modalEliminarTarea)
        modalEliminarTarea ? setTarea(tarea): setTarea({} as TTarea)
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
            handleModalEtidarTarea,
            tarea,
            modalEliminarTarea,
            handleModalEliminarTarea
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;
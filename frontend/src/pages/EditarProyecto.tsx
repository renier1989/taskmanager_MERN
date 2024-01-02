import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { FomularioProyecto } from "../components/FomularioProyecto";
import { ButtonEliminarProyecto } from "../components/ButtonEliminarProyecto";

type EditarProyectoParams = {
    id?: string;
}

export const EditarProyecto = () => {
    const params = useParams<EditarProyectoParams>()
    const { obtenerProyecto, proyecto, cargando } = useProyecto()
    // console.log(params);

    useEffect(() => {
        const getProyecto = () => {
            if (typeof params.id !== 'undefined') {
                if (params.id) {
                    obtenerProyecto(params.id);
                }
            }
        }
        getProyecto()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])


    const { nombre,_id} = proyecto

    if (cargando) return (<><Loader /><Loader /></>)

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-4xl font-black">Editar Proyecto : {nombre}</h1>

                <ButtonEliminarProyecto id={_id}/>
            </div>

            <div className="mt-10 flex justify-center">
                <FomularioProyecto />
            </div>
        </>
    )
}

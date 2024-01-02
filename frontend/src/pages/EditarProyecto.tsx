import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { FomularioProyecto } from "../components/FomularioProyecto";

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


    const { nombre } = proyecto

    if (cargando) return (<><Loader /><Loader /></>)

    return (
        <>
            <h1 className="text-4xl font-black"> {nombre}</h1>

            <div className="mt-10 flex justify-center">
                <FomularioProyecto />
            </div>
        </>
    )
}

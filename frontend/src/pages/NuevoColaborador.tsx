/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { FormularioColaborador } from "../components/FormularioColaborador"
import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import { Loader } from "../components/Loader"

type FormularioColaboradorParams = {
    id?: string
}

export const NuevoColaborador = () => {
    const params = useParams<FormularioColaboradorParams>()
    const { obtenerProyecto, cargando, proyecto } = useProyecto()
    useEffect(() => {
        if (params.id) {
            obtenerProyecto(params.id)
        }
    }, [params])

    if (cargando) return (
        <>
            <Loader />
            <Loader />
            <Loader />
        </>)

    return (
        <>
            <h1 className="text-4xl font-black">Agreagar Colaborador(a) al proyecto : <small className=" text-gray-600">{proyecto.nombre}</small> </h1>
            <div className="mt-10 flex  justify-center">
                <FormularioColaborador />
            </div>
        </>
    )
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import { useEffect } from "react"
import { Loader } from "../components/Loader"

type ProyectoParams = {
  id?: string
}

export const Proyecto = () => {
  const params = useParams<ProyectoParams>()
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
  }, [params.id])


  const { nombre } = proyecto

  // console.log(nombre);


  return (

    cargando ? (<Loader />) : (
      <div>
        <h1 className="text-4xl font-black"> {nombre}</h1>
      </div>
    )

  )
}

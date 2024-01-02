/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import { useEffect } from "react"
import { Loader } from "../components/Loader"
import { EditarIcon } from "../components/icons/EditarIcon"
import { ButtonEliminarProyecto } from "../components/ButtonEliminarProyecto"

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


  const { nombre, _id } = proyecto

  if (cargando) return (
    <>
      <Loader />
      <Loader />
      <Loader />
    </>)

  return (
    <div className="flex justify-between">
      <h1 className="text-4xl font-black"> {nombre}</h1>
      <div className="flex gap-2">
        <div className=" p-2 rounded-md bg-sky-600 text-white cursor-pointer font-semibold transition-all duration-300 hover:shadow-lg">
          <Link className="flex items-center gap-2" to={`/proyectos/editar/${params.id}`}>
            <EditarIcon />
            Editar
          </Link>
        </div>
        <ButtonEliminarProyecto id={_id}/>
      </div>
    </div>)

}

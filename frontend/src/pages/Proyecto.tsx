/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import { useEffect } from "react"
import { Loader } from "../components/Loader"
import { EditarIcon } from "../components/icons/EditarIcon"
import { ButtonEliminarProyecto } from "../components/ButtonEliminarProyecto"
import { PlusIcon } from "../components/icons/PlusIcon"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import { TareaItem } from "../components/TareaItem"

type ProyectoParams = {
  id?: string
}

export const Proyecto = () => {
  const params = useParams<ProyectoParams>()
  const { obtenerProyecto, proyecto, cargando,handleModalTarea } = useProyecto()
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


  return proyecto._id ?
  (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black"> {nombre}</h1>
        <div className="flex gap-2">
          <div className="self-center p-2 rounded-md bg-sky-600 text-white cursor-pointer font-semibold transition-all duration-300 hover:shadow-lg">
            <Link className="flex items-center gap-2" to={`/proyectos/editar/${params.id}`}>
              <EditarIcon />
              Editar
            </Link>
          </div>
          <ButtonEliminarProyecto id={_id} />
        </div>
      </div>

      <button onClick={handleModalTarea} className="bg-sky-500 text-white px-5 py-2 uppercase rounded-md w-full md:w-auto text-sm font-bold text-center mt-5 hover:shadow-md transition-all duration-500 flex gap-2 items-center">
        <PlusIcon/>
        Nueva Tarea
      </button>

      <p className="font-bold  text-xl mt-10">Tareas del Proyecto</p>
      <div className="bg-white  shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? 
          proyecto.tareas?.map(tarea=> <TareaItem key={tarea._id} tarea={tarea}/>)
        : 
        <p className="my-5 p-10 text-center">No se han registrado tareas en este proyecto!</p>}
      </div>
      <ModalFormularioTarea/>
    </>
  )
  :
  (
    <>
      <h1>Proyecto no encontrado. volver al listdo de proyectos</h1>
      <Link to='/proyectos'>Volver a proyectos</Link>
    </>
  )

}

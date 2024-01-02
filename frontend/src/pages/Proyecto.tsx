import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import { useEffect } from "react"

type ProyectoParams  = {
  id?:string
}

export const Proyecto = () => {
  const params  = useParams<ProyectoParams>()
  // console.log(params);
  
  const {obtenerProyecto} = useProyecto()

  useEffect(()=>{
    if (typeof params.id !== 'undefined') {
      obtenerProyecto(params.id);
    }
  },[obtenerProyecto, params.id])
  
  return (
    <div>Proyecto</div>
  )
}

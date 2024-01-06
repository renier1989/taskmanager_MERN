import Alerta from "../components/Alerta";
import { PreviewProyecto } from "../components/PreviewProyecto";
import useProyecto from "../hooks/useProyectos"

function Proyectos() {
  const { proyectos,alerta } = useProyecto()
  return (
    <>
      <h1 className="text-4xl  font-black">Proyectos</h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto key={proyecto.nombre} proyecto={proyecto} />
          ))
          :
          <p className=" text-center text-gray-600 uppercase p-5">No hay proyectos aun!</p>
        }
      </div>
    </>
  )
}

export default Proyectos
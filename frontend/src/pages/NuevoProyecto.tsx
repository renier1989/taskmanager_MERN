import { FomularioNuevoProyecto } from "../components/FomularioNuevoProyecto";
// import useProyecto from "../hooks/useProyectos"

function NuevoProyecto() {
    // const {proyectos} = useProyecto()
    
    return (
      <>
      <h1 className="text-4xl  font-black">Crear Proyecto</h1>

      <div className="mt-10 flex justify-center">
        <FomularioNuevoProyecto/>
      </div>
      </>
    )
  }
  
  export default NuevoProyecto
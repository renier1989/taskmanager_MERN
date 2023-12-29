import useProyecto from "../hooks/useProyectos"

function NuevoProyecto() {
    const {proyectos} = useProyecto()
    console.log(proyectos);
    
    return (
      <>
      <h1 className="text-4xl  font-black">NuevoProyecto</h1>
      </>
    )
  }
  
  export default NuevoProyecto
import useProyecto from "../hooks/useProyectos"

function Proyectos() {
  const {proyectos} =useProyecto()
  console.log(proyectos.length);
  
  return (
    <>
    <h1 className="text-4xl  font-black">Proyectos</h1>
    <div className="bg-white shadow mt-10 rounded-lg p-5">
      {proyectos.length ? <p className="text-center text-gray-600 uppercase">si hay proyectos</p> : <p className=" text-center text-gray-600 uppercase">No hay proyectos aun!</p>}
    </div>
    </>
  )
}

export default Proyectos
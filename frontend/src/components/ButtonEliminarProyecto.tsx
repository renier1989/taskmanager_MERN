import useProyecto from "../hooks/useProyectos"
import { EliminarIcon } from "./icons/EliminarIcon"

interface ButtonEliminarProyectoProps {
    id: string
}

export const ButtonEliminarProyecto = ({id}:ButtonEliminarProyectoProps) => {
    const { eliminarProyecto}= useProyecto()
   const handleClink = () => {
    eliminarProyecto(id)
   }


    return (
        <>
            <div className=" p-2 rounded-md bg-red-600 text-white cursor-pointer font-semibold transition-all duration-300 hover:shadow-lg">
                <button 
                 onClick={handleClink}
                 type="button" className="flex gap-2">
                    <EliminarIcon />
                    Eliminar
                </button>
            </div>
        </>
    )
}

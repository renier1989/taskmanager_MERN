import { formatearFecha } from "../helpers/formatearFecha"
import { TTarea } from "../interfaces/TareaType"

type TareaItemProps = {
    tarea: TTarea
}

export const TareaItem = ({ tarea }: TareaItemProps) => {
    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl font-bold">{nombre} </p>
                <p className="mb-1 text-sm uppercase text-gray-500">{descripcion} </p>
                <p className="mb-1 text-xl font-semibold">{formatearFecha(fechaEntrega)} </p>
                <p className="mb-1 text-gray-600"> Prioridad : {prioridad} </p>
            </div>
            <div className="flex gap-1">
                <button type="button" className="py-2 px-4 text-white font-bold bg-sky-600 text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300">
                    Editar
                </button>
                {estado ? (
                    <button type="button" className="py-2 px-4 text-white font-bold bg-green-700 text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300">
                        Completa
                    </button>
                ) : (
                    <button type="button" className="py-2 px-4 text-white font-bold bg-gray-600 text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300">
                        Incompleta
                    </button>
                )}
                <button type="button" className="py-2 px-4 text-white font-bold bg-red-600 text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300">
                    Eliminar
                </button>
            </div>
        </div>
    )
}

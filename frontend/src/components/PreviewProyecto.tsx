import { Link } from 'react-router-dom';
import { IFProyecto } from '../interfaces/IProyectos';

interface props {
    proyecto: IFProyecto
}

export const PreviewProyecto = ({ proyecto }: props) => {
    // console.log(proyecto);
    const { _id, cliente, nombre } = proyecto
    return (
        <div className='border-b p-5 flex'>
            <p className='flex-1'>{nombre}
                <span className='text-sm text-gray-500 uppercase'>
                    {' '}{cliente}
                </span>
            </p>
            <Link className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold' to={`${_id}`}> Ver Proyecto </Link>
        </div>
    )
}

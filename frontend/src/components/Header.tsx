import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center">
                    TaskManager
                </h2>
                <input type="search" placeholder="Buscar Proyectos"
                    className="rounded-lg lg:w-96 block  p-2 border outline-none"
                />
                <div className="flex gap-4 items-center">
                    <Link
                        to="/proyectos"
                        className="font-bold uppercase "
                    >Proyectos</Link>
                    <button type="button" className="text-sm text-white bg-sky-600 rounded-md font-bold p-2">Cerrar Sesion</button>
                </div>
            </div>
        </header>
    )
}

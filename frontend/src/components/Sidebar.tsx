import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const Sidebar = () => {
    const { auth }= useAuth()
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
        <p className="text-xl font-bold">Hola: {auth.nombre} </p>

        <Link to="nuevo-proyecto"
        className="bg-sky-600 font-bold w-full p-3 text-white uppercase block mt-5  rounded-md  text-center hover:shadow-lg transition duration-400"
        >
            Nuevo Proyecto
        </Link>
    </aside>
  )
}

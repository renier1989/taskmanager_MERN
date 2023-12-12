import { Link } from "react-router-dom"


const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Inicia Sesion y Administra tus <span className="text-slate-700">{" "}proyectos</span>
      </h1>
      <form className="mt-20 bg-white rounded-lg shadow p-10">
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="email">Email</label>
          <input id="email" autoComplete="off" type="email" placeholder="Email de usuario" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" autoFocus />
        </div>
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="email">Password</label>
          <input id="email" type="password" placeholder="Email de usuario" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
        </div>

        <input type="submit" value="Iniciar Sesion" className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link to="registrar" className="block text-center my-5 uppercase text-slate-500 text-sm">¿No tienes cuenta? Registrarte</Link>
        <Link to="olvide-password" className="block text-center my-5 uppercase text-slate-500 text-sm">¿Olvidaste tu Password? Registrarte</Link>
      </nav>
    </>

  )
}

export default Login
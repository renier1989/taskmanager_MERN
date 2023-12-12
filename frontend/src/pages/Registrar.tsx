import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";

interface AlertaData {
  msg:string;
  error: boolean;
}
const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState<AlertaData>({msg:'', error:false});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Crea tu cuenta y administra tus <span className="text-slate-700">{" "}proyectos</span>
      </h1>
      {
        msg && <Alerta alerta={alerta} />
      }
      <form onSubmit={e => handleSubmit(e)} className="mt-20 bg-white rounded-lg shadow p-10">
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="nombre">Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} id="nombre" autoComplete="off" type="text" placeholder="Tu nombre completo" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" autoFocus />
        </div>
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="email">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} id="email" autoComplete="off" type="email" placeholder="Email de usuario" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
        </div>
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="password">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="Tu password" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
        </div>
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="password2">Repetir Password</label>
          <input value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} id="password2" type="password" placeholder="Repite tu password" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
        </div>

        <input type="submit" value="Crear Cuenta" className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link to="/" className="block text-center my-5 uppercase text-slate-500 text-sm">¿Ya tienes una cuenta? Inicia Sesion</Link>
        <Link to="/olvide-password" className="block text-center my-5 uppercase text-slate-500 text-sm">¿Olvidaste tu Password? Registrarte</Link>
      </nav>
    </>
  )
}

export default Registrar
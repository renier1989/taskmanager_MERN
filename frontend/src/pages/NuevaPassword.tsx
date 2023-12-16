import { useEffect, useState } from "react"
import { IAlertData } from '../interfaces/IAlertData';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";


const NuevaPassword = () => {

  const params = useParams()
  const { token } = params;

  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState<IAlertData>({ msg: '', error: false })
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordActualizado, setPasswordActualizado] = useState(false);

  useEffect(() => {
    const validarToken = async () => {
      try {
        const backend_url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/recuperar-password/${token}`;
        await axios(backend_url);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    return () => { validarToken() }

  }, [token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no coinciden',
        error: true
      })
      return;
    }

    try {

      const backend_url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/recuperar-password/${token}`;
      const { data } = await axios.post(backend_url, { password })

      setPasswordActualizado(true);

      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }




  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Reestablece tu cuenta y administra tus <span className="text-slate-700">{" "}proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {(tokenValido && !passwordActualizado) && (
        <form onSubmit={e => handleSubmit(e)} className="mt-20 bg-white rounded-lg shadow p-10">

          <div className="my-5">
            <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="password">Nuevo Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="Tu nuevo password" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
          </div>
          <div className="my-5">
            <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="password2">Repetir Password</label>
            <input value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} id="password2" type="password" placeholder="Repite tu password" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
          </div>

          <input type="submit" value="Guardar Password" className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
        </form>
      )}

      {passwordActualizado && (
        <Link to="/" className="block text-center my-5 uppercase text-slate-500 text-sm"> Inicia Sesion</Link>
      )}
    </>
  )
}

export default NuevaPassword
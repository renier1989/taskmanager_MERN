import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";

interface AlertaData {
  msg: string;
  error: boolean;
}

const ConfirmarCuenta = () => {

  const params = useParams()
  const { id } = params;
  const [alerta, setAlerta] = useState<AlertaData>({ msg: '', error: false })
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);


  useEffect(() => {
    const confirmarToken = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`;
        const { data } = await axios(url);

        setAlerta({
          msg: data.msg,
          error: false,
        })

        setCuentaConfirmada(true);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })

      }
    }
    return () => { confirmarToken() }

  }, [id])

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Confirma tu cuenta y empieza a crear tus <span className="text-slate-700">{" "}proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg bg-white rounded-xl px-5 py-10">
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 uppercase text-slate-500 text-sm"> Inicia Sesion</Link>
        )}

      </div>
    </>
  )
}

export default ConfirmarCuenta
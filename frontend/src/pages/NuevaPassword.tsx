const NuevaPassword = () => {
  return (
    <>
    <h1 className="text-sky-600 text-6xl font-black capitalize">
      Reestablece tu cuenta y administra tus <span className="text-slate-700">{" "}proyectos</span>
    </h1>
    <form className="mt-20 bg-white rounded-lg shadow p-10">
      
      <div className="my-5">
        <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="password">Nuevo Password</label>
        <input id="password" type="password" placeholder="Tu nuevo password" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
      </div>
      <div className="my-5">
        <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="password2">Repetir Password</label>
        <input id="password2" type="password" placeholder="Repite tu password" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
      </div>

      <input type="submit" value="Guardar Password" className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
    </form>
    </>
  )
}

export default NuevaPassword
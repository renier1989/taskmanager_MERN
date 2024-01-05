import { FormularioColaborador } from "../components/FormularioColaborador"

export const NuevoColaborador = () => {
    return (
        <>
            <h1 className="text-4xl font-black">Agreagar Colaborador(a)</h1>
            <div className="mt-10 flex  justify-center">
                <FormularioColaborador />
            </div>
        </>
    )
}

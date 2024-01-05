export const formatearFecha = (fecha:string) => {
    const nuevaFecha = new Date(fecha)

    const options:Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return nuevaFecha.toLocaleDateString('es-ES', options);
}
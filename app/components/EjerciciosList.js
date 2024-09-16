
import EditButton from "./EditButton";
import { createClient } from "@/app/utils/supabase/server";

export default async function EjerciciosList() {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    //console.log(userData)
    
    let ejerciciosArray = [];

    if (userData.user) {
        const { data: ejercicioData, error } = await supabase
        .from('ejercicio')
        .select(`
            *,
            categoriaNombre:ejercicio_categoria(categoria),
            subcategoriaNombre:ejercicio_subcategoria(subcategoria)
        `)
        .order('favorito', { ascending: false })
        .order('nombre');

        if (error) {
            console.error('Error al obtener los ejercicios', error);
        }
        // console.log(ejercicioData)
        ejerciciosArray = ejercicioData;
    }

    let texto = '';

    if (!ejerciciosArray.length) {
        texto = 'No hay ejercicios almacenados.';
    }

    let cabeceraClass = "px-6 py-3 text-start text-xs font-medium text-gray-100 uppercase";
    let rowClass = "px-6 py-3 text-start text-xs font-medium text-gray-100";

    

    return (
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-beige/20">
            <thead className="bg-beige-oscuro">
                <tr>
                    <th className={cabeceraClass}>#</th>
                    <th className={cabeceraClass}>Nombre</th>
                    <th className={cabeceraClass}>Categoría</th>
                    <th className={cabeceraClass}>Subcategoría</th>
                    <th className={cabeceraClass}>Etiquetas</th>
                    <th className={cabeceraClass}></th>
                    <th className={cabeceraClass}></th>
                </tr>
            </thead>
            <tbody>
            {
                ejerciciosArray.length > 0 ? (
                    // Render rows if ejerciciosArray is not empty
                    ejerciciosArray.map((ejercicio) => (
                        <tr key={ejercicio.id} className="hover:bg-beige-oscuro/30">
                            <td className={rowClass}>
                                {ejercicio.id}
                            </td>
                            <td className={rowClass}>
                                {ejercicio.nombre}
                            </td>
                            <td className={rowClass}>
                                {ejercicio.categoriaNombre.categoria}
                            </td>
                            <td className={rowClass}>
                                {ejercicio.subcategoriaNombre.subcategoria}
                            </td>
                            <td className={rowClass}>
                                {ejercicio.etiquetas}
                            </td>
                            <td>
                            {  
                                ejercicio.deprecar
                                    ? <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Deshabilitado</span>
                                    : <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-red-600/10">Habilitado</span>
                            }
                            </td>
                            <td className="flex justify-end items-center">
                            { 
                                ejercicio.favorito
                                ? <span className="inline-flex items-center" ><svg xmlns="http://www.w3.org/2000/svg" className=" text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg></span>
                                : ''
                            }
                            
                                <EditButton id = {ejercicio.id} site = "ejercicios" title = "ejercicio"/>
                            </td>
                        </tr>
                    ))
                ) : (
                    // Render a message or alternative component if ejerciciosArray is empty
                    <tr>
                        <td colSpan={6} className={rowClass}>{texto}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}
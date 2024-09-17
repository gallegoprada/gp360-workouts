
import EditButton from "./EditButton";
import { createClient } from "@/utils/supabase/server";
import { getMaterialPhoto } from "../app/data/materiales/actions";

export default async function MaterialesList() {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    //console.log(userData)
    
    let materialesArray = [];

    if (userData.user) {
        const { data: materialData, error } = await supabase
        .from('material')
        .select('*')
        .order('nombre');

        if (error) {
            console.error('Error al obtener los materiales', error);
        }
        //console.log(materialData)
        materialesArray = materialData;
    }

    let texto = '';

    if (!materialesArray.length) {
        texto = 'No hay materiales almacenados.';
    }

    let cabeceraClass = "px-6 py-3 text-start text-xs font-medium text-gray-100 uppercase";
    let rowClass = "px-6 py-3 text-start text-xs font-medium text-gray-100";

    // Fetch image paths for all materials concurrently
    const paths = await Promise.all(materialesArray.map(async (material) => {
        const path = await getMaterialPhoto('material', material.icono);
        return path;
    }));

    return (
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-beige/20">
            <thead className="bg-beige-oscuro">
                <tr>
                    <th className={cabeceraClass} width="20px"></th>
                    <th className={cabeceraClass}>Material</th>
                    <th className={cabeceraClass}>Icono</th>
                </tr>
            </thead>
            <tbody>
            {
                materialesArray.length > 0 ? (
                    // Render rows if ejerciciosArray is not empty
                    materialesArray.map((material, index) => (
                        <tr key={material.id} className="hover:bg-beige-oscuro/30">
                            <td className="flex justify-end items-center">
                                <EditButton id = {material.id} site = "materiales" title = "material"/>
                            </td>
                            <td className={rowClass}>
                                {material.nombre}
                            </td>
                            <td className={rowClass}>
                                <img src={paths[index]} alt="Icono" className='' width={30} />
                            </td>
                        </tr>
                    ))
                ) : (
                    // Render a message or alternative component if ejerciciosArray is empty
                    <tr>
                        <td colSpan={3} className={rowClass}>{texto}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}
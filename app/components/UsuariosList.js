
import EditButton from "./EditButton";
import { createClient } from "@/app/utils/supabase/server";

export default async function UsuariosList() {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    //console.log(userData)
    
    let usuariosArray = [];

    if (userData.user) {
        const { data: usuarioData, error } = await supabase
        .from('auth.users')
        .select('*');

        if (error) {
            console.error('Error al obtener los usuarios', error);
        }
        console.log(usuarioData)
       // usuariosArray = usuarioData;
    }


    let texto = '';

    if (!usuariosArray.length) {
        texto = 'No hay usuarios almacenados.';
    }

    let cabeceraClass = "px-6 py-3 text-start text-xs font-medium text-gray-100 uppercase";
    let rowClass = "px-6 py-3 text-start text-xs font-medium text-gray-100";

    

    return (
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-beige/20">
            <thead className="bg-beige-oscuro">
                <tr>
                    <th className={cabeceraClass}></th>
                    <th className={cabeceraClass}>Nombre completo</th>
                    <th className={cabeceraClass}>Email</th>
                    <th className={cabeceraClass}>Rol</th>
                </tr>
            </thead>
            <tbody>
            {
                usuariosArray.length > 0 ? (
                    // Render rows if ejerciciosArray is not empty
                    usuariosArray.map((usuario) => (
                        <tr key={usuario.id} className="hover:bg-beige-oscuro/30">
                            <td className="flex justify-end items-center">
                                <EditButton id = {usuario.id} site = "usuarios" title = "usuario"/>
                            </td>
                            <td className={rowClass}>
                                {usuario.full_name}
                            </td>
                            <td className={rowClass}>
                                {usuario.email}
                            </td>
                            <td className={rowClass}>
                                {usuario.admin}
                            </td>
                        </tr>
                    ))
                ) : (
                    // Render a message or alternative component if ejerciciosArray is empty
                    <tr>
                        <td colSpan={4} className={rowClass}>{texto}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}
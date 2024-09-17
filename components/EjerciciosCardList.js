
import { createClient } from "@/utils/supabase/server";
import EjercicioCard from "./EjercicioCard";

export default async function EjerciciosList() {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    
    let ejerciciosArray = [];

    if (userData.user) {
        const { data: ejercicioData, error } = await supabase
        .from('ejercicio')
        .select('*')
        .eq('deprecar', false)
        .order('favorito', { ascending: false })
        .order('nombre_completo')
        
        if (error) {
            console.error('Error al obtener los ejercicios', error);
        }

        ejerciciosArray = ejercicioData;
    }

    
    return (
        <>
            {
                
                ejerciciosArray.length > 0 ? (
                    // Render rows if ejerciciosArray is not empty
                    ejerciciosArray.map((ejercicio) => (
                        <EjercicioCard ejercicio = { ejercicio } key={ejercicio.id}/>                        
                    ))
                ) : (
                    // Render a message or alternative component if ejerciciosArray is empty
                    <div>
                        No hay ejercicios para visualizar
                    </div>
                )
            }
        </>
    )
}
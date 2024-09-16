'use server'

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function insertEjercicio(formData) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const nombre = formData.get('nombre');
    const categoria = formData.get('categoria');
    const subcategoria = formData.get('subcategoria');
    const deprecar = formData.get('deprecar') === '1' ? true : false;
    const favorito = formData.get('favorito') === '1' ? true : false;
    const etiquetas = formData.get('etiquetas');
    const notas = formData.get('notas');
    
    const user = data.user
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try{
        const { data, error } = await supabase.from('ejercicio').insert([
            {
                nombre: nombre,
                categoriaId: categoria,
                subcategoria: subcategoria,
                deprecar: deprecar,
                favorito: favorito,
                etiquetas: etiquetas,
                notas: notas,
            } 
        ]);

        if (error) throw error;
        
        
        return { message: 'Ejercicio agregado satisfactoriamente' };
    } catch(error){
        throw error;
    }
}

export async function deleteEjercicio(ejercicioId){
    const supabase = createClient();
    const {data} = await supabase.auth.getUser();
    const user = data.user;
    if (!user){
        throw Error('Un usuario debe estar autenticado.')
    }
    try {
        const {data,error} = await supabase.from('ejercicio').delete().match({id: ejercicioId, user_id: user.id})
        if (error) throw error;

        revalidatePath('/ejercicios')
        return data;
    } catch(error){
        console.error('Error in insertEjercicio:', error); // Add error logging here
        throw error
    }
}

export async function updateEjercicio(id, formData) {
    console.log(formData)
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const nombre = formData.get('nombre');
    const categoria = formData.get('categoria');
    const subcategoria = formData.get('subcategoria');
    const deprecar = formData.get('deprecar') === '1' ? false : true;
    const favorito = formData.get('favorito') === '1' ? true : false;
    const etiquetas = formData.get('etiquetas');
    const notas = formData.get('notas');

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try {
        const { error } = await supabase
            .from('ejercicio')
            .update({
                nombre: nombre,
                categoriaId: categoria,
                subcategoria: subcategoria,
                deprecar: deprecar,
                favorito: favorito,
                etiquetas: etiquetas,
                notas: notas,
            })
            .eq('id', id);

        if (error) throw error;

        return { message: 'Ejercicio actualizado satisfactoriamente' };
    } catch (error) {
        throw error;
    }
    
}

export async function getEjercicioById(id){
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try{
        const { data, error } = await supabase.from('ejercicio').select('*').filter('id', 'eq', id).single();
        if (error) throw error;       
        
        return data;
    } catch(error){
        throw error;
    }
}

export async function fetchCategories() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }
    try {
        // Fetch categories where deprecar is false
        const { data, error } = await supabase
            .from('ejercicio_categoria')
            .select('*')
            .eq('deprecar', false);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw error;
    }
};
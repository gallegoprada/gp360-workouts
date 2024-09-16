'use server'

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function insertMaterial(formData) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const nombre = formData.get('nombre');
    const iconoFile = formData.get('icono');
    const imagenFile = formData.get('imagen');
    
    const user = data.user
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try{
        let insertedId;
        const { data: materialData, error: materialError } = await supabase
        .from('material')
        .insert([
            {
                nombre: nombre
            }
        ])
        .select();

        if (materialError) {
            materialError.name = 'MaterialInsertError';
            throw materialError;
        }

        if (materialData) {
            // Check if any rows were inserted
            if (materialData.length > 0) {
                // Access the ID of the first inserted row
                insertedId = materialData[0].id;
                console.log('Inserted ID:', insertedId);
                // You can now use the insertedId as needed
            } else {
                console.error('No rows were inserted.');
            }
        }

        const { data: iconoData, error: iconoError } = await supabase
        .storage
        .from('material')
        .upload(`icon/${insertedId}.${iconoFile.name.split('.').pop()}`, iconoFile);
        if (iconoError) {
            iconoError.name = 'IconoUploadError';
            throw iconoError;
        }

        const iconoUrl = iconoData.path;

        const { data: imagenData, error: imagenError } = await supabase
        .storage
        .from('material')
        .upload(`image/${insertedId}.${imagenFile.name.split('.').pop()}`, imagenFile);
        if (imagenError) {
            imagenError.name = 'ImagenUploadError';
            throw imagenError;
        }
        const imagenUrl = imagenData.path;

        // Update material data with icon and image URLs
        const { error: updateError } = await supabase
            .from('material')
            .update({
                icono: iconoUrl,
                imagen: imagenUrl
            })
            .eq('id', insertedId);
        if (updateError) {
            updateError.name = 'MaterialUpdateError';
            throw updateError;
        }

        return { message: 'Material agregado satisfactoriamente' };
    } catch(error){
        throw error;
    }
}

export async function deleteMaterial(materialId){
    const supabase = createClient();
    const {data} = await supabase.auth.getUser();
    const user = data.user;
    if (!user){
        throw Error('Un usuario debe estar autenticado.')
    }
    try {
        const { data, error } = await supabase.from('material').delete().match({id: materialId, user_id: user.id})
        if (error) throw error;

        revalidatePath('/materiales')
        return data;
    } catch(error){
        console.error('Error in deleteMaterial:', error); // Add error logging here
        throw error
    }
}

export async function updateMaterial(id, formData) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const nombre = formData.get('nombre');
    const iconoFile = formData.get('icono');
    const imagenFile = formData.get('imagen');

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }
    
    try {
        let iconoUrl, imagenUrl;
        
        if (iconoFile.size > 0) {
            const { data: iconoData, error: iconoError } = await supabase
            .storage
            .from('material')
            .upload(`icon/${id}.${iconoFile.name.split('.').pop()}`, iconoFile, {
                cacheControl: '3600',
                upsert: true
            });
            if (iconoError) {
                iconoError.name = 'IconoUploadError';
                throw iconoError;
            }
            iconoUrl = iconoData.path;
        }
        
        if (imagenFile.size > 0) {
            const { data: imagenData, error: imagenError } = await supabase
            .storage
            .from('material')
            .upload(`image/${id}.${imagenFile.name.split('.').pop()}`, imagenFile, {
                cacheControl: '3600',
                upsert: true
            });
            if (imagenError) {
                imagenError.name = 'ImagenUploadError';
                throw imagenError;
            }
            imagenUrl = imagenData.path;
            console.log(imagenUrl)
        }

        const { error: error3 } = await supabase
            .from('material')
            .update({
                nombre: nombre,
                icono: iconoUrl,
                imagen: imagenUrl
            })
            .eq('id', id);

        if (error3) throw error3;

        return { message: 'Material actualizado satisfactoriamente' };
    } catch (error) {
        throw error;
    }    
}

export async function getMaterialById(id){
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try {
        const { data: materialData, error: materialError } = await supabase
            .from('material')
            .select('*')
            .eq('id', id)
            .single();

        if (materialError) throw materialError;

        return materialData;
    } catch (error) {
        throw error;
    }
}

export async function getMaterialPhoto(bucket, file_path) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try {
        let url;
        const { data: dataImage, error } = await supabase
            .storage
            .from(bucket)
            .getPublicUrl(file_path);
            

        return dataImage.publicUrl;
    } catch (error) {
        throw error;
    }
}
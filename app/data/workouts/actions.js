'use server'

import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '/supabase-client-helper/Database'
import { revalidatePath } from "next/cache";

export async function fetchSectionTypes() {
    const supabaseClient = useSupabaseClient<Database>();
    
    try {
        // Fetch categories where deprecar is false
        const { data, error } = await supabaseClient
            .from('tipo_seccion')
            .select('*')
            .eq('deprecar', false)
            .order('nombre')

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw error;
    }
};

export async function fetchDurationTypes() {
    const supabaseClient = useSupabaseClient<Database>();

    try {
        // Fetch categories where deprecar is false
        const { data, error } = await supabaseClient
            .from('tipo_duracion_workout')
            .select('*')
            .eq('deprecar', false)
            .order('nombre')

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw error;
    }
};

export async function fetchEjercicios() {
    const supabaseClient = useSupabaseClient<Database>();

    try {
        // Fetch categories where deprecar is false
        const { data, error } = await supabaseClient
            .from('ejercicio')
            .select('*')
            .eq('deprecar', false)
            .order('nombre')

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching ejercicio:', error.message);
        throw error;
    }
};

export async function fetchDificultad() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }
    try {
        // Fetch dificultad
        const { data, error } = await supabase
            .from('dificultad')
            .select('*')
            .order('dificultad')

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching dificultad:', error.message);
        throw error;
    }
};

export async function fetchMateriales() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }
    try {
        // Fetch categories where deprecar is false
        const { data, error } = await supabase
            .from('material')
            .select('*')
            .order('nombre')

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching material:', error.message);
        throw error;
    }
};

export async function fetchIntervaloTypes() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }
    try {
        // Fetch categories where deprecar is false
        const { data, error } = await supabase
            .from('tipo_intervalo')
            .select('*')
            .order('nombre')

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching tipo intervalos:', error.message);
        throw error;
    }
};

export async function insertWorkout(formData) {
    console.log('entra al insertWorkout')
    console.log(formData)
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }
    
    try{
        try {
            // Step 1: Insert the workout details
            const { data: insertedWorkout, error: workoutError } = await supabase
                .from('workout')
                .insert([
                    {
                        nombre: formData.nombre,
                        deprecar: formData.deprecar,
                        favorito: formData.favorito,
                        dificultadId: formData.dificultadId,
                    }
                ])
                .select();
    
            if (workoutError) {
                throw workoutError;
            }
            
            // Step 2: Insert sections related to the workout
            const sectionsWithWorkoutId = formData.sections.map(section => ({
                nombre: section.nombre,
                tipoSeccionId: section.tipoSeccionId,
                tipoDuracionId: section.tipoDuracionId,
                duracion: section.duracion,
                descripcion: section.descripcion,
                sort_order: section.sort_order,
                workoutId: insertedWorkout[0].id, // Assuming id is the generated workout ID
            }));

            const { data: insertedSections, error: sectionError } = await supabase
                .from('seccion')
                .insert(sectionsWithWorkoutId)
                .select();
    
            if (sectionError) {
                throw sectionError;
            }

                        
            // Step 3: Insert intervalo & exercises related to each section
            for (let i = 0; i < formData.sections.length; i++) {
                const exercises = formData.sections[i].ejercicios.map(exercise => ({
                    ejercicio_id: exercise.ejercicioId,
                    materialId: exercise.materialId || null,
                    descripcion: exercise.variacion,
                    dificultadId: 0,
                    imagen: '',
                    link_video_largo: '',
                    link_video_corto: '',
                    etiquetas: '',
                    notas: '',
                    deprecar: false,
                    favorito: false
                }));
    
                const { data: insertedExercises, error: exerciseError } = await supabase
                    .from('variacion')
                    .insert(exercises)
                    .select();
    
                if (exerciseError) {
                    throw exerciseError;
                }

                const intervaloWithSectionId = insertedExercises.map(exercise => ({
                    duracion_reps: formData.sections[i].duracionIntervalo,
                    tipo_intervalo_id: formData.sections[i].tipoIntervaloId,
                    variacionId: exercise.id,
                    seccionId:  insertedSections[i].id, // Assuming id is the generated workout ID
                }));

                // console.log(intervaloWithSectionId)
    
                const { data: insertedIntervalos, error: intervaloError } = await supabase
                    .from('intervalo')
                    .insert(intervaloWithSectionId)
                    .select();
        
                if (intervaloError) {
                    throw intervaloError;
                }
            }
            
            return { message: 'Workout agregado satisfactoriamente' };
        } catch (error) {
            console.error('Error inserting workout:', error.message);
            throw error;
        }
    } catch(error){
        throw error;
    }
    
}

export async function updateWorkout(id, formData) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try {
        // Step 1: Update the workout details
        const { data: updatedWorkout, error: workoutError } = await supabase
            .from('workout')
            .update({
                nombre: formData.nombre,
                deprecar: formData.deprecar,
                favorito: formData.favorito,
                dificultadId: formData.dificultadId,
            })
            .eq('id', id)
            .single();

        if (workoutError) {
            throw workoutError;
        }

        console.log('Updated workout:', updatedWorkout);

        // Step 2: Update or insert sections related to the workout
        const sectionPromises = formData.sections.map(async section => {
            console.log('Processing section:', section);

            const sectionData = {
                nombre: section.nombre,
                tipoSeccionId: section.tipoSeccionId,
                tipoDuracionId: section.tipoDuracionId,
                duracion: section.duracion,
                descripcion: section.descripcion,
                sort_order: section.sort_order,
                workoutId: id,
            };

            try {
                if (section.id) {
                    console.log('Updating section:', section.id);
                    // Update existing section
                    const { data: updatedSection, error: sectionError } = await supabase
                        .from('seccion')
                        .update(sectionData)
                        .eq('id', section.id)
                        .single();

                    if (sectionError) {
                        throw sectionError;
                    }

                    return updatedSection;
                } else {
                    console.log('Inserting new section');
                    // Insert new section
                    const { data: insertedSection, error: sectionError } = await supabase
                        .from('seccion')
                        .insert(sectionData)
                        .single();

                    if (sectionError) {
                        throw sectionError;
                    }

                    return insertedSection;
                }
            } catch (error) {
                console.error('Error updating/inserting section:', error.message);
                throw error;
            }
        });

        // console.log('sectionPromises:', sectionPromises);

        const updatedSections = await Promise.all(sectionPromises);
        console.log('Updated sections:', updatedSections);

        // Step 3: Update or insert exercises (variacion) and intervals (intervalo) related to each section
        for (let i = 0; i < formData.sections.length; i++) {
            const section = formData.sections[i];

            for (let j = 0; j < section.ejercicios.length; j++) {
                const exercise = section.ejercicios[j];
                                
                const exerciseData = {
                    ejercicio_id: exercise.ejercicioId,
                    materialId: exercise.materialId || null,
                    descripcion: exercise.variacion,
                    dificultadId: 0,
                    imagen: '',
                    link_video_largo: '',
                    link_video_corto: '',
                    etiquetas: '',
                    notas: '',
                    deprecar: false,
                    favorito: false,
                };

                try {
                    if (exercise.id) {
                        console.log('Updating exercise:', exercise.id);
                        // Update existing exercise
                        const { data: updatedExercise, error: exerciseError } = await supabase
                            .from('variacion')
                            .update(exerciseData)
                            .eq('id', exercise.id)
                            .single();

                        if (exerciseError) {
                            throw exerciseError;
                        }

                        console.log('Updated exercise:', updatedExercise);

                        const intervaloData = {
                            duracion_reps: section.duracionIntervalo,
                            tipo_intervalo_id: section.tipoIntervaloId,
                            variacionId: exercise.id, // Assuming exercise.id is variacionId
                            seccionId: section.id,
                        };

                        // Insert new intervalo
                        const { data: insertedIntervalo, error: intervaloError } = await supabase
                            .from('intervalo')
                            .update(intervaloData)
                            .eq('id', exercise.intervaloId)
                            .single();

                        if (intervaloError) {
                            throw intervaloError;
                        }

                        console.log('Updated intervalo:', insertedIntervalo);
                        
                    } else {
                        console.log('Inserting new exercise');
                        // Insert new exercise
                        const { data: insertedExercise, error: exerciseError } = await supabase
                            .from('variacion')
                            .insert(exerciseData)
                            .single();

                        if (exerciseError) {
                            throw exerciseError;
                        }

                        console.log('Inserted exercise:', insertedExercise);

                        // Update exercise with the inserted exercise ID
                        exercise.id = insertedExercise.id;

                        const intervaloData = {
                            duracion_reps: section.duracionIntervalo,
                            tipo_intervalo_id: section.tipoIntervaloId,
                            variacionId: insertedExercise.id, // Assuming exercise.id is variacionId
                            seccionId: section.id,
                        };

                        // Insert new intervalo
                        const { data: insertedIntervalo, error: intervaloError } = await supabase
                            .from('intervalo')
                            .insert(intervaloData)
                            .single();

                        if (intervaloError) {
                            throw intervaloError;
                        }

                        console.log('Inserted intervalo:', insertedIntervalo);

                        // Update ejercicio with the inserted intervalo ID
                        exercise.intervaloId = insertedIntervalo.id;
                    }
                } catch (error) {
                    console.error('Error updating/inserting exercise:', error.message);
                    throw error;
                }
            }
        }

        return { message: 'Workout actualizado satisfactoriamente' };
    } catch (error) {
        console.error('Error updating workout:', error.message);
        throw error;
    }
}

export async function getWorkoutById(id){
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user = data.user;
    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try{
        // Fetch workout data
        const { data: workout, error: workoutError } = await supabase
            .from('workout')
            .select('*')
            .eq('id', id)
            .single();

        if (workoutError) {
            throw workoutError;
        }

        if (!workout) {
            throw new Error('Workout not found');
        }

        // Fetch sections related to the workout
        const { data: sections, error: sectionError } = await supabase
            .from('seccion')
            .select('*')
            .eq('workoutId', id)
            .eq('deprecar', false)
            .order('sort_order');
        
        if (sectionError) {
            throw sectionError;
        }

        // Fetch all intervalo data related to these sections
        const sectionIds = sections.map(section => section.id); // Assuming id is the primary key

        const { data: intervalos, error: intervaloError } = await supabase
            .from('intervalo')
            .select('*')
            .in('seccionId', sectionIds)
            .eq('deprecar', false)
            .select();

        if (intervaloError) {
            throw intervaloError;
        }
        // console.log('**** INTERVALOS ****')
        // console.log(intervalos)
        // console.log('****  ****')

        // Fetch variacion data for each intervalo
        const variaciones = await Promise.all(intervalos.map(async intervalo => {
            const { data: variacionData, error: variacionError } = await supabase
                .from('variacion')
                .select('*')
                .eq('id', intervalo.variacionId)
                .eq('deprecar', false);

            if (variacionError) {
                throw variacionError;
            }

            // Assuming there's only one variacion per intervalo
            const variacion = variacionData[0];

            // Map variacion data to desired structure
            return { ...variacion, seccionId: intervalo.seccionId };
        }));

        // console.log('**** VARIACIONES ****')
        // console.log(variaciones)
        // console.log('****  ****')

        // Map variaciones to ejercicios in each section
        sections.forEach(section => {
            section.tipoIntervaloId = intervalos.filter(intervalo => intervalo.seccionId === section.id)[0].tipo_intervalo_id;
            section.duracionIntervalo = intervalos.filter(intervalo => intervalo.seccionId === section.id)[0].duracion_reps;
            section.variacionId = intervalos.filter(intervalo => intervalo.seccionId === section.id)[0].variacionId;
            section.ejercicios = variaciones
                .filter(variacion => variacion.seccionId === section.id)
                .map(variacion => ({
                    ejercicioId: variacion.ejercicio_id,
                    materialId: variacion.materialId || "",
                    variacion: variacion.descripcion || "",
                    id: variacion.id,
                    intervaloId: intervalos.find(intervalo => intervalo.variacionId === variacion.id)?.id
                }));
            // console.log(' --- EJERCICIOS')
            // console.log(section.ejercicios)
        });

        // Attach sections to workout object
        workout.sections = sections;

        // console.log(workout)

        return workout;
    } catch(error){
        throw error;
    }
}

export async function deleteEjercicio(id){
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }

    try {
        const { data: updatedVariacion, error: variacionError } = await supabase
            .from('variacion')
            .update({ deprecar: true })
            .eq('id', id)
            .single();

        if (variacionError) {
            throw variacionError;
        }

        const { data: updatedIntervalo, error: intervaloError } = await supabase
            .from('intervalo')
            .update({ deprecar: true })
            .eq('variacionId', id)
            .single();

        if (intervaloError) {
            throw intervaloError;
        }

        return { success: true }; // Return success indicator
    } catch (error) {
        console.error('Error deleting ejercicio:', error.message);
        throw { success: false, error: error.message }; // Throw error with message
    }
}

export async function deleteSeccion(id){
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
        throw Error('Un usuario debe estar autenticado');
    }
    console.log('borrar seccion ', id)
    try {
        const { data: updatedSection, error: sectionError } = await supabase
            .from('seccion')
            .update({ deprecar: true })
            .eq('id', id)
            .single();

        if (sectionError) {
            throw sectionError;
        }

        const { data: updatedIntervalo, error: intervaloError } = await supabase
            .from('intervalo')
            .update({ deprecar: true })
            .eq('seccionId', id)
            .select();

        if (intervaloError) {
            throw intervaloError;
        }

        const { data: updatedVariacion, error: variacionError } = await supabase
            .from('variacion')
            .update({ deprecar: true })
            .eq('id', updatedIntervalo[0].variacionId);

        if (variacionError) {
            throw variacionError;
        }        

        return { success: true }; // Return success indicator
    } catch (error) {
        console.error('Error deleting ejercicio:', error.message);
        throw { success: false, error: error.message }; // Throw error with message
    }
}
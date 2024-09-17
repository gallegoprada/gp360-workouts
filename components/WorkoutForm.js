'use client'
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import SectionDynamicForm from './SectionDynamicForm';
import { divClass, sectionClass, headingClass, labelClass, inputClass, buttonClass } from '../app/constants/Form';
import { insertWorkout, fetchDificultad, updateWorkout, getWorkoutById, deleteSeccion } from '../app/data/workouts/actions';

export default function WorkoutForm({ workoutId }) {
    const [submitting, setSubmitting] = useState(false);

    const [dificultadType, setDificultadType] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        dificultadId: '',
        deprecar: false,
        favorito: false,
        sections: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dificultadType = await fetchDificultad();
                setDificultadType(dificultadType);
            } catch (error) {
                console.error('Error fetching dificultad types:', error);
                toast.error('Failed to fetch dificultad types data.');
            }
        };
        fetchData();

        

        if (workoutId !== 0) {
            // Fetch ejercicio data when component mounts
            const fetchWorkoutData = async () => {
                try {
                    const formData = await getWorkoutById(workoutId.params.workoutId);
                    
                    console.log(formData)
                    setFormData(formData);
                } catch (error) {
                    console.error('Error fetching Workout:', error);
                    toast.error('Failed to fetch Workout data.');
                }
            };
            fetchWorkoutData();
        }
    }, [workoutId]);

    const handleSectionDataChange = (updatedSections) => {
        setFormData({...formData, sections: updatedSections});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const response = workoutId === 0 ? await insertWorkout(formData) : await updateWorkout(workoutId.params.workoutId, formData);
            
            toast.success(response.message);
            
            // Redirect or perform any other actions after successful insertion
            // Redirecting after 3 seconds
            setTimeout(() => {
                // Redirect logic here
                window.location.replace('/panel/workouts')
            }, 2000);
        } catch (error) {
            console.error('Error adding workouts:', error);
            toast.error('Failed to add workouts.');
            console.log('Error:', error); // Log the error here
        } finally {
            setSubmitting(false); // Reset submitting state to false after submission completes
        }
    };

    const handleSectionDelete = async (sectionIndex) => {
        const updatedSections = formData.sections;
        const sectionToDelete = updatedSections[sectionIndex];
        
        if (!sectionToDelete.id) {
            console.warn('Section does not have an id. Cannot deprecate in database.');
            updatedSections.splice(sectionIndex, 1);
            setFormData({ ...formData, sections: updatedSections });
            return;
        }

        console.log('id a borrar ',sectionToDelete.id, ' index ', sectionIndex)

        // Call deprecateExercise to mark exercise as deprecated in the database
        try {
            const { success, error } = await deleteSeccion(sectionToDelete.id);
            if (success) {
                // Remove exercise locally if successful
                updatedSections.splice(sectionIndex, 1);
                setFormData({ ...formData, sections: updatedSections });

            } else {
                console.error('Error marking section as deprecated:', error);
                // Handle error (show an alert or toast message)
            }
        } catch (error) {
            console.error('Error marking section as deprecated:', error);
            // Handle error (show an alert or toast message)
        }

        
    };

    return (
        <form action={handleSubmit}>
            <div className={sectionClass}>
                <h2 className={headingClass}>Datos generales del workout</h2>
                <div className={`${divClass} required`}>
                    <label htmlFor="nombre" className={labelClass} >Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className={inputClass}
                        value={formData.nombre || '' }
                        onChange= {handleChange}
                        required
                    />
                </div>
                <div className={`${divClass} required`}>
                    <label htmlFor="dificultadId" className={labelClass} >Dificultad</label>
                    <select
                            id="dificultadId"
                            name="dificultadId"
                            className={inputClass}
                            value={formData.dificultadId || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar dificultad</option>
                            {dificultadType.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.dificultad}
                                </option>
                            ))}
                        </select>
                </div>
                <div className={`${divClass} flex`}>
                    <div className="flex items-center h-5 mt-1">
                        <input
                            className="me-2 mt-[0.3rem] h-4 w-8 appearance-none rounded-[0.4375rem] bg-red-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-green-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-green-500 dark:checked:after:bg-primary"
                            type="checkbox"
                            role="switch"
                            checked={!formData.deprecar || !workoutId}
                            onChange={(e) => setFormData({ ...formData, deprecar: !e.target.checked })}
                            value="1"
                            id="deprecar"
                            name="deprecar" />
                    </div>
                    <label htmlFor="deprecar" className="ms-3">
                        <span className={labelClass}>Habilitado</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-500">Destildar esta opción si desea que no aparezca en los listados.</span>
                    </label>
                </div>
                <div className={`${divClass} flex`}>
                    <div className="flex items-center h-5 mt-1">
                        <input
                            className="me-2 mt-[0.3rem] h-4 w-8 appearance-none rounded-[0.4375rem] bg-red-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-green-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-green-500 dark:checked:after:bg-primary"
                            type="checkbox"
                            role="switch"
                            checked={formData.favorito}
                            onChange= {handleChange}
                            value="1"
                            id="favorito" 
                            name="favorito" />
                    </div>
                    <label htmlFor="favorito" className="ms-3">
                        <span className={labelClass}>Favorito</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-500">Tildar esta opción si desea que figure como favorito el workout.</span>
                    </label>
                </div> 
            </div>
            
            <SectionDynamicForm 
                onSectionDataChange={handleSectionDataChange}
                initialSections={formData.sections}
                onSectionDelete={handleSectionDelete}
            />
            
            <button
                type="submit"
                className={buttonClass}
                disabled={submitting}
            >
                {workoutId ? 'Actualizar' : 'Crear'} workout
            </button>
        </form>
    )
}
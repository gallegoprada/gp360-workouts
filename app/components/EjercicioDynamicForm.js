import React, { useEffect, useState } from 'react';
import { divClass, divFullClass, headingClass, labelClass, inputClass, buttonClass, ejercicioClass } from '../constants/Form';
import { fetchEjercicios, fetchMateriales } from '../data/workouts/actions';


export default function EjercicioDynamicForm({ sectionIndex, onEjercicioDataChange, onExerciseDelete, initialEjercicio }) {
    const [ejercicios, setEjercicios] = useState([]);
    const [ejercicioTypes, setEjercicioTypes] = useState([]);
    const [materiales, setMateriales] = useState([]);

    useEffect(() => {
        setEjercicios(initialEjercicio);
    }, [initialEjercicio]);

    const addEjercicio = () => {
        setEjercicios([...ejercicios, {
            ejercicioId: '',
            materialId: '',
            variacion: '',
        }]);
    };

    const handleEjercicioChange = (index, fieldName, value) => {
        const updatedEjercicios = [...ejercicios];
        updatedEjercicios[index] = {
            ...updatedEjercicios[index],
            [fieldName]: value,
        };

        // Ensure `materialId` is set to `null` if it's an empty string
        if (fieldName === 'materialId' && value === '') {
            updatedEjercicios[index][fieldName] = null; // or set to another appropriate default
        }
        
        setEjercicios(updatedEjercicios);
        
        // Notify parent component of ejercicio data changes within a section
        onEjercicioDataChange(sectionIndex, updatedEjercicios);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ejercicioTypes = await fetchEjercicios();
                setEjercicioTypes(ejercicioTypes);
            } catch (error) {
                console.error('Error fetching Ejercicio types:', error);
                toast.error('Failed to fetch Ejercicio types data.');
            }

            try {
                const materiales = await fetchMateriales();
                setMateriales(materiales);
            } catch (error) {
                console.error('Error fetching durationType:', error);
                toast.error('Failed to fetch durationType data.');
            }
        };
        fetchData();

        addEjercicio();
    }, []);

    const handleExerciseDelete = (index) => {
        // Implement the delete functionality
        // Pass the index of the exercise to be deleted and call onExerciseDelete
        onExerciseDelete(sectionIndex, index);
    };

    return (
        <div>
            {/* Render existing Ejercicios */}
            {ejercicios.map((ejercicio, index) => (
                <div key={index} className={ejercicioClass}>
                    <div className="flex items-center col-span-full">
                        <h2 className={`${headingClass} inline-block`}>Ejercicio #{index+1}</h2>
                        <button
                            type="button"
                            className="inline-flex p-2 bg-red-500 
                            rounded-md shadow-lg cursor-pointer ml-auto"
                            title="Eliminar Ejercicio"
                            onClick={() => handleExerciseDelete(index)}
                        >
                            <svg className="h-4 w-4 text-white" fill="white" viewBox="0 0 30 30" stroke="currentColor" aria-hidden="true">
                                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`${divClass} required`}>
                        <label htmlFor={`ejercicioId-${index}`} className={labelClass} >Ejercicio</label>
                        <select
                            id={`ejercicioId-${index}`}
                            name={`ejercicioId-${index}`}
                            className={inputClass}
                            value={ejercicio.ejercicioId}
                            onChange={(e) => handleEjercicioChange(index, 'ejercicioId', e.target.value)}
                            required
                        >
                            <option value="">Seleccionar ejercicio</option>
                            {ejercicioTypes.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={`${divClass} pr-0`}>
                        <label htmlFor={`materialId-${index}`} className={labelClass} >Tiene material?</label>
                        <select
                            id={`materialId-${index}`}
                            name={`materialId-${index}`}
                            className={inputClass}
                            value={ejercicio.materialId}
                            onChange={(e) => handleEjercicioChange(index, 'materialId', e.target.value)}
                        >
                            <option value="">No posee material</option>
                            {materiales.map((material) => (
                                <option key={material.id} value={material.id}>
                                    {material.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={`${divFullClass} pr-0`}>
                        <label htmlFor={`variacion-${index}`} className={labelClass} >Variación</label>
                        <input
                            type="text"
                            id={`variacion-${index}`}
                            name={`variacion-${index}`}
                            className={inputClass}
                            value={ejercicio.variacion || ''}
                            onChange={(e) => handleEjercicioChange(index, 'variacion', e.target.value)}
                        />
                    </div>
                </div>
            ))}

            {/* Button to add new Ejercicio */}
            <button type='button' onClick={addEjercicio} className="mt-4 pb-4 w-full border border-beige-oscuro border-dashed hover:bg-beige-oscuro col-span-full pt-4 px-10 block text-2xl font-titulo mb-2 dark:text-white rounded">
                Haz click aquí para agregar un EJERCICIO
            </button>
        </div>
    );
}

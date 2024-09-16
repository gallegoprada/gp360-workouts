import React, { useEffect, useState } from 'react';
import { divClass, divFullClass, sectionClass, headingClass, labelClass, inputClass, buttonClass } from '../constants/Form';
import { fetchSectionTypes, fetchDurationTypes, fetchIntervaloTypes, deleteEjercicio } from '../data/workouts/actions';
import EjercicioDynamicForm from './EjercicioDynamicForm';


export default function SectionDynamicForm({ onSectionDataChange, onSectionDelete, initialSections }) {
    const [sections, setSections] = useState([]);
    const [sectionTypes, setSectionTypes] = useState([]);
    const [durationType, setDurationTypes] = useState([]);
    const [intervaloTypes, setIntervaloTypes] = useState([]);
    
    useEffect(() => {
        console.log(initialSections)
        setSections(initialSections);
    }, [initialSections]);

    const addSection = () => {
        const newSection = {
            nombre: '',
            tipoSeccionId: '',
            descripcion: '',
            tipoDuracionId: '',
            duracion: '',
            tipoIntervaloId: '',
            duracionIntervalo: '',
            sort_order: 0,
            ejercicios: [] // You can initialize with an empty array or default values
        };
        setSections([...sections, newSection]);
    };

    const handleSectionInputChange = (index, fieldName, value) => {
        const updatedSections = [...sections];
        updatedSections[index][fieldName] = value;
        setSections(updatedSections);
        // Notify parent component of section data changes
        onSectionDataChange(updatedSections);
    };

    const handleEjercicioDataChange = (sectionIndex, updatedEjercicios) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].ejercicios = updatedEjercicios;
        setSections(updatedSections);
        // Notify parent component of section data changes
        onSectionDataChange(updatedSections);
    };

    const handleExerciseDelete = async (sectionIndex, exerciseIndex) => {
        const updatedSections = [...sections];
        const exerciseToDelete = updatedSections[sectionIndex].ejercicios[exerciseIndex];
        console.log('******* ANTES')
        console.log(updatedSections[sectionIndex].ejercicios)

        console.log('******* A BORRAR')
        console.log(updatedSections[sectionIndex].ejercicios[exerciseIndex])


        // Check if the exercise has an id
        if (!exerciseToDelete.id) {
            console.warn('Exercise does not have an id. Cannot deprecate in database.');
            updatedSections[sectionIndex].ejercicios.splice(exerciseIndex, 1);
            setSections(updatedSections);
            onSectionDataChange(updatedSections);
            return;
        }

        console.log('id a borrar ',exerciseToDelete.id)

        // Call deprecateExercise to mark exercise as deprecated in the database
        try {
            const { success, error } = await deleteEjercicio(exerciseToDelete.id);
            if (success) {
                // Remove exercise locally if successful
                updatedSections[sectionIndex].ejercicios.splice(exerciseIndex, 1);
                setSections(updatedSections);
                onSectionDataChange(updatedSections);

                console.log('******* DESPUES')
                console.log(updatedSections[sectionIndex].ejercicios)
            } else {
                console.error('Error marking exercise as deprecated:', error);
                // Handle error (show an alert or toast message)
            }
        } catch (error) {
            console.error('Error marking exercise as deprecated:', error);
            // Handle error (show an alert or toast message)
        }

        
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectionTypes = await fetchSectionTypes();
                setSectionTypes(sectionTypes);
            } catch (error) {
                console.error('Error fetching section types:', error);
                toast.error('Failed to fetch section types data.');
            }

            try {
                const durationType = await fetchDurationTypes();
                setDurationTypes(durationType);
            } catch (error) {
                console.error('Error fetching durationType:', error);
                toast.error('Failed to fetch durationType data.');
            }

            fetchDurationTypes

            try {
                const intervaloTypes = await fetchIntervaloTypes();
                setIntervaloTypes(intervaloTypes);
            } catch (error) {
                console.error('Error fetching intervaloTypes:', error);
                toast.error('Failed to fetch intervaloTypes data.');
            }
        };
        fetchData();

        addSection();
    }, []);

    const handleSectionDelete = (index) => {
        onSectionDelete(index);
    };

    return (
        <div>
            {/* Render existing sections */}
            {sections.map((section, index) => (
                <div key={index} className={sectionClass}>
                    
                    <div className="flex items-center col-span-full">
                        <h2 className={`${headingClass} inline-block`}>Sección #{index+1}</h2>
                        <button
                            type="button"
                            className="inline-flex p-2 mr-10 bg-red-500 
                            rounded-md shadow-lg cursor-pointer ml-auto"
                            title="Eliminar Ejercicio"
                            onClick={() => handleSectionDelete(index)}
                        >
                            <svg className="h-4 w-4 text-white" fill="white" viewBox="0 0 30 30" stroke="currentColor" aria-hidden="true">
                                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`${divClass} required`}>
                        <label htmlFor={`nombre-${index}`} className={labelClass} >Nombre sección</label>
                        <input
                            type="text"
                            id={`nombre-${index}`}
                            name={`nombre-${index}`}
                            className={inputClass}
                            value={section.nombre || ''}
                            required
                            onChange={(e) => handleSectionInputChange(index, 'nombre', e.target.value)}
                        />
                    </div>

                    <div className={`${divClass} required`}>
                        <label htmlFor={`tipoSeccionId-${index}`} className={labelClass} >Tipo</label>
                        <select
                            id={`tipoSeccionId-${index}`}
                            name={`tipoSeccionId-${index}`}
                            className={inputClass}
                            value={section.tipoSeccionId || ''}
                            onChange={(e) => handleSectionInputChange(index, 'tipoSeccionId', e.target.value)}
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            {sectionTypes.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={`${divFullClass} required`}>
                        <label htmlFor={`descripcion-${index}`} className={labelClass} >Descripción</label>
                        <input
                            type="text"
                            id={`descripcion-${index}`}
                            name={`descripcion-${index}`}
                            className={inputClass}
                            required
                            value={section.descripcion || ''}
                            onChange={(e) => handleSectionInputChange(index, 'descripcion', e.target.value)}
                        />
                    </div>

                    <div className={`${divClass} required`}>
                        <label htmlFor={`tipoDuracionId-${index}`} className={labelClass} >Tipo Duración</label>
                        <select
                            id={`tipoDuracionId-${index}`}
                            name={`tipoDuracionId-${index}`}
                            className={inputClass}
                            value={section.tipoDuracionId || ''}
                            onChange={(e) => handleSectionInputChange(index, 'tipoDuracionId', e.target.value)}
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            {durationType.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`${divClass} required`}>
                        <label htmlFor={`duracion-${index}`} className={labelClass} >Duración (tiempo o vueltas)</label>
                        <input
                            type="text"
                            id={`duracion-${index}`}
                            name={`duracion-${index}`}
                            className={inputClass}
                            required
                            placeholder='En segundos o cantidad vueltas'
                            value={section.duracion || ''}
                            onChange={(e) => handleSectionInputChange(index, 'duracion', e.target.value)}
                        />
                    </div>

                    <div className={`${divClass} required`}>
                        <label htmlFor={`tipoIntervaloId-${index}`} className={labelClass} >Tipo Intervalo</label>
                        <select
                            id={`tipoIntervaloId-${index}`}
                            name={`tipoIntervaloId-${index}`}
                            className={inputClass}
                            value={section.tipoIntervaloId || ''}
                            onChange={(e) => handleSectionInputChange(index, 'tipoIntervaloId', e.target.value)}
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            {intervaloTypes.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`${divClass} required`}>
                        <label htmlFor={`duracionIntervalo-${index}`} className={labelClass} >Duración intervalo (tiempo o repeticiones)</label>
                        <input
                            type="text"
                            id={`duracionIntervalo-${index}`}
                            name={`duracionIntervalo-${index}`}
                            className={inputClass}
                            required
                            placeholder="En segundos o cantidad de repeticiones"
                            value={section.duracionIntervalo || ''}
                            onChange={(e) => handleSectionInputChange(index, 'duracionIntervalo', e.target.value)}
                        />
                    </div>

                    <input 
                        type="hidden"
                        id={`sort_order-${index}`}
                        name={`sort_order-${index}`}
                        value={section.sort_order || index+1}
                    />
                    
                    <div className={divFullClass}>
                        <EjercicioDynamicForm 
                            sectionIndex={index} 
                            onEjercicioDataChange={handleEjercicioDataChange} 
                            onExerciseDelete={handleExerciseDelete}
                            initialEjercicio={section.ejercicios}
                        />
                    </div>
                </div>
            ))}

            {/* Button to add new section */}
            <button type='button' onClick={addSection} className="mt-4 pb-4 w-full border border-beige-oscuro border-dashed hover:bg-beige-oscuro col-span-full pt-4 px-10 block text-2xl font-titulo mb-2 dark:text-white rounded">
                Haz click aquí para agregar una SECCIÓN
            </button>
        </div>
    );
}

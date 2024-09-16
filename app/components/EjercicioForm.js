'use client'
import React, { useEffect, useState } from 'react';
import { getEjercicioById, insertEjercicio, updateEjercicio, fetchCategories, fetchSubcategories } from '../data/ejercicios/actions';
import { toast } from "react-toastify";
import { divClass, sectionClass, headingClass, labelClass, inputClass, buttonClass } from '../constants/Form';

export default function EjercicioForm({ ejercicioId }) {    
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        subcategoria: '',
        deprecar: false, // or true depending on your logic
        favorito: false, // or true depending on your logic
        etiquetas: '',
        notas: ''
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to fetch categories data.');
            }

            try {
                const subcategoriesData = await fetchSubcategories();
                setSubcategories(subcategoriesData);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                toast.error('Failed to fetch subcategories data.');
            }
        };
        fetchData();

        if (ejercicioId !== 0) {
            // Fetch ejercicio data when component mounts
            const fetchEjercicioData = async () => {
                try {
                    const data = await getEjercicioById(ejercicioId.params.ejercicioId);
                    
                    //console.log(data)
                    setFormData(data);
                } catch (error) {
                    console.error('Error fetching ejercicio:', error);
                    toast.error('Failed to fetch ejercicio data.');
                }
            };
            fetchEjercicioData();
        }
    }, [ejercicioId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
    };

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true);
            const response = ejercicioId === 0 ? await insertEjercicio(formData) : await updateEjercicio(ejercicioId.params.ejercicioId, formData);
            
            toast.success(response.message);
            
            // Redirect or perform any other actions after successful insertion
            // Redirecting after 3 seconds
            setTimeout(() => {
                // Redirect logic here
                window.location.replace('/panel/ejercicios')
            }, 2000);
        } catch (error) {
            console.error('Error adding ejercicio:', error);
            toast.error('Failed to add ejercicio.');
            console.log('Error:', error); // Log the error here
        } finally {
            setSubmitting(false); // Reset submitting state to false after submission completes
        }
    };

    /*action ={ onSubmit }*/

    return (
        <form action={handleSubmit}  className="">
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
                <label htmlFor="categoria" className={labelClass} >Categoría</label>
                <select
                    id="categoria"
                    name="categoria"
                    className={inputClass}
                    value={formData.categoriaId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.categoria}
                        </option>
                    ))}
                </select>
            </div>
            <div className={`${divClass} required`}>
                <label htmlFor="subcategoria" className={labelClass} >Subcategoría</label>
                <select
                    id="subcategoria"
                    name="subcategoria"
                    className={inputClass}
                    value={formData.subcategoriaId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar una subcategoría</option>
                    {subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.subcategoria}
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
                        checked={!formData.deprecar || !ejercicioId}
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
                    {/*<input 
                    id="favorito" 
                    name="favorito" 
                    type="checkbox" 
                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    aria-describedby="favorito"
                    checked={formData.favorito}
                    onChange= {handleChange}
                    value="1"/>*/}
                </div>
                <label htmlFor="favorito" className="ms-3">
                    <span className={labelClass}>Favorito</span>
                    <span className="block text-sm text-gray-600 dark:text-gray-500">Tildar esta opción si desea figure como favorito el ejercicio.</span>
                </label>
            </div>
            <div className={divClass}>
                <label htmlFor="etiquetas" className={labelClass} >Etiquetas</label>
                <input
                    type="text"
                    id="etiquetas"
                    name="etiquetas"
                    value={formData.etiquetas || ''}
                    onChange= {handleChange}
                    className={inputClass}
                />
            </div>
            <div className={divClass}>
                <label htmlFor="notas" className={labelClass} >Notas</label>
                <textarea
                    id="notas"
                    name="notas"
                    className={inputClass}
                    defaultValue={formData.notas || ''}
                    onChange= {handleChange}
                ></textarea>
            </div>
            <button
                type="submit"
                className={buttonClass}
                disabled={submitting}
            >
                {ejercicioId ? 'Actualizar ejercicio' : 'Agregar ejercicio'}
            </button>
        </form>
    )
}
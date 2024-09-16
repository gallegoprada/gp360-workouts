'use client'
import React, { useEffect, useState } from 'react';
import { getMaterialById, insertMaterial, updateMaterial, getMaterialPhoto } from '../data/materiales/actions';
import { toast } from "react-toastify";

export default function MaterialForm({ materialId }) {
    const [previousImageUrl, setPreviousImageUrl] = useState('');
    const [previousIconUrl, setPreviousIconUrl] = useState('');
    const divClass = "py-4 px-10";
    const labelClass = "block text-sm font-medium mb-2 dark:text-white";
    const inputClass = "py-3 px-4 block text-black  w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600";
    const buttonClass = "ml-10 mt-10 bg-transparent border border-green-500  hover:bg-green-700 text-white hover:text-black font-bold py-2 px-6 rounded"
    
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        iconoFile: null,
        imagenFile: null,
    });

    useEffect(() => {
        if (materialId !== 0) {
            // Fetch material data when component mounts
            const fetchMaterialData = async () => {
                try {
                    const data = await getMaterialById(materialId.params.materialId);
                    //console.log(data)
                    setFormData(data);

                    if (data.imagen) {
                        const imageUrl = await getMaterialPhoto('material', data.imagen);
                        setPreviousImageUrl(imageUrl);
                    }
                    if (data.icono) {
                        const iconUrl = await getMaterialPhoto('material', data.icono);
                        setPreviousIconUrl(iconUrl);
                    }
                } catch (error) {
                    console.error('Error fetching material:', error);
                    toast.error('Failed to fetch material data.');
                }
            };
            fetchMaterialData();
        }
    }, [materialId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
    };

    const handleIconoUpload = (e) => {
        setFormData({ ...formData, iconoFile: e.target.files[0] });
        // Display thumbnail of the uploaded icon
        const reader = new FileReader();
        reader.onload = () => {
            setPreviousIconUrl(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleImagenUpload = (e) => {
        setFormData({ ...formData, imagenFile: e.target.files[0] });
        // Display thumbnail of the uploaded image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviousImageUrl(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true);
            const response = materialId === 0 ? await insertMaterial(formData) : await updateMaterial(materialId.params.materialId, formData);
            
            toast.success(response.message);
            
            setTimeout(() => {
                // Redirect logic here
                window.location.replace('/panel/materiales')
            }, 2000);
        } catch (error) {
            console.error('Error adding material:', error);
            toast.error('Failed to add material.');
            console.log('Error:', error); // Log the error here
        } finally {
            setSubmitting(false); // Reset submitting state to false after submission completes
        }
    };
    
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
                <label htmlFor="icono" className={labelClass}>Icono</label>
                <input
                    type="file"
                    id="icono"
                    name="icono"
                    onChange={handleIconoUpload}
                    required = { materialId === 0 ? true : false }
                />

                {previousIconUrl && (
                    <img src={previousIconUrl} alt="Icono" className='mt-2' width={40} />
                )}
            </div>
            <div className={`${divClass} required`}>
                <label htmlFor="imagen" className={labelClass}>Imagen</label>
                <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    onChange={handleImagenUpload}
                    required = { materialId === 0 ? true : false }
                />

                {previousImageUrl && (
                    <img class="h-auto max-w-md rounded-lg mt-2" src={previousImageUrl} alt="Imagen" />
                )}
            </div>
            <button
                type="submit"
                className={buttonClass}
                disabled={submitting}
            >
                { materialId ? 'Actualizar material' : 'Agregar material'}
            </button>
        </form>
    )
}
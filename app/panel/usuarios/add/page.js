"use client";

import EjercicioForm from "/components/EjercicioForm";
import Header from "/components/Header";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function addEjercicio() {
    return (
        <>
            <Header />
            <ToastContainer autoClose={3000}/>
            <main className="bg-fondo min-h-screen flex justify-center text-white">
                <div className="container pb-20">
                <div className="flex justify-between items-center">
                        <div className='flex pb-4 pt-10 px-10 grid m-2 text-3xl font-medium text-letras-header'>
                            AGREGAR EJERCICIO
                        </div>
                    </div>
                    <div className="px-10">
                        <EjercicioForm ejercicioId={0} />
                    </div>
                </div>
            </main>
        </>
        
    )
}
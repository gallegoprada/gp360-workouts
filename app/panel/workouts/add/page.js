"use client";

import WorkoutForm from "./components/WorkoutForm";
import Header from "/components/Header";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cabecera from "@/components/Cabecera";

export default function addWorkout() {
    return (
        <>
            <Header />
            <ToastContainer autoClose={3000}/>
            <main className="bg-fondo min-h-screen flex justify-center text-white">
                <div className="container pb-20">
                    <Cabecera titulo = "Agregar Workout" />
                    <div className="px-10">
                    <WorkoutForm workoutId={0} />
                    </div>                    
                </div>
            </main>
        </>
        
    )
}
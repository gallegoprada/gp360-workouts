import WorkoutForm from "../../../components/WorkoutForm";
import Header from "../../../components/Header";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cabecera from "@/app/components/Cabecera";

export default function editWorkout(workoutId) {
  return (
    <>
            <Header />
            <ToastContainer autoClose={3000}/>
            <main className="bg-fondo min-h-screen flex justify-center text-white">
                <div className="container pb-20">
                    <Cabecera titulo = "Editar Workout" />
                    <div className="px-10">
                    <WorkoutForm workoutId={workoutId} />
                    </div>                    
                </div>
            </main>
        </>
  )
}
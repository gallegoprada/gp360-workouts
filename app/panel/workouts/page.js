
import Link from "next/link";
import Header from "../../components/Header";
import WorkoutsList from "../../components/WorkoutsList";
import Cabecera from "@/app/components/Cabecera";

export default async function Workouts() {   

    return (
        <>
            <Header />
            <main className="bg-fondo min-h-screen flex justify-center text-white overflow-x-auto">
                <div className="container pb-20">
                    <Cabecera titulo = "LISTADO DE Workouts" />
                    <div className="flex justify-between items-center md:float-right">
                        <div className="flex md:float-right px-10 pb-2">
                            <Link href="/panel/workouts/add" className="flex">
                                <button 
                                className="bg-transparent px-2 py-2 hover:bg-green-700 text-white font-medium hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded inline-flex items-center"
                                >
                                    
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="#ffffff"></path>
                                        </svg>
                                        &nbsp;Agregar
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="px-10">
                        <WorkoutsList />
                    </div>                    
                </div>
            </main>
        </>
    )
}
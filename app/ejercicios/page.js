
import Header from "../components/Header";
import EjerciciosCardList from "../components/EjerciciosCardList";
import Cabecera from "../components/Cabecera";

export default async function Ejercicios() {   

    return (
        <>
            <Header />
            <main className="bg-fondo min-h-screen flex justify-center text-white">
                <div className="container pb-20">
                    <Cabecera titulo = "LISTADO DE EJERCICIOS" />
                    <div className="px-10 inline-flex">
                        <EjerciciosCardList />
                    </div>                    
                </div>
            </main>
        </>
    )
}
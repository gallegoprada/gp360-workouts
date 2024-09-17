"use client";

import Header from "/components/Header";
import Cabecera from "/components/Cabecera";
import PanelCard from "/components/PanelCard";

export default async function PanelAdministracion() {

    const menuItems = [
        { label: 'Workouts', subtitulo: '', href: '/workouts' },
        { label: 'Ejercicios', subtitulo: '',  href: '/ejercicios' },
        { label: 'Materiales', subtitulo: '',  href: '/materiales' },
        { label: 'Usuarios', subtitulo: '',  href: '/usuarios' },
    ];

    return (
        <>
            <Header />
            <main className="bg-fondo min-h-screen flex justify-center text-white">
                <div className="container pb-20">
                    <Cabecera titulo = "Panel de administración" />
                    <div className="px-10 grid inline-flex md:grid-flow-row lg:grid-cols-3">
                        {menuItems.map((item, index) => (
                            <PanelCard titulo={item.label} subtitulo="" link={`/panel${item.href}`} key={index}/>
                        ))}
                    </div>                    
                </div>
            </main>
        </>
    )
}
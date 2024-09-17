"use client";

import Header from "/components/Header";

export default async function Workouts () {
    return (
        <>
            <Header />
            <main className="bg-fondo min-h-screen flex justify-center text-center text-white">
                <div className="grid grid-rows-1 container pt-20 pb-20">
                    <div>
                        Estás en workouts
                    </div>
                </div>
            </main>
        </>
        
    )
}
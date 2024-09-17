"use client";

import Header from "/components/Header";
import "/styles/globals.css";
import MainMenu from "/components/MainMenu";
// import { createBrowserSupabaseClient } from '../supabase-client-helper/createBrowserSupabaseClient'
// import { SessionContextProvider } from '@supabase/auth-helpers-nextjs'

// const supabaseClient = createBrowserSupabaseClient({
//   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
//   supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
// })

async function Home() {
  return (
    <>
      <Header />
      <main className="bg-fondo min-h-screen flex justify-center text-center text-white">
        <div className="container pt-20 pb-20">
          <h1 className="text-4xl font-titulo text-white pb-10 uppercase">Bienvenido al sistema interno de <span className="text-beige">GALLEGO PRADA</span></h1>
          <div className={`grid md:grid-flow-row lg:grid-cols-2 gap-6 relative mx-10 lg:mx-20`}>
            <MainMenu texto="ELEGIR WORKOUT" imagen="bg-ejercicio" link="/workouts" />
            <MainMenu texto="ADMINISTRAR" imagen="bg-preparacion" link="/panel"  />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;

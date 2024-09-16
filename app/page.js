

import Header from "./components/Header";
import "/styles/globals.css";
import MainMenu from "./components/MainMenu";
//import { createClient } from "./utils/supabase/server";

async function Home() {
  /*
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  */
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

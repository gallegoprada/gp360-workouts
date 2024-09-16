'use client'

import { useEffect, useState } from "react";

export default function Boton ({ text }) {    
    return (
        <>
            <button className="bg-rojo hover:bg-red-700 text-white font-bold py-4 px-12 border-2 border-white">
                { text }
            </button>
        </>
    )
}
'use client'

import { logout } from "../app/logout/actions"

export default function LogoutButton () {
    return (
        <button 
        className="border-2 border-beige rounded py-2 px-4 font-bold inline-block text-sm mx-4 hover:bg-beige text-white uppercase" 
        onClick={() => logout()}
        >
            Desloguear
        </button>
    )
}
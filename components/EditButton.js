'use client'

import Link from "next/link";

export default function EditButton({ id, site, title }) {
    return (
        <Link href={`/panel/${site}/${id}`} className="inline-flex">
            <button 
                type="button"
                title={`Editar ${title}`}
                className="btn mt-2 flex items-center cursor-pointer hover:shadow-lg focus:outline-none focus:shadow-outline mx-2 mb-2 hover:bg-stone-400 hover:border-teal-700 hover:text-white h-10 px-6 rounded"
            >
                <svg className="feather feather-edit" fill="none" height="20" stroke="currentColor" strokeLinecap="round" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
            </button>
        </Link>
    )
}
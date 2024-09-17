export default function MainMenu({
    texto,
    imagen,
    link
}){
    return(
        <div className={`grid h-80 ${imagen} bg-center bg-cover bg-no-repeat border border-white rounded`}>
            <a href={link} className="flex justify-center inline hover:bg-beige hover:opacity-50 hover:text-black items-center text-white font-bold py-4 px-12">
                {texto}
            </a>
        </div>
    )
}
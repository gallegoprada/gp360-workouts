export default function Cabecera( {titulo} ){
    return (
        <div className="flex mb-10 w-full h-48 justify-between items-center bg-punio overflow-x-auto">
            <div className='flex pb-4 w-full pt-10 px-10 grid m-2 text-4xl md:text-7xl font-titulo text-center uppercase'>
                { titulo }
            </div>
        </div>
    )
}
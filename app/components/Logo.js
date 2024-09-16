import Image from "next/image";

export default function Logo () {

    return(
        <Image 
            src="/logo_360.png"
            width={120}
            height={50}
            className="mx-4"
            alt="Logo GALLEGO PRADA"
        />
    )
}
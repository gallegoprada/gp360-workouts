'use client'
import React from 'react';
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
  
export default function EjercicioCard( data ) {
    
    return (
        <Card className="m-4 w-96 min-h-40 bg-black p-5">
            <CardBody className=''>
                <div className="flex justify-between inline-center ">
                    <Typography variant="h5" className="mt-4 mb-2 text-2xl font-titulo uppercase">
                        { data.ejercicio.nombre_completo }
                    </Typography>
                    {  data.ejercicio.favorito && (
                        <span className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className=" text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </span>
                        )
                    }
                </div>
                <Typography className='text-beige'>
                    { data.ejercicio.nombre_corto }
                </Typography>
            </CardBody>
            <CardFooter className="pt-6">
                <Typography className='text-xs text-letras-header italic'>
                    { data.ejercicio.etiquetas }
                </Typography>
            </CardFooter>
        </Card>
    )
}
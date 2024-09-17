'use client'
import React from 'react';
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
  
export default function PanelCard({ titulo, subtitulo, link }) {
    
    return (
        <Card className="m-4 w-auto min-h-40 bg-black p-5">
            <CardBody>
                <Typography variant="h5" className="mt-4 mb-2 text-2xl font-titulo uppercase">
                    { titulo }
                </Typography>
                <Typography className='min-h-10 text-letras-header'>
                    { subtitulo }
                </Typography>
            </CardBody>
            <CardFooter className="pt-4">
                <Typography className='text-xs text-letras-header'>
                    <a href={ link }>
                        <Button className="border-beige border-2 rounded-sm hover:bg-beige px-8">Editar</Button>
                    </a>
                </Typography>
            </CardFooter>
        </Card>
    )
}
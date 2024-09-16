'use client';

import '/styles/globals.css';
import { useState } from 'react';
import Logo from '../components/Logo';
import { login, signup } from './actions';

export default function Login() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [clickedSignUp, setClickedSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setErrorMessage('');

    if (isSigningUp) {
      const error = await signup(formData);

      if (error) {
        setClickedSignUp(false);
        setErrorMessage(error);
      }else{
        setClickedSignUp(true);
      }
    }else {
      setClickedSignUp(false);
      const error = await login(formData);

      if (error) {
        setErrorMessage(error);
      }
    } 
  };

  return (
    <div className='min-h-screen flex items-center justify-center text-center text-white relative'>
      {/* Background image with overlay */}
      <div className='bg-gym-old bg-center bg-cover bg-no-repeat w-full h-full absolute inset-0'>
        <div className='bg-black bg-opacity-50 w-full h-full absolute inset-0'></div>
      </div>
      {/* Content */}
      <main className="relative z-10 min-w-16 max-w-lg">
        {/* Form */}
        <form className='bg-fondo pb-10 grid opacity-95 rounded' method="POST" onSubmit={handleSubmit} action={isSigningUp ? 'signup' : 'login' }>
          <div className='justify-center mx-0 pt-6 items-center mx-auto w-full pb-5 border-white  bg-black flex border-b-2'>
            <Logo className='justify-center'/>
          </div>
          <div className='pt-4 px-20 grid m-2 text-3xl font-medium font-titulo'>
            <p>{
              isSigningUp ? (
                'REGISTRARSE'
              ) : (
                'INICIAR SESIÓN'
              )
            } </p>
          </div>
          <div className='pt-4 px-20 grid m-2 gap-2'>
            <label htmlFor="email" className='font-bold text-left'>Email</label>
            <input id="email" name="email" type="email" className='border p-1 rounded text-black px-2' placeholder='Ingrese su email' required />
          </div>
          <div className='pt-4 px-20 grid m-2 gap-2'>
            <label htmlFor="password" className='pb-2 font-bold text-left'>Contraseña</label>
            <input id="password" name="password" type="password" className='border p-1 rounded text-black px-2' placeholder='Ingrese su contraseña' required />
          </div>
          <div className="text-red-500 mx-20 w-80 flex items-center justify-center ">{errorMessage}</div>
          <div className="text-green-500 mx-20 w-80 flex items-center justify-center ">
          { 
            clickedSignUp && <div>Se ha enviado una confirmación a su correo electrónico</div>
          }
          </div>
          <div className='pt-2 px-20 w-80 w-full'>
            <button type="submit" formAction={login} className="bg-beige uppercase inline hover:bg-beige-oscuro text-white font-bold py-4 px-8 rounded my-4">Iniciar sesión</button>
          </div>
        </form>
      </main>
    </div>
  )
}

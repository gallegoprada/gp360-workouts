'use client';

import '/styles/globals.css';
import { useState } from 'react';
import Logo from '/components/Logo';

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
       
      </main>
    </div>
  )
}

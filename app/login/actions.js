'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Error de inicio de sesión:', error.message);
    let errorMessage = 'El usuario o la contraseña son incorrectos.';
    return errorMessage;
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    //redirect('/error')
    console.error('Error de registro:', error.message);
    let errorMessage = 'El email ya existe o se produjo un error al intentar registrar, pruebe nuevamente más tarde.';
    return errorMessage;
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}
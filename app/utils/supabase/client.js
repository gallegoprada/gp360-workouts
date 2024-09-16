import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function fetchEjercicios() {
  const supabase = createClient();
  const { data } = await supabase.from('ejercicio').select('*');
  return data || [];
}
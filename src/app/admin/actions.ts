'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'


export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in a real app you might want to validate this
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Could not authenticate user' }
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: 'Error logging out' }
  }
  
  revalidatePath('/', 'layout')
  redirect('/')
}

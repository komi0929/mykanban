'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Database } from '@/lib/database.types'

type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title')
  const status = formData.get('status')
  
  if (!title || typeof title !== 'string') {
      return { error: 'Title is required' }
  }

  const project: ProjectInsert = {
    title: title,
    summary: formData.get('summary') as string | null,
    status: (status as "ideation" | "development" | "live" | "done") || 'ideation',
    site_url: formData.get('site_url') as string | null,
    memo: formData.get('memo') as string | null,
    image_url: formData.get('image_url') as string | null, 
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('projects') as any).insert(project)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function updateProject(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  
  if (!id) return { error: 'ID is required' }

  const project: ProjectUpdate = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    status: formData.get('status') as "ideation" | "development" | "live" | "done",
    site_url: formData.get('site_url') as string,
    memo: formData.get('memo') as string,
    image_url: formData.get('image_url') as string,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('projects') as any).update(project).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

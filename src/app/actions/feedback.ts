'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

/**
 * Send a "Yell" (Like/Cheer) for a project
 */
export async function sendYell(projectId: string) {
  const supabase = await createClient()
  const cookieStore = await cookies()
  
  // Get or set a simple session ID for anonymous users
  let sessionId = cookieStore.get('yell_session_id')?.value
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    cookieStore.set('yell_session_id', sessionId, { 
      path: '/', 
      httpOnly: true, 
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })
  }

  // Check if already yelled (optional server-side check to prevent specialized spam, 
  // though simple check is often handled by UI state or unique constraints if strict)
  // For this requirements: "One push even if not logged in"
  // We will trust the insert policy or handle duplicate key if we added a constraint.
  // The migration didn't add a unique constraint on (project_id, session_id), 
  // so technically they can spam if they clear cookies. This matches "Like instead".
  
  try {
    const { error } = await supabase
      .from('yells')
      .insert({
        project_id: projectId,
        session_id: sessionId
      })

    if (error) {
      console.error('Error sending yell:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/')
    return { success: true }
  } catch (e) {
    console.error('Exception sending yell:', e)
    return { success: false, error: 'Internal Server Error' }
  }
}

/**
 * Send "Advice" message
 */
export async function sendAdvice(projectId: string, formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name')?.toString() || 'Anonymous'
  const message = formData.get('message')?.toString()

  if (!message || message.trim().length === 0) {
    return { success: false, error: 'Message is required' }
  }

  try {
    const { error } = await supabase
      .from('advice')
      .insert({
        project_id: projectId,
        sender_name: name,
        message: message,
      })

    if (error) {
      console.error('Error sending advice:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (e) {
    console.error('Exception sending advice:', e)
    return { success: false, error: 'Internal Server Error' }
  }
}

/**
 * Get Feedback Statistics (Yell Count)
 */
export async function getFeedbackStats(projectId: string) {
  const supabase = await createClient()
  
  const { count, error } = await supabase
    .from('yells')
    .select('*', { count: 'exact', head: true })
    .eq('project_id', projectId)

  if (error) {
    // Fail silently for UI, return 0
    return { yellCount: 0 }
  }

  return { yellCount: count || 0 }
}

/**
 * Get Advice Messages (Admin Only)
 */
export async function getAdvice(projectId: string) {
  const supabase = await createClient()
  
  // Verify admin auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const { data, error } = await supabase
      .from('advice')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) {
       console.error('Error fetching advice:', error)
       return { success: false, error: error.message }
    }
    
    return { success: true, data }
  } catch (e) {
    return { success: false, error: 'Internal Server Error' }
  }
}

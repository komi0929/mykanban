
import { createClient } from '@/lib/supabase/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const key = searchParams.get('key')
  
  // This is the "Magic Key" (User's password as agreed)
  const MAGIC_KEY = 'komi0929'
  
  if (key !== MAGIC_KEY) {
      return NextResponse.json({ error: 'Invalid Access Key' }, { status: 401 })
  }

  const supabase = await createClient()
  
  // Hardcoded Admin Credentials
  const email = 'y.kominami@hitokoto1.co.jp'
  const password = MAGIC_KEY // Using the key as password since they match in this specific case

  // Perform server-side login
  const { error } = await supabase.auth.signInWithPassword({
      email,
      password
  })

  if (error) {
      return NextResponse.json({ error: 'Authentication Failed', details: error.message }, { status: 500 })
  }

  // Successful login -> Redirect to Admin Dashboard
  // Using 303 See Other for redirect after action
  return NextResponse.redirect(new URL('/admin', request.url), 303)
}

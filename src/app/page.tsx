import { createClient } from '@/lib/supabase/server'
import { KanbanBoard } from '@/components/kanban-board'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import Image from "next/image"

export const revalidate = 0

export default async function Home() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen w-full bg-background selection:bg-accent selection:text-accent-foreground pb-24 pt-20">
      <SiteHeader />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <header className="py-12 sm:py-20 flex flex-col items-center justify-center text-center space-y-6">
          <Image 
              src="/logo_brand.png" 
              alt="mykanban" 
              width={600}
              height={150}
              className="object-contain h-12 w-auto sm:h-20" 
              priority
          />
        </header>
        
        <KanbanBoard projects={projects || []} />
      </div>

      <SiteFooter />
    </main>
  )
}

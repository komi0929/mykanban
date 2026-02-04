import { createClient } from '@/lib/supabase/server'
import { KanbanBoard } from '@/components/kanban-board'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

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
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight sm:text-7xl drop-shadow-sm font-(--font-fredoka)">
            mykanban
          </h1>
        </header>
        
        <KanbanBoard projects={projects || []} />
      </div>

      <SiteFooter />
    </main>
  )
}

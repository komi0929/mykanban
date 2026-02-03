import { createClient } from '@/lib/supabase/server'
import { KanbanBoard } from '@/components/kanban-board'

export const revalidate = 0

export default async function Home() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen w-full bg-background selection:bg-accent selection:text-accent-foreground pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <header className="py-16 sm:py-24 flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight sm:text-7xl drop-shadow-sm">
            My Kanban
          </h1>

        </header>
        
        <KanbanBoard projects={projects || []} />
      </div>
    </main>
  )
}

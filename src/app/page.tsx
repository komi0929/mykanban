import { createClient } from '@/lib/supabase/server'
import { KanbanBoard } from '@/components/kanban-board'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import Image from "next/image"
import Link from "next/link"

export const revalidate = 0

export default async function Home() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  // Fetch yell counts for each project (Parallelized)
  // Note: Only feasible for small number of projects. For scale, use RPC or a View.
  const projectsWithCounts = await Promise.all(
    (projects || []).map(async (p) => {
      const { count } = await supabase
        .from('yells')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', p.id)
      return { ...p, yell_count: count || 0 }
    })
  )

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
              className="object-contain h-16 w-auto sm:h-24 mb-4" 
              priority
          />
          <div className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
            <p className="inline-block text-left sm:text-center">
              福岡の小さなスイーツ店の店主、
              <Link href="/about" className="text-orange-500 hover:text-orange-600 hover:underline mx-1 font-bold">
                komi
              </Link>
              が早起きしてつくったアプリ達をご紹介。<br />
              こんなのあったらいいな！というアイデアは
              <a 
                href="https://humuhumu.hitokoto.tech/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sky-500 hover:text-sky-600 hover:underline mx-1 font-bold inline-flex items-center"
              >
                「ふむふむ君」
              </a>
              に聞かせてください！<br />
              皆さんの毎日がちょっとだけ楽しく・便利になると嬉しいです。
            </p>
          </div>
        </header>
        
        <KanbanBoard projects={projectsWithCounts || []} />
      </div>

      <SiteFooter />
    </main>
  )
}

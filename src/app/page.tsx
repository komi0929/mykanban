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
              className="object-contain h-16 w-auto sm:h-24 mb-4" 
              priority
          />
          <div className="text-slate-600 font-medium leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
            <p>
              福岡の小さなお菓子屋さんが、「あったらいいな」を形にする個人開発サイト。<br className="hidden sm:inline" />
              アイデアを共有して、みんなでワクワクできる場所を目指しています。<br className="hidden sm:inline" />
              アイデア募集中！
              <a 
                href="https://humuhumu.hitokoto.tech/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sky-500 hover:text-sky-600 hover:underline mx-1 font-bold inline-flex items-center"
              >
                「ふむふむ君」
              </a>
              にもぜひ教えてくださいね。
            </p>
          </div>
        </header>
        
        <KanbanBoard projects={projects || []} />
      </div>

      <SiteFooter />
    </main>
  )
}

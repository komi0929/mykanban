
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PwaInstallButton } from "@/components/pwa-install-button"

export const metadata = {
  title: 'お守りに！？ - MyKanban',
  description: 'ホーム画面に追加するといいことがあるかも？',
}

export default function OmamoriPage() {
  return (
    <main className="min-h-screen w-full bg-[#fff0f5]">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-32 sm:py-40">
        
        {/* Content Card */}
        <div className="max-w-xl mx-auto bg-white rounded-[40px] p-8 sm:p-12 shadow-sm text-center">
            
            {/* Omamori Icon or similar playful graphic can go here if needed, for now just brand icon or skipped based on about page logic */}
            {/* User removed logo from about page, maybe keep it clean here or add playful emoji */}
            <div className="mb-6 text-6xl">
                🔮
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-8 font-(--font-fredoka)">
                お守りに！？
            </h1>
            
            <div className="space-y-8 font-medium text-slate-600 leading-relaxed text-lg mb-12">
                <p>
                    このサイトをスマホのホーム画面に追加すると、<br className="hidden sm:block"/>
                    いいことがきっと起こるとか起こらないとか言われています！
                </p>
            </div>

            <div className="relative pb-6">
                <PwaInstallButton />
            </div>

        </div>

      </div>

      <SiteFooter />
    </main>
  )
}

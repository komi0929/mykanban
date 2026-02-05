
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Construction } from "lucide-react"

export const metadata = {
  title: 'サイトについて - MyKanban',
  description: 'このサイトについて',
}

export default function AboutSitePage() {
  return (
    <main className="min-h-screen w-full bg-[#f0f4f8]">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-32 sm:py-40">
        <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-8 sm:p-16 shadow-sm text-center">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Construction className="text-slate-400 w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">サイトについて</h1>
            <p className="text-slate-500">現在準備中です。公開までしばらくお待ちください。</p>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

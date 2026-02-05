
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"


export const metadata = {
  title: '皆さんにお願い！ - MyKanban',
  description: '皆さんへのお願い',
}

export default function RequestsPage() {
  return (
    <main className="min-h-screen w-full bg-[#fff0f5]">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-32 sm:py-40">
        <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-8 sm:p-16 shadow-sm text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">皆さんにお願い！</h1>
            <p className="text-slate-500">現在準備中です。公開までしばらくお待ちください。</p>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}


import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Mail } from "lucide-react"

export const metadata = {
  title: 'お問い合わせ - MyKanban',
  description: 'お問い合わせはこちら',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8fcf0]">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-32 sm:py-40">
        <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-8 sm:p-16 shadow-sm text-center">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-emerald-300 w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">お問い合わせ</h1>
            <p className="text-slate-500">現在準備中です。公開までしばらくお待ちください。</p>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

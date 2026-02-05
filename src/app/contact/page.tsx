
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteFooter } from "@/components/site-footer"

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
            <h1 className="text-2xl font-bold text-slate-800 mb-8">お問い合わせ</h1>
            <p className="text-slate-600 font-medium leading-relaxed mb-8">
                こちらの公式LINEよりお願いします。<br />
                （最新情報を3日に一回程度、配信していますので、ぜひご登録いただけたら嬉しいです！）
            </p>
            <div className="flex justify-center">
                <a href="https://lin.ee/KlsNzYq" target="_blank" rel="noopener noreferrer">
                    <img 
                        src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" 
                        alt="友だち追加" 
                        height="36" 
                        style={{ border: 'none' }}
                    />
                </a>
            </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

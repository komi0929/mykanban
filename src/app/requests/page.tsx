
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
            <h1 className="text-2xl font-bold text-slate-800 mb-10">皆さんにお願い！</h1>
            
            <div className="space-y-8 text-slate-600 font-medium leading-relaxed text-left sm:text-center">
                <p>
                    このサイトの運営者（komi）はアプリ開発のど素人です。<br className="hidden sm:inline" />
                    AIさまさまの進化により、あ！いいかも！と思いついたアイデアがかたちになるのが楽しくて、<br className="hidden sm:inline" />
                    このようなサイトまでつくってしまいました。
                </p>

                <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="mb-4">
                        ひとりでもくもくとPCに向かうのは楽しいのですが、きっと同じような人
                    </p>
                    <ul className="list-none space-y-2 font-bold text-slate-700 inline-block text-left">
                        <li className="flex items-center gap-2">
                            <span className="text-xl">💡</span> アイデアはあるのでカタチにしたい！
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl">🔨</span> カタチにする能力があるのでアイデアが欲しい！
                        </li>
                    </ul>
                    <p className="mt-4">
                        といった人は世界中にもっともっといるはずです。
                    </p>
                </div>

                <p>
                    そういった人たちが交差する瞬間があれば、<br className="hidden sm:inline" />
                    ちょっとだけでも便利に・楽しくできるのではないか？と考えています。
                </p>

                <div className="py-4">
                    <p className="mb-2">そこで、</p>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-lg font-bold text-slate-800">
                            mykanban改め → <span className="text-sky-500">みんなのカンバンOurKanban</span>
                        </p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 bg-yellow-100 px-4 py-1 rounded-full transform -rotate-2 inline-block">
                            略して、アワカン（仮）
                        </p>
                        <p className="mt-2 text-base">というコミュニティを立ち上げます。</p>
                    </div>
                </div>

                <p className="text-base">
                    コミュニティといっても、まず最初はこのmykanbanの最新情報を3日に一度、<br className="hidden sm:inline" />
                    お送りするくらいのスロースタートを予定していますので
                </p>

                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                    <p className="mb-4 font-bold text-emerald-800 text-lg">
                        見守ってもいいかな、という方はぜひ、このお問い合わせ窓口にも利用している、公式LINEにご登録ください！
                    </p>
                    <a 
                        href="https://lin.ee/D5y3TBU" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b64d] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-md"
                    >
                        公式LINEに登録する
                    </a>
                </div>
            </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

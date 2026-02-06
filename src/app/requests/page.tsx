
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

                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 my-8">
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

                <div className="py-8">
                    <p className="mb-4 leading-relaxed">
                        そのような人のために向けて、コミュニティができたらよいな、と思っています。<br />
                        noteのメンバーシップ、その名も
                    </p>
                    
                    <div className="flex flex-col items-center justify-center gap-6 mb-6 mt-2">
                         <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 bg-yellow-100 px-6 py-2 rounded-full transform -rotate-2 inline-block shadow-sm">
                            オープンキッチン（仮）
                        </p>
                    </div>

                    <p className="mb-6 leading-relaxed">
                        を立ち上げましたので、ぜひご参加ください！<br />
                        <span className="text-sm text-slate-500 font-bold">（開発者じゃないけど、見守ってあげてもいいかも！という人のご参加ももちろん大歓迎です。）</span>
                    </p>

                    <p className="mb-8 leading-relaxed">
                        コミュニティといっても、まずは記事を３日一回くらいお送りするくらいのスロースタートを予定しています！
                    </p>

                    <a 
                        href="https://note.com/sogu1/membership" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-10 rounded-full transition-all hover:scale-105 shadow-md"
                    >
                        詳しくはこちら
                    </a>
                </div>
            </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

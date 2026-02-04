
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Wrench } from "lucide-react"

export const metadata = {
  title: 'About - MyKanban',
  description: 'mykanbanの作者について',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#f0f4f8]">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-32 sm:py-40">
        
        {/* Top Icon - Centered */}
        <div className="flex justify-center mb-10">
            <div className="relative w-20 h-20 shadow-sm rounded-2xl overflow-hidden">
                <Image 
                    src="/brand-icon.png" 
                    alt="icon" 
                    fill 
                    className="object-cover"
                />
            </div>
        </div>

        {/* Content Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-8 sm:p-16 shadow-sm">
            
            <div className="space-y-8 font-medium text-slate-600 leading-relaxed text-lg">
                <p>
                    こんにちは！komi（コミ）と申します。
                </p>
                <p>
                    私は普段、福岡でちいさなちいさなスイーツ店を営んでいます。 その傍ら、まったくの素人ながら「こんなのがあったらいいな」という思いで、このサイトにあるアプリたちを個人開発しています。
                </p>
                
                {/* Profile Photo */}
                <div className="my-10 relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-sm">
                     <Image 
                        src="/images/profile.png" 
                        alt="Profile" 
                        fill 
                        className="object-cover"
                    />
                </div>

                <p>
                    ひとりで黙々とPCに向かい、新しいものを作り上げる時間はとても楽しいものです。でも、「もっと多くの人と一緒にワクワクしたい！」 という思いが強くなり、このサイトを立ち上げました。
                </p>
                <p>
                    ひとりの力では形にしきれなかったアイデアも、ここ発信することで、誰かが引き継いでくれたり、もっと面白いものに進化させてくれたら嬉しいなと思っています。
                </p>

                <hr className="border-slate-100 my-10" />

                {/* How to use section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-slate-800">
                        <Wrench className="w-6 h-6 text-slate-400" />
                        <h2 className="text-xl font-bold">このサイトの使い方</h2>
                    </div>

                    <div className="space-y-6 pl-2">
                        <div>
                            <h3 className="text-slate-800 font-bold mb-2">真似っこ大歓迎！</h3>
                            <p className="text-slate-600">
                                掲載されているアプリは、模倣していただいて全然OKです！何かの参考になれば幸いです。
                            </p>
                        </div>

                        <div>
                            <h3 className="text-slate-800 font-bold mb-2">アイデア募集中！</h3>
                            <p className="text-slate-600">
                                「作る技術はないけど、こんなアイデアがあるよ」という方は、ぜひこの
                                <a 
                                    href="https://humuhumu.hitokoto.tech/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sky-500 hover:text-sky-600 hover:underline mx-1 font-bold inline-flex items-center"
                                >
                                    「ふむふむ君」
                                </a>
                                に教えてあげてください。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <p>
                        ここが「アイデア」と「実行」が出会う交差点になって、みんなの毎日がちょっとでも便利になったり、楽しくなったりしたら最高です！
                    </p>
                </div>

            </div>
        </div>

      </div>

      <SiteFooter />
    </main>
  )
}

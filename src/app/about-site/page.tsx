
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UpdateLog } from "@/components/update-log"

export const metadata = {
  title: 'サイトについて - MyKanban',
  description: 'このサイトの目的と更新情報',
}

export default function AboutSitePage() {
  return (
    <main className="min-h-screen w-full bg-[#f0f4f8]">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-32 sm:py-40">
        <div className="max-w-3xl mx-auto space-y-16">
            
            {/* Main Content Card */}
            <div className="bg-white rounded-[40px] p-8 sm:p-16 shadow-sm">
                
                <h1 className="text-2xl font-bold text-slate-800 mb-10 text-center">サイトについて</h1>
                
                <div className="space-y-10 text-slate-600 font-medium leading-relaxed">
                    
                    {/* Block 1 */}
                    <section>
                        <p className="mb-6">
                            mykanbanは、運営者のkomiが開発したWebアプリを紹介しているサイトです。
                        </p>
                        <p>
                            「カンバン」形式で、
                            <Link href="/about" className="text-sky-500 hover:underline hover:text-sky-600 font-bold mx-1">
                                僕（komi）自身
                            </Link>
                            が進んでいるプロジェクトを管理したかったのと、「看板」となるアプリをつくりたい！という切実な思いからmykanbanと名付けました。
                        </p>
                    </section>
                    
                    <hr className="border-slate-100" />

                    {/* Block 2 */}
                    <section>
                        <p className="mb-6">
                            現在は、基本、僕がつくったアプリが中心ですが、数週間以内に、
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700 font-bold">
                            <li>Webアプリの開発の種となるアイデア</li>
                            <li>再利用可能なGithubのデータ</li>
                        </ul>
                        <p className="mb-6">
                            が共有される仕組みをつくります！
                        </p>
                        <p>
                            進捗を、3日に一回程度、お知らせしていきますので、ぜひ、お問い合わせ窓口にしている、
                            <Link href="/contact" className="text-emerald-500 hover:underline hover:text-emerald-600 font-bold mx-1">
                                こちらの公式LINE
                            </Link>
                            にご登録いただけたら、嬉しいです！
                        </p>
                    </section>

                </div>
            </div>

            {/* Updates Section */}
            <UpdateLog />

        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

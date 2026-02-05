import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="py-12 mt-12 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8 font-bold text-slate-600">
          <Link href="/about-site" className="hover:text-sky-500 transition-colors">
            サイトについて
          </Link>
          <Link href="/requests" className="hover:text-pink-500 transition-colors">
            皆さんにお願い！
          </Link>
          <Link href="/contact" className="hover:text-emerald-500 transition-colors">
            お問い合わせ
          </Link>
        </div>
        <div className="text-xs text-slate-400">
          © 2026 Hitokoto Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

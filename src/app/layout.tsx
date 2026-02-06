import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c, Fredoka } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-m-plus-rounded',
  weight: ['400', '500', '700', '800'],
})

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'MyKanban - マイカンバン',
  description: 'プロジェクトを一元管理・閲覧できるポートフォリオサイト',
  openGraph: {
    title: 'MyKanban - マイカンバン',
    description: 'komiのポートフォリオサイト兼アイデア管理アプリ',
    url: 'https://mykanban.hitokoto.tech',
    siteName: 'MyKanban',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/logo_brand.png',
        width: 1200,
        height: 630,
        alt: 'MyKanban Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyKanban - マイカンバン',
    description: 'komiのポートフォリオサイト兼アイデア管理アプリ',
    images: ['/logo_brand.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={cn(mPlusRounded.className, fredoka.variable, "antialiased min-h-screen bg-background text-foreground tracking-tight")}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

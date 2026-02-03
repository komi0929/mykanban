import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400', '700'], // Bold for headers
})

export const metadata: Metadata = {
  title: 'MyKanban - マイカンバン',
  description: 'プロジェクトを一元管理・閲覧できるポートフォリオサイト',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={cn(notoSansJP.variable, "antialiased min-h-screen bg-background")}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

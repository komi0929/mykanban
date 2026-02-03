import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-m-plus-rounded',
  weight: ['400', '500', '700', '800'],
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
      <body className={cn(mPlusRounded.className, "antialiased min-h-screen bg-background text-foreground tracking-tight")}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

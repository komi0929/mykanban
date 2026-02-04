"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Share } from "lucide-react"
import { cn } from "@/lib/utils"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true)
    }

    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    setIsIOS(/iphone|ipad|ipod/.test(userAgent))

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  if (isStandalone) {
    return (
        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center text-sm font-bold">
            アプリはインストール済みです✨
        </div>
    )
  }

  if (isIOS) {
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 shadow-sm text-left">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Share className="w-5 h-5 text-sky-500" />
            iOS（iPhone/iPad）の方
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
            Safariのメニューバーにある「シェア」ボタン <Share className="w-4 h-4 inline" /> をタップし、
            <br />
            <span className="font-bold text-slate-800">「ホーム画面に追加」</span>を選択してください。
        </p>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
        <Button 
            onClick={handleInstallClick}
            disabled={!deferredPrompt}
            size="lg"
            className={cn(
                "rounded-full font-bold px-8 shadow-md transition-all hover:scale-105 active:scale-95",
                "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white border-0"
            )}
        >
            <Download className="mr-2 h-5 w-5" />
            ホーム画面に追加する
        </Button>
        {!deferredPrompt && (
            <p className="text-xs text-slate-400 mt-2 text-center absolute -bottom-6 w-full">
                ※ブラウザのメニューからも追加できます
            </p>
        )}
    </div>
  )
}

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

  // iOS View
  if (isIOS) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 shadow-sm text-left">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3">
                <Share className="w-5 h-5 text-sky-500" />
                iPhone / iPad の方
            </h3>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                    <span className="font-bold text-slate-800">1.</span> 画面下（または上）にあるシェアボタン <Share className="w-4 h-4 inline mx-1 text-sky-500" /> をタップ
                </p>
                <p>
                    <span className="font-bold text-slate-800">2.</span> メニューから<br/><span className="font-bold text-slate-800 bg-slate-200 px-2 py-1 rounded mx-1">ホーム画面に追加</span><br/>を探してタップ
                </p>
                <p>
                    <span className="font-bold text-slate-800">3.</span> 右上の「追加」をタップ
                </p>
            </div>
        </div>
        <p className="text-xs text-center text-slate-400">
            これでホーム画面にアイコンが登場します！
        </p>
      </div>
    )
  }

  // Android / PC (Installable) View
  return (
    <div className="flex flex-col items-center gap-4">
        {deferredPrompt ? (
            <>
                <p className="text-sm font-bold text-slate-600">
                    Androidの方はこちら 👇
                </p>
                <Button 
                    onClick={handleInstallClick}
                    size="lg"
                    className={cn(
                        "rounded-full font-bold px-8 py-6 text-lg shadow-xl transition-all hover:scale-105 active:scale-95",
                        "bg-linear-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white border-0"
                    )}
                >
                    <Download className="mr-2 h-6 w-6" />
                    ホーム画面に追加する
                </Button>
            </>
        ) : (
            <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
                <p>ブラウザのメニューから「ホーム画面に追加」を選んでください</p>
            </div>
        )}
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
                <Image 
                    src="/logo_brand.png" 
                    alt="mykanban" 
                    width={160}
                    height={40}
                    className="object-contain h-9 w-auto" 
                    priority
                />
            </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-sky-500 transition-colors">
                自己紹介
            </Link>
            <Link href="/omamori" className="text-sm font-bold text-slate-600 hover:text-pink-500 transition-colors">
                お守りに
            </Link>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-full">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
            <Link 
                href="/about" 
                className="p-4 rounded-xl bg-slate-50 text-center font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
            >
                自己紹介
            </Link>
            <Link 
                href="/omamori" 
                className="p-4 rounded-xl bg-slate-50 text-center font-bold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
            >
                お守りに
            </Link>
        </div>
      )}
    </header>
  )
}

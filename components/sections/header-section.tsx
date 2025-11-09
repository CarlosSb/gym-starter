"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { MatriculeSeButton } from "@/components/matricule-se-button"

interface HeaderSectionProps {
  settings: any
}

export function HeaderSection({ settings }: HeaderSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-black-red text-white shadow-lg'
        : 'bg-transparent text-white'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {settings.logo ? (
            <Image src={settings.logo} alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
          ) : (
            <Dumbbell className="h-8 w-8 text-red-accent" />
          )}
          <h1 className="text-2xl font-bold">{settings.name.toUpperCase()}</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#inicio"
            className={`${
              isScrolled
                ? 'hover:text-red-accent'
                : 'hover:text-white'
            } transition-colors duration-300`}
          >
            Início
          </Link>
          <Link
            href="#planos"
            className={`${
              isScrolled
                ? 'hover:text-red-accent'
                : 'hover:text-white'
            } transition-colors duration-300`}
          >
            Planos
          </Link>
          <Link
            href="#sobre"
            className={`${
              isScrolled
                ? 'hover:text-red-accent'
                : 'hover:text-white'
            } transition-colors duration-300`}
          >
            Sobre
          </Link>
          <Link
            href="#contato"
            className={`${
              isScrolled
                ? 'hover:text-red-accent'
                : 'hover:text-white'
            } transition-colors duration-300`}
          >
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <MatriculeSeButton
              settings={settings}
              className={`${
                isScrolled
                  ? 'bg-red-accent hover:bg-red-accent/90 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50'
              } transition-all duration-300`}
            >
              Matricule-se
            </MatriculeSeButton>
            <Link href="/login">
              <Button
                variant="outline"
                className={`${
                  isScrolled
                    ? 'border-red-accent text-red-accent hover:bg-red-accent hover:text-white bg-transparent'
                    : 'border-white/30 text-white hover:bg-white/20 hover:border-white/50 bg-transparent'
                } transition-all duration-300`}
              >
                Login
              </Button>
            </Link>
          </div>
          <MobileMenu settings={settings} />
        </div>
      </div>
    </header>
  )
}
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Zap, Menu, X, Dumbbell } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface HomeV2LayoutProps {
  children: React.ReactNode
}

export function HomeV2Layout({ children }: HomeV2LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { label: "Início", href: "#home" },
    { label: "Vantagens", href: "#vantagens" },
    { label: "Planos", href: "#planos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" }
  ]

  return (
    <>
      {/* Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-cyan-500/20"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#home" className="flex items-center space-x-2">
              <div className="relative">
                <Dumbbell className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                GYM STARTER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Button className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-red-500/40 hover:shadow-red-500/60 hover:scale-110 border-2 border-red-400/60 transform hover:-translate-y-1 group relative overflow-hidden">
                <Zap className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                <span className="font-black">Começar Agora</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isMobileMenuOpen ? "auto" : 0,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-lg border-t border-cyan-500/20 mt-4 rounded-lg"
          >
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-red-500/40 hover:shadow-red-500/60 hover:scale-105 border-2 border-red-400/60 transform hover:-translate-y-1 group relative overflow-hidden">
                <Zap className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                <span className="font-black">Começar Agora</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </>
  )
}
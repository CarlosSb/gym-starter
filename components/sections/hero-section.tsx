"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useCallback, useRef } from "react"
import { MatriculeSeButton } from "@/components/matricule-se-button"
import { CheckInModal } from "@/components/checkin-modal"
import { AppointmentModal } from "@/components/appointment-modal"
import { useIsMobile } from "@/hooks/use-mobile"
import { Dumbbell, Zap, Target, Flame, ChevronDown, Play } from "lucide-react"

interface HeroSectionProps {
  settings: any
}

export function HeroSection({ settings }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const isMobile = useIsMobile()
  const heroImages = settings.heroImages || []
  const heroRef = useRef<HTMLElement>(null)

  // Intersection Observer para animações de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-slideshow para múltiplas imagens
  useEffect(() => {
    if (heroImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 8000) // 8 segundos por imagem

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Background dinâmico sem parallax problemático */}
      {heroImages.length > 0 ? (
        <div className="absolute inset-0 bg-black overflow-hidden">
          {heroImages.map((image: string, index: number) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: isMobile ? 'scroll' : 'fixed',
              }}
              aria-hidden="true"
            />
          ))}
          {/* Overlay adicional para profundidade */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10 animate-pulse"></div>
        </div>
      )}

      {/* Elementos visuais flutuantes sem parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-accent/10 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-red-accent/15 rounded-full blur-lg animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-red-accent/20 rounded-full blur-md animate-float-fast"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-red-accent/25 rounded-full blur-sm animate-float-slow"></div>
      </div>

      {/* Conteúdo principal compactado para viewport */}
      <div className="container mx-auto px-4 text-center relative z-10 h-full flex flex-col justify-center pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto space-y-2 md:space-y-3">
          {/* Badge compacto */}
          <Badge
            className={`inline-flex bg-red-accent/90 text-white px-3 md:px-4 py-1 text-xs font-medium border border-red-accent/50 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            aria-label="Categoria da academia"
          >
            <Dumbbell className="w-3 h-3 mr-1" aria-hidden="true" />
            {settings.heroSubtitle || "🏋️‍♂️ Academia de Alta Performance"}
          </Badge>

          {/* Título principal compacto com fonte reduzida */}
          <h1
            id="hero-title"
            className={`text-lg md:text-2xl lg:text-4xl xl:text-5xl font-black text-white leading-tight transition-all duration-700 delay-200 ${
              isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="bg-gradient-to-r from-white via-red-accent to-white bg-clip-text text-transparent drop-shadow-lg">
              {settings.heroTitle || "TRANSFORME SEU CORPO"}
            </span>
            <br className="hidden sm:block" />
            <span className="text-red-accent text-base md:text-xl lg:text-2xl xl:text-3xl font-bold block sm:inline">
              TRANSFORME SUA VIDA
            </span>
          </h1>

          {/* Subtítulo compacto */}
          <p
            className={`text-xs md:text-sm lg:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed font-light px-2 transition-all duration-700 delay-400 ${
              isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {settings.description || "Junte-se à revolução fitness. Treinos intensos, resultados reais e uma comunidade que te impulsiona para frente."}
          </p>

          {/* Métricas compactas */}
          <div
            className={`flex justify-center gap-2 md:gap-3 px-2 transition-all duration-700 delay-600 ${
              isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center p-1.5 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 min-w-[60px]">
              <div className="text-sm md:text-base font-bold text-red-accent">{settings.metrics?.activeMembers || "500"}+</div>
              <div className="text-xs text-gray-300 uppercase tracking-wide">Alunos</div>
            </div>
            <div className="text-center p-1.5 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 min-w-[60px]">
              <div className="text-sm md:text-base font-bold text-red-accent">{settings.metrics?.personalTrainers || "15"}</div>
              <div className="text-xs text-gray-300 uppercase tracking-wide">Trainers</div>
            </div>
            <div className="text-center p-1.5 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 min-w-[60px]">
              <div className="text-sm md:text-base font-bold text-red-accent">{settings.metrics?.operatingHours || "24/7"}</div>
              <div className="text-xs text-gray-300 uppercase tracking-wide">24/7</div>
            </div>
          </div>

          {/* Botões compactos */}
          <div
            className={`flex flex-col sm:flex-row gap-2 md:gap-3 justify-center items-center px-2 transition-all duration-700 delay-800 ${
              isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <MatriculeSeButton
              settings={settings}
              className="bg-red-accent hover:bg-red-accent/90 text-white px-4 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-full shadow-lg shadow-red-accent/25 transform hover:scale-105 transition-all duration-300 min-w-[180px] group"
            >
              <Zap className="w-3 h-3 mr-1 group-hover:animate-bounce" aria-hidden="true" />
              🚀 Comece Agora
            </MatriculeSeButton>

            <div className="flex gap-2">
              <AppointmentModal>
                <Button
                  size="sm"
                  variant="outline"
                  className="border border-white/30 text-white hover:bg-white hover:text-black bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 text-xs"
                >
                  <Target className="w-3 h-3 mr-1" aria-hidden="true" />
                  📅 Aula
                </Button>
              </AppointmentModal>

              <CheckInModal>
                <Button
                  size="sm"
                  variant="outline"
                  className="border border-red-accent/50 text-red-accent hover:bg-red-accent hover:text-white bg-red-accent/10 backdrop-blur-sm px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 text-xs"
                >
                  <Flame className="w-3 h-3 mr-1" aria-hidden="true" />
                  🎫 Check-in
                </Button>
              </CheckInModal>
            </div>
          </div>

          {/* CTA secundário compacto */}
          <div
            className={`transition-all duration-700 delay-1000 ${
              isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link href="#sobre" className="inline-block">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-2 py-1 transition-all duration-300 group text-xs"
                aria-label="Saiba mais sobre a academia"
              >
                <span>Saiba mais</span>
                <ChevronDown className="ml-1 w-3 h-3 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Efeito de scroll indicator melhorado */}
      <div
        className={`absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1200 ${
          isVisible ? 'animate-bounce opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        aria-hidden="true"
      >
        <div className="w-6 md:w-7 h-10 md:h-12 border-2 border-white/30 rounded-full flex justify-center bg-white/5 backdrop-blur-sm">
          <div className="w-1 h-3 md:h-3.5 bg-white/50 rounded-full mt-2 md:mt-2.5 animate-pulse"></div>
        </div>
      </div>

      {/* Video play button overlay (opcional) */}
      {settings.heroVideo && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
          aria-label="Assistir vídeo da academia"
        >
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
        </button>
      )}
    </section>
  )
}
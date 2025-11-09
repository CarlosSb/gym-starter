"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MatriculeSeButton } from "@/components/matricule-se-button"
import { CheckInModal } from "@/components/checkin-modal"
import { AppointmentModal } from "@/components/appointment-modal"
import { Dumbbell, Zap, Target, Flame } from "lucide-react"

interface HeroSectionProps {
  settings: any
}

export function HeroSection({ settings }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const heroImages = settings.heroImages || []

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background dinâmico com parallax imersivo */}
      {heroImages.length > 0 ? (
        <div className="absolute inset-0 bg-black overflow-hidden">
          {heroImages.map((image: string, index: number) => (
            <div
              key={index}
              className="absolute inset-0 opacity-0"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`,
                animation: `hero-slideshow ${heroImages.length * 8}s infinite`,
                animationDelay: `${index * 8}s`
              }}
            />
          ))}
          {/* Overlay adicional para profundidade */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black animate-gradient-x"></div>
      )}
      {/* Background fallback quando não há imagens */}
      {heroImages.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black animate-gradient-x"></div>
      )}

      {/* Elementos visuais flutuantes com parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-accent/10 rounded-full blur-xl animate-float-slow"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-red-accent/15 rounded-full blur-lg animate-float-medium"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-red-accent/20 rounded-full blur-md animate-float-fast"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-red-accent/25 rounded-full blur-sm animate-float-slow"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
      </div>

      {/* Conteúdo principal com parallax sutil */}
      <div
        className="container mx-auto px-4 text-center relative z-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          opacity: Math.max(0.8, 1 - scrollY * 0.001)
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge animado */}
          <Badge className="mb-4 md:mb-6 bg-red-accent/90 text-white px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-medium animate-fade-in-up border border-red-accent/50 backdrop-blur-sm">
            {settings.heroSubtitle || "🏋️‍♂️ Academia de Alta Performance"}
          </Badge>

          {/* Título principal com efeito de destaque */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 lg:mb-4 text-white leading-tight animate-fade-in-up animation-delay-200">
            <span className="bg-gradient-to-r from-white via-red-accent to-white bg-clip-text text-transparent">
              {settings.heroTitle || "TRANSFORME SEU CORPO"}
            </span>
          </h1>

          {/* Subtítulo com energia */}
          <p className="text-xs md:text-sm lg:text-base mb-3 md:mb-4 lg:mb-6 text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400 font-light px-2 md:px-4">
            {settings.description || "Junte-se à revolução fitness. Treinos intensos, resultados reais e uma comunidade que te impulsiona para frente."}
          </p>

          {/* Métricas rápidas */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6 animate-fade-in-up animation-delay-600 px-4">
            <div className="text-center min-w-[70px] md:min-w-[80px]">
              <div className="text-base md:text-lg lg:text-xl font-bold text-red-accent">{settings.metrics?.activeMembers || "500"}+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Alunos</div>
            </div>
            <div className="text-center min-w-[70px] md:min-w-[80px]">
              <div className="text-base md:text-lg lg:text-xl font-bold text-red-accent">{settings.metrics?.personalTrainers || "15"}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Trainers</div>
            </div>
            <div className="text-center min-w-[70px] md:min-w-[80px]">
              <div className="text-base md:text-lg lg:text-xl font-bold text-red-accent">{settings.metrics?.operatingHours || "24/7"}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Horário</div>
            </div>
          </div>

          {/* Botões de ação estratégicos */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in-up animation-delay-800 px-4">
            <MatriculeSeButton
              settings={settings}
              className="bg-red-accent hover:bg-red-accent/90 text-white px-4 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-3.5 text-sm md:text-base font-semibold rounded-full shadow-2xl shadow-red-accent/25 transform hover:scale-105 transition-all duration-300 animate-pulse-glow min-w-[200px] md:min-w-[240px]"
            >
              🚀 Comece Agora
            </MatriculeSeButton>

            <div className="flex gap-3 md:gap-4">
              <AppointmentModal>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-black bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 min-w-[140px] md:min-w-[160px] text-sm"
                >
                  📅 Aula Experimental
                </Button>
              </AppointmentModal>

              <CheckInModal>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-red-accent/50 text-red-accent hover:bg-red-accent hover:text-white bg-red-accent/10 backdrop-blur-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 min-w-[140px] md:min-w-[160px] text-sm"
                >
                  🎫 Check-in
                </Button>
              </CheckInModal>
            </div>
          </div>

          {/* Call-to-action secundário */}
          <div className="mt-3 md:mt-4 animate-fade-in-up animation-delay-1000">
            <Link href="#sobre">
              <Button
                size="lg"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-2 md:px-3 py-1 md:py-1.5 transition-all duration-300 group text-xs"
              >
                <span>Saiba mais</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">↓</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Efeito de scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 md:h-3 bg-white/50 rounded-full mt-1 md:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
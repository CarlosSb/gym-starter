"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, Flame, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

interface HomeV2HeroProps {
  settings: any
}

export function HomeV2Hero({ settings }: HomeV2HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([])

  useEffect(() => {
    setIsVisible(true)
    
    // Create animated particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1
    }))
    setParticles(newParticles)
  }, [])

  const metrics = [
    { icon: <Users className="h-5 w-5" />, value: "850+", label: "Alunos Transformados" },
    { icon: <TrendingUp className="h-5 w-5" />, value: "98%", label: "Taxa de Sucesso" },
    { icon: <Flame className="h-5 w-5" />, value: "24/7", label: "Acesso Total" }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* High-Performance Dynamic Background */}
      <div className="absolute inset-0 bg-black">
        {/* Main gradient background with depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 via-gray-950/20 to-black" />
        
        {/* Dynamic texture overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-conic from-cyan-500/20 via-purple-500/20 via-red-500/20 to-cyan-500/20 animate-spin-slow" />
        </div>
        
        {/* High-energy particle system */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size * 2}px`,
                height: `${particle.size * 2}px`,
                background: `radial-gradient(circle, rgba(${particle.id % 3 === 0 ? '0, 255, 255' : particle.id % 3 === 1 ? '138, 43, 226' : '255, 20, 147'}, 0.8) 0%, transparent 70%)`,
                boxShadow: `0 0 ${particle.size * 4}px rgba(${particle.id % 3 === 0 ? '0, 255, 255' : particle.id % 3 === 1 ? '138, 43, 226' : '255, 20, 147'}, 0.6)`
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.sin(particle.id) * 50, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Dynamic energy waves */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-500/20 rounded-full"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                left: `${50 + i * 15}%`,
                top: `${50 + i * 10}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Enhanced neon grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Dynamic light rays */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-500/40 via-transparent to-transparent transform rotate-12 origin-top" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-purple-500/40 via-transparent to-transparent transform -rotate-12 origin-top" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        
        {/* Depth overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 px-6 py-2 text-sm font-medium backdrop-blur-sm">
              <Zap className="h-4 w-4 mr-2" />
              ACADEMIA HIGH-PERFORMANCE
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent">
              TRANSFORME
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              SUA VIDA
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Entre na zona de <span className="text-cyan-400 font-semibold">alta performance</span>.
            Treinos intensos, tecnologia de ponta e resultados que superam limites.
          </motion.p>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-8 mb-12"
          >
            {metrics.map((metric, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mb-2 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white px-12 py-5 text-xl font-black uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 hover:scale-110 border-3 border-red-400/70 transform hover:-translate-y-2 group relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 group-hover:animate-pulse" />
                <span className="font-black">COMEÇAR AGORA</span>
                <Flame className="h-6 w-6 group-hover:animate-bounce" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Link href="#sobre">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105 border-2 border-cyan-400/60 group"
              >
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 group-hover:animate-spin" />
                  <span className="font-black">CONHECER MAIS</span>
                </div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-cyan-400/60">
          <span className="text-sm mb-2">Role para descobrir</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-cyan-400/40 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-cyan-400/60 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
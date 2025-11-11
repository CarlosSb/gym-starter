"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dumbbell, 
  Users, 
  TrendingUp, 
  Zap,
  ChevronLeft,
  ChevronRight,
  Target,
  Trophy,
  Clock,
  Star
} from "lucide-react"

interface HomeV2PillarsProps {
  settings: any
}

export function HomeV2Pillars({ settings }: HomeV2PillarsProps) {
  const [activePillar, setActivePillar] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const pillars = [
    {
      icon: <Dumbbell className="h-12 w-12" />,
      title: "Equipamentos de Elite",
      subtitle: "Tecnologia de Ponta",
      description: "Máquinas state-of-the-art importadas, equipamentos inteligentes com IA para otimização de treinos e monitoramento em tempo real.",
      features: ["Equipamentos com IA", "Monitores de performance", "Sensores biométricos", "Treinos adaptativos"],
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Personal Trainers Elite",
      subtitle: "Mentoria de Alta Performance",
      description: "Profissionais certificados internacionalmente com especialização em metodologias avançadas e coaching motivacional.",
      features: ["Certificação internacional", "Coaching personalizado", "Planos estratégicos", "Acompanhamento 24/7"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Metodologia Avançada",
      subtitle: "Sistema Científico",
      description: "Programa baseado em ciência do exercício com periodização inteligente e protocolos de recuperação otimizada.",
      features: ["Periodização científica", "Análise de progresso", "Protocolos de recuperação", "Otimização metabólica"],
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Performance Máxima",
      subtitle: "Resultados Comprovados",
      description: "Metodologia única que combina força, resistência e transformação corporal com tecnologia de ponta.",
      features: ["Resultados garantidos", "Transformação rápida", "Metodologia única", "Tracking avançado"],
      color: "from-yellow-500 to-green-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActivePillar((prev) => (prev + 1) % pillars.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, pillars.length])

  return (
    <section id="vantagens" className="py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 mb-6 px-6 py-2">
            <Target className="h-4 w-4 mr-2" />
            OS 4 PILARES
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              The Pillars
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Quatro pilares fundamentais que sustentam nossa metodologia de alta performance
          </p>
        </motion.div>

        {/* Main Pillar Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className={`${pillars[activePillar].bgColor} border-2 ${pillars[activePillar].borderColor} backdrop-blur-sm overflow-hidden`}>
            <CardContent className="p-12 text-center">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${pillars[activePillar].color} mb-6`}>
                  <div className="text-white">
                    {pillars[activePillar].icon}
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2">
                  {pillars[activePillar].title}
                </h3>
                
                <p className="text-lg text-cyan-400 font-medium mb-4">
                  {pillars[activePillar].subtitle}
                </p>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                  {pillars[activePillar].description}
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {pillars[activePillar].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-left"
                    >
                      <Star className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pillar Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActivePillar((prev) => (prev - 1 + pillars.length) % pillars.length)
                setIsAutoPlaying(false)
              }}
              className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-cyan-400" />
            </button>

            <div className="flex gap-2">
              {pillars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePillar(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activePillar
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setActivePillar((prev) => (prev + 1) % pillars.length)
                setIsAutoPlaying(false)
              }}
              className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-cyan-400" />
            </button>
          </div>
        </motion.div>

        {/* Mini Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              onClick={() => {
                setActivePillar(index)
                setIsAutoPlaying(false)
              }}
              className={`p-6 rounded-xl border transition-all duration-300 text-left group hover:scale-105 ${
                index === activePillar
                  ? `${pillar.bgColor} ${pillar.borderColor} border-2`
                  : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600"
              }`}
            >
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${pillar.color} mb-3`}>
                <div className="text-white text-sm">
                  {pillar.icon}
                </div>
              </div>
              
              <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                {pillar.title}
              </h4>
              
              <p className="text-gray-400 text-xs">
                {pillar.subtitle}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
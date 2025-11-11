"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Star,
  Quote,
  TrendingUp,
  Award,
  Heart,
  Zap
} from "lucide-react"

interface HomeV2HallOfFameProps {
  testimonials: any[]
}

export function HomeV2HallOfFame({ testimonials }: HomeV2HallOfFameProps) {
  const [isMarqueeActive, setIsMarqueeActive] = useState(true)

  // Generate mock testimonials if none provided
  const mockTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Empresário",
      content: "Em 6 meses perdi 25kg e ganhei confiança. A metodologia é realmente eficaz!",
      rating: 5,
      transformation: "25kg perdidos",
      avatar: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Advogada", 
      content: "Nunca imaginei que conseguiria ter um corpo desses aos 40 anos. Obrigada!",
      rating: 5,
      transformation: "15kg perdidos",
      avatar: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "João Oliveira",
      role: "Engenheiro",
      content: "Os equipamentos são incríveis e o acompanhamento nutricional mudou minha vida.",
      rating: 5,
      transformation: "20kg perdidos",
      avatar: "/placeholder.jpg"
    },
    {
      id: 4,
      name: "Ana Costa",
      role: "Médica",
      content: "Transformação completa: corpo, mente e estilo de vida. Recomendo!",
      rating: 5,
      transformation: "18kg perdidos",
      avatar: "/placeholder.jpg"
    },
    {
      id: 5,
      name: "Pedro Lima",
      role: "Professor",
      content: "Em 4 meses consegui resultados que não havia conseguido em 2 anos em outras academias.",
      rating: 5,
      transformation: "30kg perdidos",
      avatar: "/placeholder.jpg"
    },
    {
      id: 6,
      name: "Juliana Rocha",
      role: "Arquitetar",
      content: "A tecnologia de ponta e a metodologia única fazem toda a diferença nos resultados.",
      rating: 5,
      transformation: "12kg perdidos",
      avatar: "/placeholder.jpg"
    }
  ]

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...mockTestimonials, ...mockTestimonials]

  return (
    <section id="depoimentos" className="py-24 bg-gradient-to-b from-black via-gray-900/30 to-black overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 mb-6 px-6 py-2">
            <Heart className="h-4 w-4 mr-2" />
            HALL OF FAME
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Histórias de
            </span>
            <br />
            <span className="text-white">Transformação</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Vidas transformadas através da nossa metodologia de alta performance
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {[
            { icon: <Star className="h-5 w-5" />, value: "4.9", label: "Avaliação Média" },
            { icon: <TrendingUp className="h-5 w-5" />, value: "2.500+", label: "Transformações" },
            { icon: <Award className="h-5 w-5" />, value: "98%", label: "Taxa de Sucesso" },
            { icon: <Zap className="h-5 w-5" />, value: "24/7", label: "Suporte Elite" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative">
          {/* Pause/Resume Button */}
          <button
            onClick={() => setIsMarqueeActive(!isMarqueeActive)}
            className="absolute top-4 right-4 z-10 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-full text-sm text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
          >
            {isMarqueeActive ? "Pausar" : "Continuar"}
          </button>

          {/* Marquee Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: isMarqueeActive ? [0, -((mockTestimonials.length) * 400 + mockTestimonials.length * 24)] : 0
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-80"
                >
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm group hover:shadow-lg hover:shadow-cyan-500/10 h-full">
                    <CardContent className="p-6">
                      {/* Quote Icon */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                          <Quote className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          
                          {/* Testimonial Content */}
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            "{testimonial.content}"
                          </p>
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                            {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {testimonial.role}
                          </div>
                        </div>

                        {/* Transformation Badge */}
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 text-xs">
                          {testimonial.transformation}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Seja a Próxima História de Sucesso
            </h3>
            <p className="text-gray-300 mb-6">
              Junte-se a milhares de pessoas que já transformaram suas vidas
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 shadow-xl shadow-red-500/40 hover:shadow-red-500/60 hover:scale-105 border-2 border-red-400/60 transform hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 group-hover:animate-pulse" />
                <span className="text-lg">Começar Minha Transformação</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
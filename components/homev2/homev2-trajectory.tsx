"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Target,
  Trophy,
  Users,
  Zap,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react"

interface HomeV2TrajectoryProps {
  settings: any
}

export function HomeV2Trajectory({ settings }: HomeV2TrajectoryProps) {
  const [activeMilestone, setActiveMilestone] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const milestones = [
    {
      year: "2019",
      title: "O Começo",
      subtitle: "Fundação da Academia",
      description: "Nasceu da visão de revolucionar o fitness local com tecnologia e metodologia de ponta.",
      icon: <Zap className="h-6 w-6" />,
      stats: { value: "1º", label: "Unidade" },
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      year: "2020",
      title: "Expansão",
      subtitle: "Metodologia Própria",
      description: "Desenvolvimento da metodologia exclusive que combina ciência do exercício e tecnologia.",
      icon: <Target className="h-6 w-6" />,
      stats: { value: "500+", label: "Alunos" },
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      year: "2021",
      title: "Inovação",
      subtitle: "Equipamentos de Elite",
      description: "Implementação de equipamentos state-of-the-art com IA para otimização de treinos.",
      icon: <TrendingUp className="h-6 w-6" />,
      stats: { value: "95%", label: "Taxa de Sucesso" },
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      year: "2022",
      title: "Reconhecimento",
      subtitle: "Referência Regional",
      description: "Tornou-se referência em alta performance fitness na região, conquistando prêmios.",
      icon: <Award className="h-6 w-6" />,
      stats: { value: "1.200+", label: "Transformações" },
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      year: "2023",
      title: "Evolução",
      subtitle: "High-Performance",
      description: "Lançamento do conceito High-Performance com tecnologia avançada e coaching elite.",
      icon: <Star className="h-6 w-6" />,
      stats: { value: "2.000+", label: "Alunos Ativos" },
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      year: "2024",
      title: "Presente",
      subtitle: "O Futuro Agora",
      description: "Academia referência em transformação e alta performance, continuando a liderar inovações.",
      icon: <CheckCircle className="h-6 w-6" />,
      stats: { value: "2.500+", label: "Vidas Mudadas" },
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30"
    }
  ]

  const achievements = [
    { icon: <Users className="h-5 w-5" />, value: "2.500+", label: "Alunos Transformados" },
    { icon: <Trophy className="h-5 w-5" />, value: "15+", label: "Prêmios Recebidos" },
    { icon: <Star className="h-5 w-5" />, value: "4.9/5", label: "Avaliação Média" },
    { icon: <TrendingUp className="h-5 w-5" />, value: "98%", label: "Taxa de Sucesso" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMilestone((prev) => (prev + 1) % milestones.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [milestones.length])

  return (
    <section id="sobre" className="py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 mb-6 px-6 py-2">
            <Calendar className="h-4 w-4 mr-2" />
            NOSSA TRAJETÓRIA
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              The Trajectory
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Uma jornada de transformação que começou em 2019 e continua inovando o fitness
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Timeline */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Timeline Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500" />

              {/* Milestone Dots */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className={`
                      relative flex items-center cursor-pointer group transition-all duration-300
                      ${activeMilestone === index ? "scale-105" : ""}
                    `}
                    onClick={() => setActiveMilestone(index)}
                  >
                    {/* Milestone Dot */}
                    <div className={`
                      relative z-10 w-16 h-16 rounded-full border-4 transition-all duration-300 flex items-center justify-center
                      ${activeMilestone === index
                        ? `bg-gradient-to-r ${milestone.color} border-white shadow-lg`
                        : "bg-gray-800 border-gray-600 group-hover:border-gray-500"
                      }
                    `}>
                      <div className={activeMilestone === index ? "text-white" : "text-gray-400 group-hover:text-cyan-400"}>
                        {milestone.icon}
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className={`ml-6 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeMilestone === index
                        ? `${milestone.bgColor} ${milestone.borderColor} border-2`
                        : "bg-gray-800/50 border border-gray-700"
                    }`}>
                      <div className={`font-bold text-lg ${activeMilestone === index ? "text-white" : "text-gray-400"}`}>
                        {milestone.year}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Milestone Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:sticky lg:top-24"
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeMilestone === index ? 1 : 0,
                    y: activeMilestone === index ? 0 : 20,
                    scale: activeMilestone === index ? 1 : 0.95
                  }}
                  transition={{ duration: 0.5 }}
                  className={`
                    ${activeMilestone === index ? "block" : "hidden"}
                  `}
                >
                  <Card className={`${milestone.bgColor} border-2 ${milestone.borderColor} backdrop-blur-sm`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${milestone.color}`}>
                          <div className="text-white">
                            {milestone.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <Badge className="bg-gray-800/80 text-gray-300 mb-2">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {milestone.title}
                          </h3>
                          <p className="text-cyan-400 font-medium">
                            {milestone.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-6">
                        {milestone.description}
                      </p>

                      <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-lg ${milestone.bgColor} ${milestone.borderColor} border`}>
                        <div className="text-2xl font-bold text-white">
                          {milestone.stats.value}
                        </div>
                        <div className="text-sm text-gray-300">
                          {milestone.stats.label}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Nossa Jornada em Números
              </h3>
              <p className="text-gray-300">
                Resultados que comprovam nossa excelência
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 group hover:scale-105"
                >
                  <div className="flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Faça Parte da Nossa História
              </h3>
              <p className="text-gray-300 mb-6">
                Junte-se aos milhares que já transformaram suas vidas conosco
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl shadow-red-500/40 hover:shadow-red-500/60 border-2 border-red-400/60 transform hover:-translate-y-1 group relative overflow-hidden">
                  <span className="text-lg">Começar Minha Transformação</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
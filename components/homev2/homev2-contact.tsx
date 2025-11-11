"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Zap,
  Users,
  ArrowRight
} from "lucide-react"

interface HomeV2ContactProps {
  settings: any
  plans: any[]
}

interface StatusData {
  isOpen: boolean
  message: string
  status: string
  nextStatus: string
  nextTime: string
  currentTime: string
  dayName: string
}

export function HomeV2Contact({ settings, plans }: HomeV2ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [status, setStatus] = useState<StatusData | null>(null)

  // Fetch status from API
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/homev2/status')
        const result = await response.json()
        
        if (result.success) {
          setStatus(result.data)
        }
      } catch (error) {
        console.error('Erro ao buscar status:', error)
      }
    }

    fetchStatus()
    
    // Update status every minute
    const interval = setInterval(fetchStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        plan: "",
        message: ""
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contato" className="py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
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
            <MessageCircle className="h-4 w-4 mr-2" />
            THE NEXT STEP
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Transforme
            </span>
            <br />
            <span className="text-white">Sua Vida Agora</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            O primeiro passo para sua transformação começa aqui. Entre em contato conosco
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/80 border border-gray-700 backdrop-blur-xl shadow-2xl hover:border-gray-600 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                      <Send className="h-5 w-5 text-cyan-400" />
                    </div>
                    Envie uma Mensagem
                  </CardTitle>
                  <p className="text-gray-300">
                    Respondo em até 2 horas durante o horário de funcionamento
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white tracking-wide">Nome Completo</label>
                        <Input
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-gray-900/80 border-2 border-gray-600 hover:border-gray-500 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 focus:outline-none transition-all duration-300 font-medium"
                          required
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-white tracking-wide">Email</label>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-gray-900/80 border-2 border-gray-600 hover:border-gray-500 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 focus:outline-none transition-all duration-300 font-medium"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-white tracking-wide">Telefone</label>
                          <Input
                            placeholder="(85) 99999-9999"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-gray-900/80 border-2 border-gray-600 hover:border-gray-500 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 focus:outline-none transition-all duration-300 font-medium"
                            required
                          />
                        </div>
                      </div>

                      {/* Plan Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white tracking-wide">Plano de Interesse</label>
                        <select
                          value={formData.plan}
                          onChange={(e) => handleInputChange("plan", e.target.value)}
                          className="w-full px-3 py-3 bg-gray-900/80 border-2 border-gray-600 hover:border-gray-500 text-white rounded-lg focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 focus:outline-none transition-all duration-300 font-medium"
                          required
                        >
                          <option value="" className="bg-gray-900 text-gray-400">Selecione um plano</option>
                          {plans
                            .filter(plan => plan.status === "ACTIVE")
                            .sort((planA, planB) => planA.price - planB.price)
                            .map(plan => (
                              <option key={plan.id} value={plan.name} className="bg-gray-900 text-white">
                                {plan.name} - R$ {plan.price}/mês
                              </option>
                            ))
                          }
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white tracking-wide">Mensagem</label>
                        <Textarea
                          placeholder="Conte-nos sobre seus objetivos fitness..."
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="bg-gray-900/80 border-2 border-gray-600 hover:border-gray-500 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 focus:outline-none transition-all duration-300 resize-none font-medium"
                          rows={4}
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 hover:from-red-600 hover:via-orange-600 hover:to-red-700 text-white py-4 px-8 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/40 border-2 border-red-500/50 hover:border-red-400 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            <span className="font-semibold">Enviando...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Send className="h-5 w-5 group-hover:animate-bounce" />
                            <span className="font-black text-lg">Enviar Mensagem</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="inline-flex p-4 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                      <p className="text-gray-300">Obrigado pelo contato. Retornaremos em breve!</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info with Live Status */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Live Status Card */}
              <Card className="bg-gray-900/80 border border-gray-700 backdrop-blur-xl hover:border-gray-600 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30">
                      <Clock className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Status em Tempo Real</h3>
                      <p className="text-sm text-gray-400">Academia agora</p>
                    </div>
                  </div>
                  
                  {status ? (
                    <div className="space-y-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        status.isOpen
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                        {status.message}
                      </div>
                      
                      <div className="text-sm text-gray-300">
                        <div>Hora atual: <span className="text-white font-medium">{status.currentTime}</span></div>
                        <div>Próximo: <span className="text-cyan-400 font-medium">{status.nextStatus} às {status.nextTime}</span></div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-pulse space-y-3">
                      <div className="h-6 bg-gray-700 rounded w-32"></div>
                      <div className="h-4 bg-gray-700 rounded w-48"></div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-gray-900/80 border border-gray-700 backdrop-blur-xl hover:border-gray-600 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <MapPin className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Endereço</p>
                      <p className="text-gray-300 text-sm">{settings.address || "Av. Santos Dumont, 1515 - São Benedito, CE"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <Phone className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Telefone</p>
                      <p className="text-gray-300 text-sm">{settings.phone || "(85) 99999-9999"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <Mail className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-gray-300 text-sm">{settings.email || "contato@blackredfit.com.br"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gray-900/80 border border-gray-700 backdrop-blur-xl hover:border-gray-600 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Por que escolher a gente?</h3>
                  <div className="space-y-3">
                    {[
                      { icon: <Users className="h-4 w-4" />, text: "2.500+ alunos transformados" },
                      { icon: <Zap className="h-4 w-4" />, text: "Equipamentos de última geração" },
                      { icon: <CheckCircle className="h-4 w-4" />, text: "98% taxa de sucesso" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-cyan-400">{item.icon}</div>
                        <span className="text-gray-300 text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-sm hover:border-gray-600 transition-all duration-300">
              <h3 className="text-3xl font-black text-white mb-4 tracking-wide">
                Pronto para Começar Sua Transformação?
              </h3>
              <p className="text-gray-200 mb-8 text-lg font-medium">
                Mais de 2.500 pessoas já transformaram suas vidas. Seja o próximo!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50 border-2 border-red-400/70 transform hover:-translate-y-2 group relative overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 group-hover:animate-pulse" />
                    <span className="text-xl">Agendar Visita Gratuita</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/40 border-2 border-green-400/60 group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 group-hover:animate-bounce" />
                    <span className="text-lg">WhatsApp</span>
                  </div>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
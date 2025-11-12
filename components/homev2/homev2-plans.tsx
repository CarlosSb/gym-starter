"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Crown, 
  Zap, 
  Star, 
  Check, 
  TrendingUp,
  DollarSign,
  Calendar,
  Timer
} from "lucide-react"

interface HomeV2PlansProps {
  plans: any[]
}

interface AnnualSavingsData {
  monthlyPrice: number
  yearlyPrice: number
  savings: number
  discountPercentage: number
  billingCycle: string
}

export function HomeV2Plans({ plans }: HomeV2PlansProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [loadingSavings, setLoadingSavings] = useState<{[key: string]: boolean}>({})
  const [savingsData, setSavingsData] = useState<{[key: string]: AnnualSavingsData}>({})

  const calculateAnnualSavings = useCallback(async (planId: string, monthlyPrice: number) => {
    setLoadingSavings(prev => ({ ...prev, [planId]: true }))
    
    try {
      const response = await fetch(`/api/homev2/annual-savings?monthlyPrice=${monthlyPrice}&billingCycle=${billingCycle}`)
      const result = await response.json()
      
      if (result.success) {
        setSavingsData(prev => ({ ...prev, [planId]: result.data }))
      }
    } catch (error) {
      console.error("Erro ao calcular economia:", error)
    } finally {
      setLoadingSavings(prev => ({ ...prev, [planId]: false }))
    }
  }, [billingCycle])

  useEffect(() => {
    plans
      .filter(plan => plan.status === "ACTIVE")
      .sort((planA, planB) => planA.price - planB.price)
      .forEach(plan => {
        if (billingCycle === "annual" && plan.price > 0) {
          calculateAnnualSavings(plan.id, plan.price)
        }
      })
  }, [billingCycle, plans, calculateAnnualSavings])

  const getPlanIcon = (planName: string) => {
    if (planName.toLowerCase().includes("premium") || planName.toLowerCase().includes("elite")) {
      return <Crown className="h-6 w-6" />
    } else if (planName.toLowerCase().includes("plus") || planName.toLowerCase().includes("pro")) {
      return <Zap className="h-6 w-6" />
    } else {
      return <Star className="h-6 w-6" />
    }
  }

  const getPlanGradient = (planName: string, index: number) => {
    const gradients = [
      "from-gray-500 to-gray-700",
      "from-cyan-500 to-blue-600", 
      "from-purple-500 to-pink-600",
      "from-yellow-500 to-orange-600"
    ]
    return gradients[index % gradients.length]
  }

  const getPlanGlow = (planName: string) => {
    if (planName.toLowerCase().includes("premium") || planName.toLowerCase().includes("elite")) {
      return "shadow-2xl shadow-slate-500/20"
    } else if (planName.toLowerCase().includes("plus") || planName.toLowerCase().includes("pro")) {
      return "shadow-2xl shadow-slate-500/15"
    }
    return "shadow-2xl shadow-gray-500/20"
  }

  const isPopular = (plan: any) => {
    return plan.popular || plan.name.toLowerCase().includes("plus") || plan.name.toLowerCase().includes("pro")
  }

  return (
    <section id="planos" className="py-24 bg-gradient-to-b from-black via-gray-900/30 to-black">
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
            <TrendingUp className="h-4 w-4 mr-2" />
            TIER SELECTION
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="text-white">Power Level</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Planos desenvolvidos para diferentes níveis de dedicação e objetivos
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium transition-colors ${billingCycle === "monthly" ? "text-cyan-400" : "text-gray-400"}`}>
              Mensal
            </span>
            <Switch
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
            />
            <span className={`text-sm font-medium transition-colors ${billingCycle === "annual" ? "text-cyan-400" : "text-gray-400"}`}>
              Anual
            </span>
            {billingCycle === "annual" && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                <Timer className="h-3 w-3 mr-1" />
                15% OFF
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
              Escolha Seu Plano
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Selecione o plano ideal para seus objetivos fitness
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans
              .filter(plan => plan.status === "ACTIVE")
              .sort((planA, planB) => planA.price - planB.price)
              .map((plan, index) => {
                const currentPrice = billingCycle === "annual" && savingsData[plan.id] 
                  ? savingsData[plan.id].yearlyPrice / 12 
                  : plan.price
                const savings = savingsData[plan.id]?.savings || 0
                const isLoading = loadingSavings[plan.id]

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group perspective-1000"
                  >
                    <Card className={`
                      relative h-full transition-all duration-500 transform-gpu hover:scale-105 overflow-hidden border-2
                      ${isPopular(plan)
                        ? "border-slate-500/60 bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 shadow-2xl shadow-slate-500/20"
                        : "border-gray-700/50 hover:border-gray-600 bg-gradient-to-b from-gray-900/80 to-black/90"
                      }
                      ${getPlanGlow(plan.name)}
                      group/card
                    `}>
                      {/* Popular Badge */}
                      {isPopular(plan) && (
                        <div className="absolute top-0 left-0 right-0 z-10">
                          <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                            <Star className="h-4 w-4 inline mr-2" />
                            MAIS POPULAR
                          </div>
                        </div>
                      )}

                      <CardHeader className={`text-center ${isPopular(plan) ? "pt-12" : "pt-8"}`}>
                        {/* Plan Icon */}
                        <div className={`
                          inline-flex p-3 rounded-xl mb-4 shadow-lg justify-between items-center
                          ${isPopular(plan)
                            ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
                            : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
                          }
                        `}>
                          <div className="text-cyan-400">
                            {getPlanIcon(plan.name)}
                          </div>

                          <CardTitle className="text-2xl font-bold text-white">
                            {plan.name}
                          </CardTitle>
                        </div>

                        <CardDescription className="text-gray-300 mb-6">
                          {plan.description}
                        </CardDescription>

                        {/* Pricing */}
                        <div className="space-y-2">
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
                            </div>
                          ) : (
                            <>
                              <div className="text-4xl font-black text-white">
                                R$ {currentPrice.toFixed(0)}
                                <span className="text-lg font-normal text-gray-400">/mês</span>
                              </div>
                              
                              {billingCycle === "annual" && savings > 0 && (
                                <div className="text-sm text-green-400 font-medium">
                                  <DollarSign className="h-4 w-4 inline mr-1" />
                                  Economize R$ {savings}/ano
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 flex flex-col">
                        {/* Features */}
                        <ul className="space-y-3 mb-8 flex-1">
                          {plan.features?.map((feature: string, featureIndex: number) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
                              viewport={{ once: true }}
                              className="flex items-start gap-3"
                            >
                              <Check className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <Button
                          className={`
                            w-full py-4 px-6 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 group relative overflow-hidden
                            ${isPopular(plan)
                              ? "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white shadow-lg shadow-slate-500/20 hover:shadow-slate-500/30 border border-slate-500/50"
                              : "bg-slate-700 hover:bg-slate-600 text-white shadow-md border border-slate-600 hover:border-slate-500"
                            }
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 group-hover:animate-pulse" />
                            {isPopular(plan) ? "ESCOLHER PREMIUM" : "COMEÇAR AGORA"}
                          </div>
                        </Button>
                      </CardContent>
  
                      {/* Subtle Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-500/3 to-slate-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </Card>
                  </motion.div>
                )
              })}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm">
            💎 Todos os planos incluem acesso às áreas comuns e consultoria nutricional
          </p>
        </motion.div>
      </div>
    </section>
  )
}
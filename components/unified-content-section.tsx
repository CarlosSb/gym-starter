"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Calendar,
  Gift,
  Sparkles,
  Users,
  ExternalLink,
  Megaphone,
  Star,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Share2,
  Timer,
  Target,
  Award,
  Heart,
  Flame,
  Crown
} from "lucide-react"
import Image from "next/image"
import { PromotionCard } from "./ui/promotion-card"
import { PartnerCard } from "./ui/partner-card"
import { AdCard } from "./ui/ad-card"
import { SocialShareButtons } from "./ui/social-share-buttons"
import {
  generatePromotionMessage,
  generateAdMessage,
  generateWhatsAppUrl,
  shareContent,
  copyToClipboard
} from "@/lib/utils"

interface Promotion {
  id: string
  title: string
  description: string
  image?: string
  validUntil: string
  isActive: boolean
  createdAt: string
  discount?: number
  category?: string
  featured?: boolean
}

interface Partner {
   id: string
   name: string
   description: string
   logo?: string
   link?: string
   category: string
   isActive: boolean
   featured: boolean
   priority: number
   displayOrder: number
   createdAt: string
}

interface Ad {
   id: string
   title: string
   image?: string
   link?: string
   validUntil: string
   isActive: boolean
   featured: boolean
   priority: number
   displayOrder: number
   createdAt: string
}

export function UnifiedContentSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promotionsRes, partnersRes, adsRes] = await Promise.all([
          fetch('/api/promotions?limit=6'),
          fetch('/api/partners?limit=8'),
          fetch('/api/ads?limit=3')
        ])

        const [promotionsData, partnersData, adsData] = await Promise.all([
          promotionsRes.json(),
          partnersRes.json(),
          adsRes.json()
        ])

        if (promotionsData.success) setPromotions(promotionsData.promotions)
        if (partnersData.success) {
          // Ordenar parceiros: featured primeiro, depois por prioridade, depois por ordem de exibição
          const sortedPartners = partnersData.partners.sort((a: Partner, b: Partner) => {
            // Featured tem prioridade máxima
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1

            // Entre featured ou não-featured, ordenar por prioridade
            if (a.priority !== b.priority) return b.priority - a.priority

            // Se prioridade igual, ordenar por displayOrder
            return a.displayOrder - b.displayOrder
          })
          setPartners(sortedPartners)
        }
        if (adsData.success) {
          // Ordenar anúncios: featured primeiro, depois por prioridade, depois por ordem de exibição
          const sortedAds = adsData.ads.sort((a: Ad, b: Ad) => {
            // Featured tem prioridade máxima
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1

            // Entre featured ou não-featured, ordenar por prioridade
            if (a.priority !== b.priority) return b.priority - a.priority

            // Se prioridade igual, ordenar por displayOrder
            return a.displayOrder - b.displayOrder
          })
          setAds(sortedAds)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getTimeRemaining = (dateString: string) => {
    const now = new Date()
    const endDate = new Date(dateString)
    const diffTime = endDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Expirado'
    if (diffDays === 0) return 'Hoje'
    if (diffDays === 1) return '1 dia'
    if (diffDays <= 7) return `${diffDays} dias`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} semanas`
    return `${Math.ceil(diffDays / 30)} meses`
  }

  const handlePromotionWhatsApp = (promotion: any) => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'
    const message = generatePromotionMessage(promotion)
    const whatsappUrl = generateWhatsAppUrl(phone, message)

    // Rastreamento
    console.log('WhatsApp promotion click:', promotion.id)

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const handleAdWhatsApp = (ad: any) => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'
    const message = generateAdMessage(ad)
    const whatsappUrl = generateWhatsAppUrl(phone, message)

    // Rastreamento
    console.log('WhatsApp ad click:', ad.id)

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const handleSharePromotion = async (promotion: any) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    const url = `${baseUrl}/promotion/${promotion.id}`
    const success = await shareContent({
      title: promotion.title,
      text: promotion.description,
      url
    })

    if (!success) {
      // Fallback: copiar para clipboard
      await copyToClipboard(url)
    }
  }

  const handleCardClick = (promotion: any) => {
    // A navegação agora é feita pelo Link component
    console.log('Navigate to promotion:', promotion.id)
  }

  const handleShareAd = async (ad: any) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    const url = `${baseUrl}/anuncio/${ad.id}`
    const success = await shareContent({
      title: ad.title,
      text: `Confira este anúncio especial: ${ad.title}`,
      url
    })

    if (!success) {
      // Fallback: copiar para clipboard
      await copyToClipboard(url)
    }
  }

  const EmptyState = ({ type }: { type: 'promotions' | 'partners' | 'ads' }) => {
    const configs = {
      promotions: {
        icon: <Gift className="h-16 w-16" />,
        title: "Nenhuma Promoção Ativa",
        description: "Fique atento! Novas ofertas incríveis estão a caminho.",
        gradient: "from-emerald-400/20 to-blue-400/20",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600"
      },
      partners: {
        icon: <Users className="h-16 w-16" />,
        title: "Sem Parceiros no Momento",
        description: "Em breve, anunciaremos nossas parcerias estratégicas.",
        gradient: "from-purple-400/20 to-pink-400/20",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600"
      },
      ads: {
        icon: <Megaphone className="h-16 w-16" />,
        title: "Nenhum Anúncio Especial",
        description: "Mais conteúdo incrível está sendo preparado para você!",
        gradient: "from-orange-400/20 to-red-400/20",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600"
      }
    }

    const config = configs[type]

    return (
      <div className={`col-span-full flex items-center justify-center py-20`}>
        <div className="text-center max-w-md">
          <div className={`w-24 h-24 ${config.iconBg} rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300`}>
            <div className={config.iconColor}>
              {config.icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {config.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {config.description}
          </p>
          <div className={`inline-block px-6 py-3 bg-gradient-to-r ${config.gradient} rounded-full`}>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Em Breve</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Carregando conteúdo...</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>

          {/* Tabs Skeleton */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-3 gap-3 p-2.5 bg-gray-100 rounded-2xl max-w-lg w-full">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-32 bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-accent/10 to-red-accent/5 text-red-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Conteúdo Exclusivo</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-accent to-red-accent/70 bg-clip-text text-transparent">
              Ofertas e
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Parcerias Especiais</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubra oportunidades únicas, promoções exclusivas e produtos que vão transformar sua jornada fitness
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>12+ Ofertas Ativas</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>8 Parceiros Verificados</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-purple-500" />
              <span>Qualidade Garantida</span>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="promotions" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-3 bg-white/80 h-16 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2.5 shadow-xl border border-gray-200/50 dark:border-gray-700/50 max-w-lg w-full">
              <TabsTrigger
                value="promotions"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-sm relative overflow-hidden transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              >
                <Gift className="h-4 w-4 transition-transform duration-300 data-[state=active]:scale-110 flex-shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Promoções</span>
                <span className="sm:hidden text-xs whitespace-nowrap">Ofertas</span>
                {promotions.length > 0 && (
                  <Badge className="ml-auto bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs font-bold px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center flex-shrink-0">
                    {promotions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="partners"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-sm relative overflow-hidden transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Users className="h-4 w-4 transition-transform duration-300 data-[state=active]:scale-110 flex-shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Parceiros</span>
                <span className="sm:hidden text-xs whitespace-nowrap">Links</span>
                {partners.length > 0 && (
                  <Badge className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center flex-shrink-0">
                    {partners.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="ads"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-sm relative overflow-hidden transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white hover:bg-orange-50 dark:hover:bg-orange-900/20"
              >
                <Megaphone className="h-4 w-4 transition-transform duration-300 data-[state=active]:scale-110 flex-shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Anúncios</span>
                <span className="sm:hidden text-xs whitespace-nowrap">Ads</span>
                {ads.length > 0 && (
                  <Badge className="ml-auto bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-bold px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center flex-shrink-0">
                    {ads.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Enhanced Promotions Tab */}
          <TabsContent value="promotions">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.length === 0 ? (
                <EmptyState type="promotions" />
              ) : (
                promotions.map((promotion, index) => (
                  <Link
                    key={promotion.id}
                    href={`/promotion/${promotion.id}`}
                    className="group block"
                  >
                    <Card className="group relative bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform overflow-hidden cursor-pointer">
                      {/* Discount Badge */}
                      {promotion.discount && (
                        <div className="absolute top-4 left-4 z-10" onClick={(e) => e.stopPropagation()}>
                          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 text-sm font-bold shadow-lg">
                            <Flame className="h-3 w-3 mr-1" />
                            -{promotion.discount}%
                          </Badge>
                        </div>
                      )}

                      {/* Time Remaining Badge */}
                      <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
                        <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                          <Timer className="h-3 w-3 mr-1" />
                          {getTimeRemaining(promotion.validUntil)}
                        </Badge>
                      </div>

                      {/* Featured Badge */}
                      {promotion.featured && (
                        <div className="absolute top-1/2 -right-3 z-20 transform -translate-y-1/2" onClick={(e) => e.stopPropagation()}>
                          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 text-xs font-bold shadow-lg transform rotate-12">
                            <Crown className="h-3 w-3 inline mr-1" />
                            DESTAQUE
                          </div>
                        </div>
                      )}

                      <CardContent className="p-6">
                        {/* Image Container */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-4 overflow-hidden">
                          {promotion.image ? (
                            <Image
                              src={promotion.image}
                              alt={promotion.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Gift className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 line-clamp-2">
                            {promotion.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {promotion.description}
                          </p>

                          {/* Category Badge */}
                          {promotion.category && (
                            <Badge variant="outline" className="text-xs" onClick={(e) => e.stopPropagation()}>
                              {promotion.category}
                            </Badge>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handlePromotionWhatsApp(promotion)
                              }}
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Garantir Oferta
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleSharePromotion(promotion)
                              }}
                              className="px-3"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Valid Until */}
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                            <Calendar className="h-3 w-3" />
                            <span>Válido até {formatDate(promotion.validUntil)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </TabsContent>

          {/* Enhanced Partners Tab */}
          <TabsContent value="partners">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partners.length === 0 ? (
                <EmptyState type="partners" />
              ) : (
                partners.map((partner) => (
                  <Card key={partner.id} className="group relative bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform">
                    <CardContent className="p-4 text-center">
                      {/* Logo Container */}
                      <div className="relative h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-3 overflow-hidden">
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Users className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Partner Info */}
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                        {partner.name}
                      </h3>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {partner.description}
                      </p>

                      {/* Category Badge */}
                      <Badge variant="secondary" className="text-xs mb-2">
                        {partner.category}
                      </Badge>

                      {/* Action Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (partner.link) {
                            window.open(partner.link, '_blank', 'noopener,noreferrer')
                          }
                        }}
                        className="w-full text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visitar
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Enhanced Ads Tab */}
          <TabsContent value="ads">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.length === 0 ? (
                <EmptyState type="ads" />
              ) : (
                ads.map((ad) => (
                  <Card key={ad.id} className="group relative bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform overflow-hidden">
                    {/* Featured Badge */}
                    {ad.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm font-bold">
                          <Crown className="h-3 w-3 mr-1" />
                          DESTAQUE
                        </Badge>
                      </div>
                    )}

                    {/* Time Remaining Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                        <Timer className="h-3 w-3 mr-1" />
                        {getTimeRemaining(ad.validUntil)}
                      </Badge>
                    </div>

                    <CardContent className="p-0">
                      {/* Image Container */}
                      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                        {ad.image ? (
                          <Image
                            src={ad.image}
                            alt={ad.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Megaphone className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="font-bold text-xl text-white mb-2">
                            {ad.title}
                          </h3>
                        </div>
                      </div>

                      {/* Action Section */}
                      <div className="p-6">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAdWhatsApp(ad)}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Saiba Mais
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShareAd(ad)}
                            className="px-3"
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Valid Until */}
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                          <Calendar className="h-3 w-3" />
                          <span>Válido até {formatDate(ad.validUntil)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
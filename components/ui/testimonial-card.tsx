"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Quote, CheckCircle, TrendingUp, Award, Calendar } from "lucide-react"
import { StandardCard } from "./standard-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  name: string
  content: string
  rating?: number
  image?: string
  category?: string
  isActive: boolean
  createdAt: string
  achievement?: string
  progress?: string
  transformation?: string
  timeFrame?: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
  onClick?: () => void
  className?: string
  showQuoteIcon?: boolean
  maxHeight?: number
  showReadMore?: boolean
}

export function TestimonialCard({
  testimonial,
  onClick,
  className,
  showQuoteIcon = true,
  maxHeight = 420,
  showReadMore = false
}: TestimonialCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  const renderStars = (rating: number = 5) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-200 dark:text-gray-600'
        }`}
      />
    ))
  }

  const getCategoryIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'perda de peso':
        return <TrendingUp className="h-3 w-3" />
      case 'ganho de massa':
        return <Award className="h-3 w-3" />
      case 'condição física':
        return <CheckCircle className="h-3 w-3" />
      default:
        return <Award className="h-3 w-3" />
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'perda de peso':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
      case 'ganho de massa':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
      case 'condição física':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
      default:
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    }
  }

  return (
    <StandardCard
      variant="testimonial"
      size="md"
      onClick={onClick}
      className={`group relative bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform overflow-hidden ${className}`}
      style={{
        height: `${maxHeight}px`,
        background: isHovered
          ? 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Depoimento de ${testimonial.name}. Avaliação: ${testimonial.rating || 5} estrelas. ${testimonial.category ? `Categoria: ${testimonial.category}` : ''}`}
    >
      {/* Decorative Elements - Smaller to prevent overflow */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-red-accent/5 to-transparent rounded-bl-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-red-accent/3 to-transparent rounded-tr-2xl" />

      <div className="relative z-10 flex flex-col h-full p-4">
        {/* Header Section */}
        <div className="flex-shrink-0">
          {/* Verified Badge */}
          <div className="flex justify-center mb-2">
            <div className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle className="h-3 w-3" />
              <span>Verificado</span>
            </div>
          </div>

          {/* Quote Icon */}
          {showQuoteIcon && (
            <div className="flex justify-center mb-2">
              <div className="bg-red-accent/10 rounded-full p-1.5 transform transition-transform duration-300 group-hover:scale-110">
                <Quote className="h-3 w-3 text-red-accent" />
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="flex justify-center gap-0.5 mb-2.5">
            {renderStars(testimonial.rating)}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
          {/* Testimonial Text - Truncated */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs text-center mb-3 relative overflow-hidden">
            <div className="text-red-accent/20 text-base font-serif leading-none">&ldquo;</div>
            <div className="px-2 py-1 text-center text-xs leading-snug line-clamp-4">
              {testimonial.content}
            </div>
            <div className="text-red-accent/20 text-base font-serif leading-none text-right">&rdquo;</div>
          </div>

          {/* Results Section - Condensed */}
          {(testimonial.achievement || testimonial.timeFrame) && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-1.5 mb-2 flex-shrink-0">
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {testimonial.achievement && (
                  <div className="flex items-center justify-center gap-1">
                    <Award className="h-2.5 w-2.5 text-emerald-500" />
                    <span className="truncate max-w-24">{testimonial.achievement}</span>
                  </div>
                )}
                {testimonial.timeFrame && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Calendar className="h-2.5 w-2.5 text-blue-500" />
                    <span className="truncate max-w-24">{testimonial.timeFrame}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* User Info - Compact */}
          <div className="text-center flex-shrink-0 mt-auto">
            {/* Avatar - Smaller */}
            <div className="relative inline-block mb-1">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center overflow-hidden shadow-md ring-1.5 ring-white dark:ring-gray-800 transform transition-transform duration-300 group-hover:scale-110">
                {testimonial.image && !imageError ? (
                  <Image
                    src={testimonial.image}
                    alt={`Foto de ${testimonial.name}`}
                    width={32}
                    height={32}
                    className="object-cover rounded-full w-full h-full"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-white font-bold text-xs">
                    {getInitials(testimonial.name)}
                  </span>
                )}
              </div>
              {/* Online Status Indicator - Smaller */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            {/* Name - Smaller */}
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5 truncate max-w-20">
              {testimonial.name}
            </h3>

            {/* Category Badge - Smaller */}
            {testimonial.category && (
              <Badge
                variant="outline"
                className={`text-xs px-1 py-0.5 ${getCategoryColor(testimonial.category)} border max-w-20 truncate`}
              >
                {getCategoryIcon(testimonial.category)}
                <span className="ml-0.5 truncate">{testimonial.category}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-accent/0 via-red-accent/5 to-red-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
    </StandardCard>
  )
}
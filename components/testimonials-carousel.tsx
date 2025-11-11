"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TestimonialCard } from "@/components/ui/testimonial-card"

interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  category: string
  isActive: boolean
  createdAt: string
  achievement?: string
  progress?: string
  transformation?: string
  timeFrame?: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000
}: TestimonialsCarouselProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  const scrollToIndex = useCallback((index: number) => {
    if (carouselRef.current) {
      const cardWidth = 320
      const gap = 24
      const scrollTo = (index * (cardWidth + gap)) + (cardWidth / 2)
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
      setCurrentIndex(index % testimonials.length)
    }
  }, [testimonials.length])

  const scrollToNext = useCallback(() => {
    if (carouselRef.current) {
      const cardWidth = 320
      const gap = 24
      const newIndex = (currentIndex + 1) % testimonials.length
      const scrollTo = (newIndex * (cardWidth + gap)) + (cardWidth / 2)
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
      setCurrentIndex(newIndex)
    }
  }, [currentIndex, testimonials.length])

  const scrollToPrev = useCallback(() => {
    if (carouselRef.current) {
      const cardWidth = 320
      const gap = 24
      const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
      const scrollTo = (newIndex * (cardWidth + gap)) + (cardWidth / 2)
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
      setCurrentIndex(newIndex)
    }
  }, [currentIndex, testimonials.length])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && autoPlay && !isPaused && testimonials.length > 1) {
      autoPlayRef.current = setInterval(() => {
        scrollToNext()
      }, autoPlayInterval)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, autoPlay, autoPlayInterval, scrollToNext, isPaused, testimonials.length])

  // Pause auto-play on hover/drag
  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true)
    setIsAutoPlaying(false)
  }, [])

  const resumeAutoPlay = useCallback(() => {
    if (autoPlay) {
      setIsPaused(false)
      setTimeout(() => {
        setIsAutoPlaying(true)
      }, 2000)
    }
  }, [autoPlay])

  const toggleAutoPlay = useCallback(() => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false)
      setIsPaused(true)
    } else {
      setIsAutoPlaying(true)
      setIsPaused(false)
    }
  }, [isAutoPlaying])

  const resetCarousel = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
      setCurrentIndex(0)
    }
  }, [])

  // Mouse/Touch event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const isButton = target.tagName === 'BUTTON' || target.closest('button')
    const isLink = target.tagName === 'A' || target.closest('a')

    if (isButton || isLink) return
    if (!carouselRef.current) return

    setIsDragging(true)
    setStartPos(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    pauseAutoPlay()
  }, [pauseAutoPlay])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startPos) * 1.5
    carouselRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startPos, scrollLeft])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setTimeout(resumeAutoPlay, 2000)
  }, [resumeAutoPlay])

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartPos(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    pauseAutoPlay()
  }, [pauseAutoPlay])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startPos) * 1.5
    carouselRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startPos, scrollLeft])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    setTimeout(resumeAutoPlay, 2000)
  }, [resumeAutoPlay])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollToPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollToNext()
    } else if (e.key === ' ') {
      e.preventDefault()
      toggleAutoPlay()
    }
  }, [scrollToPrev, scrollToNext, toggleAutoPlay])

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nenhum depoimento disponível
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Em breve, nossos alunos compartilharão suas experiências de transformação.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Enhanced Navigation Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetCarousel}
            className="text-gray-600 hover:text-red-accent border-gray-300 hover:border-red-accent transition-all duration-200"
            aria-label="Voltar ao início"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {currentIndex + 1} de {testimonials.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoPlay}
            className="text-gray-600 hover:text-red-accent border-gray-300 hover:border-red-accent transition-all duration-200"
            aria-label={isAutoPlaying ? "Pausar reprodução automática" : "Retomar reprodução automática"}
          >
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Enhanced Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white dark:bg-gray-800/95 dark:hover:bg-gray-800 shadow-xl border-2 hover:border-red-accent hover:scale-110 transition-all duration-300 w-12 h-12 rounded-full backdrop-blur-sm"
        onClick={scrollToPrev}
        aria-label="Depoimento anterior"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white dark:bg-gray-800/95 dark:hover:bg-gray-800 shadow-xl border-2 hover:border-red-accent hover:scale-110 transition-all duration-300 w-12 h-12 rounded-full backdrop-blur-sm"
        onClick={scrollToNext}
        aria-label="Próximo depoimento"
      >
        <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Enhanced Carousel Container */}
      <div
        ref={carouselRef}
        className={`overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={resumeAutoPlay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carrossel de depoimentos"
        onMouseEnter={pauseAutoPlay}
      >
        <div 
          className="flex gap-6 pb-4 transition-transform duration-500 ease-out"
          style={{ width: 'max-content' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-96"
            >
              <TestimonialCard
                testimonial={testimonial}
                className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                maxHeight={380}
                showReadMore={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Progress Indicators */}
      <div className="flex justify-center mt-8 gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`relative transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 h-2 bg-red-accent rounded-full'
                : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Ir para depoimento ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 bg-red-accent rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Auto-play Status Indicator */}
      {isAutoPlaying && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-red-accent rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-red-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-red-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span>Reprodução automática ativa</span>
          </div>
        </div>
      )}
    </div>
  )
}
import { getServerTestimonials } from "@/lib/server-data"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { Star, TrendingUp, Users, Award } from "lucide-react"

interface TestimonialsSectionProps {
  settings: any
}

export async function TestimonialsSection({ settings }: TestimonialsSectionProps) {
  const testimonials = await getServerTestimonials()

  // Estatísticas de exemplo para enriquecer a seção
  const stats = [
    {
      icon: <Users className="h-5 w-5" />,
      value: "2.500+",
      label: "Alunos Transformados",
      description: "Vidas mudadas com nossos métodos"
    },
    {
      icon: <Star className="h-5 w-5" />,
      value: "4.9",
      label: "Avaliação Média",
      description: "Satisfação dos nossos alunos"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: "95%",
      label: "Taxa de Sucesso",
      description: "Alunos que atingem seus objetivos"
    },
    {
      icon: <Award className="h-5 w-5" />,
      value: "5",
      label: "Anos de Experiência",
      description: "Perfeicionando nossos métodos"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-accent/10 text-red-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            <span>Depoimentos Reais</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-accent to-red-accent/70 bg-clip-text text-transparent">
              Histórias de
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Transformação</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Veja como nossos métodos revolucionários transformaram a vida de milhares de pessoas.
            Cada depoimento representa uma jornada única de superação e conquista.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="text-red-accent mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <TestimonialsCarousel
            testimonials={testimonials}
            autoPlay={true}
            autoPlayInterval={8000}
          />
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>4.9/5 Avaliação Média</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <span>Mais de 2.500 depoimentos</span>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <span>Verificados e Autênticos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
import { getServerTestimonials } from "@/lib/server-data"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"

interface TestimonialsSectionProps {
  settings: any
}

export async function TestimonialsSection({ settings }: TestimonialsSectionProps) {
  const testimonials = await getServerTestimonials()

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Depoimentos dos Alunos</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos alunos dizem sobre a experiência na {settings.name}
          </p>
        </div>

        <TestimonialsCarousel
          testimonials={testimonials}
          autoPlay={true}
          autoPlayInterval={6000}
        />
      </div>
    </section>
  )
}
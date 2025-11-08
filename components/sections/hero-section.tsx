import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MatriculeSeButton } from "@/components/matricule-se-button"
import { CheckInModal } from "@/components/checkin-modal"
import { AppointmentModal } from "@/components/appointment-modal"

interface HeroSectionProps {
  settings: any
}

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="bg-black-red text-white py-20 relative overflow-hidden"
      style={settings.heroImage ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${settings.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : undefined}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <Badge className="mb-4 bg-red-accent text-white">{settings.heroSubtitle || "Nova Academia"}</Badge>
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          {settings.heroTitle || "TRANSFORME SEU CORPO"}
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto text-pretty">
          {settings.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MatriculeSeButton
            settings={settings}
            className="bg-red-accent hover:bg-red-accent/90 text-white"
          >
            Matricule-se
          </MatriculeSeButton>

          <CheckInModal>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Fazer Check-in
            </Button>
          </CheckInModal>

          <AppointmentModal>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Agendar Aula Experimental
            </Button>
          </AppointmentModal>

          <Link href="#sobre">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Conheça a Academia
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}